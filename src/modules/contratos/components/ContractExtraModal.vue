<template lang="pug">
   .modal.fade(tabindex="-1", role="dialog", id="contract-extra-modal")
    .modal-dialog.modal-lg(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title Servicios Extras
        .modal-body
          .tab-container
            ul.nav.nav-tabs(role="tablist")
              li(role="presentation" class="active", @click="setMode(null)"): a(href="#extra-contract" aria-controls="extra-contract" role="tab" data-toggle="tab") Contrato
              li(role="presentation", @click="setMode('guardar')"): a(href="#extra-service" aria-controls="extra-service" role="tab" data-toggle="tab") Servicio
              li(role="presentation", @click="setMode('extender')"): a(href="#extra-extension" aria-controls="extra-extension" role="tab" data-toggle="tab") Extender Contrato
              li(role="presentation", @click="setMode('mejorar')"): a(href="#extra-upgrade" aria-controls="extra-upgrade" role="tab" data-toggle="tab") Mejorar Contrato


            .tab-content
              .tab-pane.active.fade.in#extra-contract(role="tabpanel")
                form
                  .row
                    .col-md-6
                      h4 Datos del contrato
                      .form-group
                        label(for="client-dni") Cedula(sin guiones)
                        PhoneInput(placeholder="cedula", types="text",ids="client-dni" role="dni" data="cedula", :value="contract.cedula", class="form-control", disabled="true")
                      .form-group
                        label(for="client-name") Cliente
                        input(type="text", class="form-control", id="client-name", tabindex="1", v-model="contract.cliente", disabled="true")
                      .form-group
                        label(for="client-name") Codigo IP
                        input(type="text", class="form-control", id="client-name", tabindex="1", v-model="contract.ip", disabled="true")

                    .col-md-6
                      h4.placeholder ...
                      .form-group
                        label(for="client-lastname") Codigo del Contrato
                        input(type="text", class="form-control", id="client-lastname", tabindex="2", v-model="contract.codigo", disabled="true")
                      .form-group
                        label(for="client-phone") Servicio
                        input(type="text", class="form-control", id="client-name", tabindex="1", v-model="contract.servicio", disabled="true")

              .tab-pane.fade.in#extra-service(role="tabpanel")
                form
                  .row
                    .col-md-6
                      .form-group
                        ServiceSelector#select-extra-service(type="text", :value="extra.serviceId", @change="setExtraPrice")

                      .form-group
                        label(for="cient-sector") Equipo
                        input(class="form-control", id="client-sector", tabindex="6", v-model="contract.equipo")

                      .form-group
                        label(for="cient-sector") Router
                        input(class="form-control", id="client-sector", tabindex="6", v-model="contract.router")

                      .form-group
                        label(for="client-provincia") Modo de Pago
                        select.form-control#select-extra-service(type="text", v-model="extra.paymentMode")
                          option(:value="option.id" , v-for="option of paymentModes") {{ option.text }}


                    .col-md-6
                      .form-group
                        label(for="client-street") Precio
                        input(type="text", class="form-control", id="client-street", tabindex="6", v-model="extra.price", disabled="true")

                      .form-group
                        label(for="client-house") Mac Equipo
                        input(type="text", class="form-control", id="client-house", tabindex="7", v-model="contract.mac_equipo")

                      .form-group
                        label(for="client-house") Mac Router
                        input(type="text", class="form-control", id="client-house", tabindex="7", v-model="contract.mac_router")

                      .form-group
                        label(for="client-house") Seguro
                        .input-group.normal-height
                          input.form-control#contract-ensurance(type="text", class="form-control", tabindex="6", disabled="true", :value="ensuranceName")
                          span.input-group-btn: button.btn.btn-danger.icon(type="button", id="delete-extra", @click="deleteExtra"): i.material-icons delete


              .tab-pane.fade.in#extra-extension(role="tabpanel")
                form
                  .row
                    .col-md-6
                      .form-group
                        label(for="client-job") Meses de Extension
                        input(type="number", class="form-control", id="client-salary", value="0", v-model="extension.duration")
              .tab-pane.fade.in#extra-upgrade(role="tabpanel")
                h4 Selecciona Plan
                  InternetPlans(@selected="selectService")

        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-save-client", @click.stop.prevent='save', v-if="mode") {{ mode }}
</template>

<script>
  import swal from 'sweetalert2';
  import utils from './../../sharedComponents/utils';
  import InternetPlans from './../../sharedComponents/InternetPlans';
  import PhoneInput from './../../sharedComponents/PhoneInput';
  import ServiceSelector from './../../sharedComponents/ServiceSelector';
  import ServicesService from './../../servicios/service/serviceService';

  const servicesService = new ServicesService();

  export default {
    components: {
      InternetPlans,
      PhoneInput,
      ServiceSelector
    },
    props: {
      contract: {
        type: Object
      },
      store: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        mode: null,
        upgradeData: {
          serviceId: null,
          price: 0.00
        },
        extra: {
          serviceId: null,
          price: 0.00,
          paymentMode: ''
        },
        extension: {
          duration: 0
        },
        ensuranceName: '',
        paymentModes: [
          { id: 0, text: '-- seleccione --' },
          { id: 1, text: 'Cargar al proximo pago' },
          { id: 2, text: 'Factura aparte' },
          { id: 3, text: 'Mensualidad Fija - seguro' }
        ]
      };
    },


    mounted() {
      $('#contract-extra-modal').on('hide.bs.modal', () => {
        this.$emit('dimiss');
        this.store.contractEmpty();
      });
    },
    watch: {
      contract() {
        this.getEnsurance();
      }
    },
    methods: {
      emitChange() {
        this.$emit('save');
      },

      setMode(mode) {
        this.mode = mode;
      },

      save() {
        switch (this.mode) {
          case 'mejorar':
            this.upgrade();
            break;
          case 'extender':
            this.extend();
            break;
          case 'guardar':
            this.addExtra();
            break;
          default:
            // do nothing
        }
      },

      upgrade() {
        const { contract, upgradeData } = this;
        const form = {
          id_contrato: contract.id_contrato,
          id_servicio: upgradeData.serviceId,
          cuota: upgradeData.price
        };

        const empty = utils.isEmpty(form);
        if (!empty) {
          this.$http.post('contract/upgrade', this.getDataForm(form))
            .then((res) => {
              this.showMessage(res.data.message);
              this.emitChange();
            });
        } else {
          this.$toasted.info('asegurate de llenar todos los datos y seleccionar el servicio');
        }
      },

      addExtra() {
        const { contract, extra } = this;
        const form = {
          id_contrato: contract.id_contrato,
          id_servicio: extra.serviceId,
          costo_servicio: extra.price,
          nombre_equipo: contract.nombre_equipo,
          mac_equipo: contract.mac_equipo,
          router: contract.router,
          mac_router: contract.mac_router,
          modo_pago: extra.paymentMode
        };

        const empty = utils.isEmpty([form.id_servicio, form.modo_pago]);
        if (!empty) {
          this.$http.post('contract/add_extra', this.getDataForm(form))
            .then((res) => {
              if (res.data.message.type === 'success') {
                if (extra.paymentMode === 3) {
                  this.contract.extras_fijos = extra.serviceId;
                  this.getEnsurance();
                }
                this.emptyExtra();
              }
              this.showMessage(res.data.message);
              this.emitChange();
            });
        } else {
          this.$toasted.info('asegurate de llenar todos los datos y seleccionar el servicio');
        }
      },

      extend() {
        const { contract, extension } = this;
        const form = {
          id_contrato: contract.id_contrato,
          duracion: extension.duration,
        };

        const empty = utils.isEmpty(form);
        if (!empty) {
          this.$http.post('contract/extend', this.getDataForm(form))
            .then((res) => {
              this.showMessage(res.data.message);
              this.emitChange();
            });
        } else {
          this.$toasted.info('asegurate de llenar todos los datos y seleccionar el servicio');
        }
      },

      selectService(item) {
        this.upgradeData.serviceId = item.id_servicio;
        this.upgradeData.price = item.mensualidad;
      },

      deleteExtra() {
        const self = this;
        function sendDelete() {
          self.$http.post('contract/delete_extra', self.getDataForm({ id_contrato: self.contract.id_contrato }))
            .then((res) => {
              self.showMessage(res.data.message);
              if (res.data.message.type === 'success') {
                self.contract.extras_fijos = null;
                self.getEnsurance();
              }
              self.emitChange();
            })
            .catch((error) => {
              self.$toasted.error(error.toString());
            });
        }

        if (this.contract.extras_fijos) {
          swal({
            title: 'Está Seguro?',
            text: 'Seguro que desea eliminar el seguro a este contrato?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          })
            .then(() => {
              sendDelete();
              self.contract.ensurance = '';
            });
        } else {
          this.$toasted.info('este cliente no tiene seguro');
        }
      },

      setExtraPrice(item) {
        this.extra.price = item.mensualidad;
        this.extra.serviceId = item.id_servicio;
      },

      emptyExtra() {
        this.extra = {
          serviceId: null,
          price: 0.00,
          paymentMode: ''
        };
      },

      getEnsurance() {
        if (this.contract.extras_fijos) {
          servicesService.getService(this.contract.extras_fijos).then((service) => {
            this.ensuranceName = `${service.nombre} - RD$ ${service.mensualidad}`;
          });
        } else {
          this.ensuranceName = '';
        }
      }
    }
  };
</script>

