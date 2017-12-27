<template lang="pug">
  .wrapper
    .col-md-6
      .tabs-container.contract-form

        ul.nav.nav-tabs(role="tablist")
          li(role="presentation").active: a(href="#contract-details", aria-controls="contract-details", role="tab", data-toggle="tab") Datos Contrato
          li(role="presentation"): a(href="#equipment" aria-controls="equipment" role="tab" data-toggle="tab") Equipo

        .tab-content
          .tab-pane.fade.in.active#contract-details(role="tabpanel")
            .col-md-12
              .input-group
                span.input-group-addon#basic-addon1 Cliente
                SelectClient(the-id="client-id", parent-id="#contract-details",:endpoint="searchEndpoint", @select="setClientId", :disabled="disabledSelect")

            h5 Seleccione el Servicio
              InternetPlans
            .row
              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Mensualidad
                  input.form-control#contract-service-price(type="number", tabindex="0")

              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Meses
                  input.form-control#contract-months(type="number", tabindex="1" value="")

              .row
              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Fecha
                  input.form-control#contract-date(type="date", tabindex="2")

              .col-md-6
                .input-group(v-if="createdContract")
                  span.input-group-addon#basic-addon1 Pagar Hasta
                  select.form-control#select-pay-until
                    option(value="") --seleccione mes--


          .tab-pane.fade.in#equipment(role="tabpanel")
            .row
              h4 Equipo
              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Equipo
                  input.form-control#contract-equipment(type="text",tabindex="3")

                .input-group
                  span.input-group-addon#basic-addon1 Modelo
                  input.form-control#contract-equipment-model(type="text", tabindex="5")

                .input-group
                  span.input-group-addon#basic-addon1 Router
                  input.form-control#contract-router(type="text", tabindex="7")

                .input-group
                  span.input-group-addon#basic-addon1 Sector
                  select.form-control.select-contract-sector(v-model="selectedSection", @change="getIpList")
                    option(:value="option.id", :key="option.id", v-for="option of sectionList") {{ option.text }}

              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Mac
                  input.form-control#contract-e-mac(type="text", tabindex="4")

                .input-group
                  span.input-group-addon#basic-addon1 IP
                  input.form-control#contract-ip(type="text", tabindex="6", disabled="disabled", v-model="contract.ip")

                .input-group
                  span.input-group-addon#basic-addon1 Mac
                  input.form-control#contract-r-mac(type="text", tabindex="8")

                .input-group
                  span.input-group-addon#basic-addon1 Codigo IP
                  select.form-control#select-contract-code(v-model="contract.codigo", @change="setContractIp")
                    option(:value="option.id", :key="option.id", v-for="option of ipList",) {{ option.text }}

    .col-md-6
      .centered-container
        h3.part-title Selecciona una opción:
        form.form-inline
          .form-group
            .radio
              label(@click="setMode('new contract')")
                .my-radio#radio-new-contract(:class="{checked: mode == 'new contract'}")
                | Nuevo Contrato
            .radio
              label(@click="setMode('requirements')")
                .my-radio#radio-just-requirement(:class="{checked: mode == 'requirements'}")
                | Solo requerimiento


        .note-item.note.print-requirement
          .preview
            .falseDoc(v-html="lines")

        .row-container.contract-controls(v-if="mode == 'new contract'")
          button.btn#btn-save-contract(tabindex="7", @click="add") Guardar
          a.btn#btn-view-pay(target="_blank", :href="paymentUrl",v-if="createdContract") Pago
          a.btn#btn-print-contract(target="printframe", :href="printContractUrl", v-if="createdContract") Imprimir
        .row-container.requirement-controls(v-if="mode == 'requirements'")
          a.btn#btn-print-requirement(target="printframe", :href="printRequirementUrl") Requerimiento

</template>

<script>
  import RouterService from './../secciones/service/routerService';
  import SelectClient from './../sharedComponents/SelectClient.vue';
  import InternetPlans from './../sharedComponents/InternetPlans.vue';
  import utils from './../sharedComponents/utils';

  const Service = new RouterService();

  export default {
    components: {
      SelectClient,
      InternetPlans
    },
    mounted() {
      this.getSectionList();
    },

    data() {
      return {
        contract: {
          id_cliente: '',
          id_servicio: '',
          codigo: '',
          fecha: '',
          duracion: '',
          mensualidad: '',
          nombre_equipo: '',
          mac_equipo: '',
          router: '',
          mac_router: '',
          modelo: '',
          ip: ''
        },
        createdContract: null,
        sectionList: null,
        ipList: null,
        selectedSection: null,
        selectedPayment: null,
        searchEndpoint: `${baseURL}/clients/get_clients/dropdown`,
        mode: 'requirements',
        disabledSelect: false
      };
    },
    computed: {
      lines() {
        let lines = ' ';
        for (let i = 1; i < 10; i += 1) {
          lines += `<div class="lineas num${i}"><span></span></div>`;
        }
        return lines;
      },
      paymentUrl() {
        return (this.contract.id_cliente) ? `${baseURL}app/details/${this.contract.id_cliente}/pagos')` : '#';
      },

      printContractUrl() {
        return `${baseURL}process/getrequirements/${this.contract.id_cliente}`;
      },

      printRequirementUrl() {
        return `${baseURL}process/getrequirement/${this.contract.id_cliente}`;
      }
    },

    methods: {
      add() {
        const { contract } = this;
        const empty = utils.isEmpty([contract.id_cliente, contract.id_servicio, contract.fecha, contract.duracion]);
        if (!empty && !createdContract) {
          this.$http.post('contract/add', this.getDataForm(contract))
            .then((res) => {
              this.showMessage(res.dada.message);
              this.createdContract = res.data.contract;
              this.payments = res.data.payments;
              this.disabledSelect = true;
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        } else {
          this.$toasted.error('Revise, LLene todos los campos requeridos por favor');
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
            this.contract.ip = item.id;
          }
        });
      },

      updateUntil() {
        const form = {
          id_contrato: this.createdContract,
          last_payment_id: this.selectedPayment
        };
        this.$http.post('payment/up_to_date', this.getDataForm(form))
          .then((res) => {
            this.showMessage(res.data.message);
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },

      setClientId(data) {
        this.contract.id_cliente = data.id;
      },

      setMode(mode) {
        this.mode = mode;
      }
    }
  };
</script>
