<template lang="pug">
.modal.fade(tabindex="-1" role="dialog" id="contract-update-modal")
  .modal-dialog(role="document")
    .modal-content
      .modal-header
        button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
        h4.modal-title Editar Contrato
      .modal-body
        form
          .row
            .col-md-6
              .form-group
                label(for="cient-sector") Equipo
                input(class="form-control" id="u-contract-equipment" tabindex="1")
              .form-group
                label(for="cient-sector") Modelo
                input(class="form-control" id="u-contract-modelo" tabindex="3")
              .form-group
                label(for="cient-sector") Router
                input(class="form-control" id="u-contract-router" tabindex="5")
              .form-group(v-if="changeIp")
                label(for="cient-sector") Sector
                select.form-control.select-contract-sector(v-model="selectedSection", @change="getIpList")
                  option(:value="option.id", :key="option.id", v-for="option of sectionList") {{ option.text }}


              .form-group
                label(for="check-change-ip") Cambiar Ip?
                input(class="form-control" id="check-change-ip" type="checkbox", :checked="changeIp", @change.prevent="changeMode")

            .col-md-6
              .form-group
                label(for="client-house") Mac del Equipo
                input.form-control#contract-r-mac(type="text", v-model="contract.mac_equipo")
              .form-group
                label(for="client-sector") IP
                input.form-control#contract-ip(type="text", disabled="disabled", v-model="contract.ip")
              .form-group
                label(for="client-house") Mac del Router
                input.form-control#contract-r-mac(type="text", v-model="contract.mac_router")
              .form-group(v-if="changeIp")
                label(for="cient-sector") Codigo
                select.form-control#select-contract-code(v-model="contract.codigo", @change="setContractIp")
                    option(:value="option.id", :key="option.id", v-for="option of ipList",) {{ option.id }}

      .modal-footer
        button(type="button", class="btn", data-dismiss="modal", tabindex="8") Cancelar
        button(type="button", class="btn save", id="update-contract", @click.prevent="updateContract") Guardar
</template>

<script>
  import RouterService from './../../secciones/service/routerService';

  const Service = new RouterService();

  export default {
    props: {
      contract: {
        type: Object
      },
      store: {
        type: Object
      }
    },
    data() {
      return {
        sectionList: null,
        ipList: null,
        selectedSection: null,
        changeIp: false
      };
    },

    mounted() {
      $('#contract-update-modal').on('hide.bs.modal', () => {
        this.$emit('dimiss');
        this.store.contractEmpty();
        this.changeIp = false;
        this.ipList = null;
        this.selectedSection = null;
      });
      this.getSectionList();
    },

    methods: {
      emitChange() {
        this.$emit('save');
      },

      updateContract() {
        const contract = {
          id_contrato: this.contract.id_contrato,
          nombre_equipo: this.contract.nombre_equipo,
          mac_equipo: this.contract.mac_equipo,
          router: this.contract.router,
          mac_router: this.contract.mac_router,
          modelo: this.contract.modelo,
        };

        if (this.changeIp) {
          contract.codigo = this.contract.codigo;
          contract.ip = this.contract.ip;
        }

        if (this.contract.id_contrato) {
          this.$http.post('contract/update', this.getDataForm(contract))
            .then((res) => {
              this.emitChange();
              this.showMessage(res.data.message);
              if (res.data.message.type === 'success') {
                $('#contract-update-modal').modal('hide');
              }
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.info('LLene todos los campos por favor');
        }
      },

      getSectionList() {
        Service.getSectionList()
          .then((res) => {
            this.sectionList = res.data.sections;
          });
      },

      getIpList() {
        Service.getSectionIps(this.selectedSection)
          .then((res) => {
            this.ipList = res.data.ips;
          });
      },

      setContractIp() {
        this.ipList.forEach((item) => {
          if (item.id === this.contract.codigo) {
            this.contract.ip = item.ip;
          }
        });
      },

      changeMode() {
        this.changeIp = !this.changeIp;
      }
    },
  };
</script>
