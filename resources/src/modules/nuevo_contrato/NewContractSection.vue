<template lang="pug">
  .screen.row
    .col-md-6
      .tabs-container.contract-form

        ul.nav.nav-tabs(role="tablist")
          li(role="presentation").active: a(href="#contract-details", aria-controls="contract-details", role="tab", data-toggle="tab") Datos Contrato
          li(role="presentation"): a(href="#equipment" aria-controls="equipment" role="tab" data-toggle="tab") Equipo <span class="text-danger">*</span>

        .tab-content
          .tab-pane.fade.in.active#contract-details(role="tabpanel")
            .col-md-12
              .input-group#select-client-container
                span.input-group-addon#basic-addon1 Cliente <span class="text-danger">*</span>
                SelectClient(the-id="client-id", parent-id="#select-client-container",:endpoint="searchEndpoint", @select="setClientId", :disabled="disabledSelect")

            h5 Seleccione el Servicio
              InternetPlans(@selected="selectService")
            .row
              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Mensualidad <span class="text-danger">*</span>
                  input.form-control#contract-service-price(type="number", tabindex="0", v-model="contract.mensualidad", disabled="disabled")

              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Meses <span class="text-danger">*</span>
                  input.form-control#contract-months(type="number", tabindex="1", value="", v-model="contract.duracion")

              .row
              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Fecha <span class="text-danger">*</span>
                  input.form-control#contract-date(type="date", tabindex="2", v-model="contract.fecha")

              .col-md-6
                .input-group(v-if="createdContract")
                  span.input-group-addon#basic-addon1 Pagar Hasta
                  select.form-control#select-pay-until(@change="updateUntil", v-model="selectedPayment")
                    option(:value="payment.id_pago", v-for="payment of paymentList") {{ payment.mes }} / {{ payment.anio }}

          .tab-pane.fade.in#equipment(role="tabpanel")
            .row
              h4 Equipo
              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Equipo
                  input.form-control#contract-equipment(type="text",tabindex="3", v-model="contract.nombre_equipo")

                .input-group
                  span.input-group-addon#basic-addon1 Modelo
                  input.form-control#contract-equipment-model(type="text", tabindex="5", v-model="contract.modelo")

                .input-group
                  span.input-group-addon#basic-addon1 Router
                  input.form-control#contract-router(type="text", tabindex="7", v-model="contract.router")

                .input-group
                  span.input-group-addon#basic-addon1 Sector <span class="text-danger">*</span>
                  select.form-control.select-contract-sector(v-model="selectedSection", @change="getIpList")
                    option(:value="option.id", :key="option.id", v-for="option of sectionList") {{ option.text }}

              .col-md-6
                .input-group
                  span.input-group-addon#basic-addon1 Mac Equipo
                  input.form-control#contract-e-mac(type="text", tabindex="4", v-model="contract.mac_equipo")

                .input-group
                  span.input-group-addon#basic-addon1 IP <span class="text-danger">*</span>
                  input.form-control#contract-ip(type="text", tabindex="6", disabled="disabled", v-model="contract.ip" title="seleccione un codigo ip primero")

                .input-group
                  span.input-group-addon#basic-addon1 Mac Router
                  input.form-control#contract-r-mac(type="text", tabindex="8", v-model="contract.mac_router")

                .input-group
                  span.input-group-addon#basic-addon1 Codigo IP <span class="text-danger">*</span>
                  select.form-control#select-contract-code(v-model="contract.codigo", @change="setContractIp" title="seleccione un sector primero")
                    option(:value="option.id", :key="option.id", v-for="option of ipList",) {{ option.id }}

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
          button.btn#btn-save-contract(tabindex="7", @click="add", :disabled="createdContract") Guardar
          a.btn#btn-view-pay(target="_blank" :href="paymentUrl" v-if="createdContract") Pagos
          a.btn#btn-print-contract(target="printframe" :href="printContractUrl" v-if="createdContract") Imprimir
        .row-container.requirement-controls(v-if="mode == 'requirements'")
          a.btn#btn-print-requirement(target="printframe", :href="printRequirementUrl", @click="handleRequirements") Requerimiento

</template>

<script>
  import moment from 'moment';
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
          fecha: moment().format('YYYY-MM-DD'),
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
        paymentList: null,
        selectedSection: null,
        selectedPayment: null,
        searchEndpoint: '/clients/get_clients/dropdown',
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
        return (this.contract.id_cliente) ? `/app/admin/detalles/${this.contract.id_cliente}/payments` : '#';
      },

      printContractUrl() {
        return `/contract/get_requirements/${this.createdContract}/contrato`;
      },

      printRequirementUrl() {
        return `/contract/get_requirement/${this.contract.id_cliente}/${this.contract.id_servicio}`;
      }
    },

    methods: {
      add() {
        const { contract } = this;
        const empty = utils.isEmpty([contract.id_cliente, contract.id_servicio, contract.fecha, contract.duracion, contract.ip]);
        if (!empty && !this.createdContract) {
          this.$http.post('contract/add', this.getDataForm(contract))
            .then((res) => {
              this.showMessage(res.data.message);
              this.createdContract = res.data.contract;
              this.paymentList = res.data.payments;
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
            this.contract.ip = item.ip;
          }
        });
      },

      updateUntil() {
        const form = {
          id_contrato: this.createdContract,
          last_payment_id: this.selectedPayment
        };
        this.$http.post('contract/up_to_date', this.getDataForm(form))
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

      selectService(item) {
        this.contract.id_servicio = item.id_servicio;
        this.contract.mensualidad = item.mensualidad;
      },

      setMode(mode) {
        this.mode = mode;
      },

      handleRequirements(e) {
        if (!this.contract.id_cliente || !this.contract.id_servicio) {
          e.preventDefault();
          this.$toasted.info('seleccine un cliente y servicio primero');
        }
      }
    }
  };
</script>
