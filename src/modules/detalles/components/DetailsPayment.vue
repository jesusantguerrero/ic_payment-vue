<template lang="pug">
  .my-wrapper
    .table-wrapper#payment-table-container(v-if="!visible")
      .searcher-container.main-toolbar#payment-toolbar
        .input-group.search
          .input-group-addon: i.material-icons search
          input(type="text", placeholder=" descripcion").form-control.searcher
        .input-group.search
          .input-group-addon: i.material-icons person_pin
          select(name="" , class="form-control", v-model="selectedContract", @change="getPayments")
            option(v-for="contract of contractList", :key="contract.id_contrato", :value="contract.id_contrato") {{ contract.id_contrato}}
      DataTable(ids="payment-table", :toolbar="toolbar", :parentId="parentId", :data="payments", :cols="cols", :options="tableOptions")

    form.card#app-pago-extra(v-if="visible")
      .row
        h4.col-md-10 {{ payment.concepto }}
        .col-md-1.mb-1
          button(class="btn btn-gray lg" type="submit" @click.prevent.stop="goBack"): i.material-icons arrow_back

        .col-md-1.mb-1
          button(class="btn btn-gray lg" type="submit" @click.prevent.stop=""): i.material-icons add

      br
      .row
        .col-md-6.mb-3
          label(for="validationCustom02") Concepto
          input(type="text" class="form-control" id="validationCustom02" v-model="payment.concepto", disabled="true")
        .col-md-6.mb-3
          label(for="validationCustom01") Detalle
          input(type="text" class="form-control", v-model="payment.detalles_extra", disabled="true")

      .row
        .col-md-6.mb-3
          label(for="validationCustom01") Fecha de Pago
          input(type="date" class="form-control" id="validationCustom02" v-model="payment.fecha_pago")
        .col-md-6.mb-3
          label(for="validationCustom02") Fecha Limite
          input(type="date" class="form-control" id="validationCustom02" v-model="payment.fecha_limite", disabled="true")
      .row
        .col-md-3.mb-3
          label(for="validationCustom03") Cuota
          input(type="number" class="form-control" id="validationCustom03" v-model="cuota",disabled="true")
        .col-md-3.mb-3
          label(for="validationCustom03") Mora
          input(type="number" class="form-control" id="validationCustom03" v-model="payment.mora",disabled="true")
        .col-md-3.mb-3
          label(for="validationCustom03") Monto Extra
          input(type="number" class="form-control" id="validationCustom03" v-model="payment.monto_extra",disabled="true")
        .col-md-3.mb-3
          label(for="validationCustom03") Total
          input(type="number" class="form-control" id="validationCustom03" v-model="total",disabled="true")
      .row
        .col-md-3.mb-3
          label(for="validationCustom05") Aplicar Mora
           ActiveButton(class="btn lg", :active="hasMora", text="Mora", @click="changeMora")
        .col-md-3.mb-3
          label(for="validationCustom05") Aplicar Reconexion
          ActiveButton(class="btn lg", :active="hasReconection", text="reconexion", @click="changeReconection")
        .col-md-3.mb-3
          label(for="validationCustom05") Modo Pago
          select(type="text" class="form-control" id="validationCustom05" v-model="payment.tipo")
            option(value="efectivo") Efectivo
            option(value="banco") Banco
          br
        .col-md-3.mb-3
          label Recibo
          br
          p(v-if="isPaid")
            a(target="printframe" :href="url_receipt"): i.material-icons description
            | {{payment.estado}}

      .row(:class="firstControls")
        .col-md-3.mb-3
          label(for="validationCustom05") Eliminar Extras
          select(type="text" class="form-control",v-model="extra.serviceToDelete" @change="deleteExtra")
            option(v-for="item of aditionalServices",:key="item.id_servicio", :value="item.id_servicio") {{ item.servicio }}
        .col-md-3.mb-3
          ServiceSelector#select-extra(type="text",title="Agregar Extra",:value="extra.serviceToAdd", @change="setExtra")
        .col-md-3.mb-3
          button(class="btn btn-primary lg" type="submit" @click.prevent.stop="deletePaymentConfirmation(payment.id_pago)") Deshacer Pago
        .col-md-3.mb-3(v-if="!isPaid")
          button(class="btn btn-primary lg" type="submit" @click.prevent.stop="preparePayment") Aplicar Pago

</template>


<script>
    import DataTable from './../../sharedComponents/DataTable';
    import ServiceSelector from './../../sharedComponents/ServiceSelector';
    import ActiveButton from './../../sharedComponents/ActiveButton';
    import utils from './../../sharedComponents/utils';

    export default {
      components: {
        DataTable,
        ServiceSelector,
        ActiveButton
      },
      props: {
        clientId: {
          type: String,
          required: true
        },
        store: {
          type: Object,
          required: true
        }
      },
      data() {
        return {
          extra: {
            serviceToDelete: null,
            serviceToAdd: false
          },
          contractList: null,
          extras: '',
          parentId: '#payment-table-container',
          toolbar: '#payment-toolbar',
          tableOptions: {
            pageSize: 200,
            pageList: [50, 100, 200, 500, 1000],
          },
          serviceOfPayment: {},
          payments: '',
          paymentList: [],
          payment: {
            id_pago: 0,
            id_contrato: 0,
            id_servicio: 0,
            id_empleado: 0,
            fecha_pago: '',
            concepto: 'extra',
            detalles_extra: '',
            cuota: '',
            mora: '',
            monto_extra: '',
            total: '',
            estado: '',
            fecha_limite: '',
            complete_date: '',
            descuento: '',
            razon_descuento: '',
            deuda: '',
            abono_a: '',
            tipo: '',
            generado: ''
          },
          visible: false,
          firstControls: {
            hide: false
          }
        };
      },

      computed: {
        url_receipt() {
          return `${baseURL}payment/get_receipt/${this.payment.id_pago}`;
        },

        isPaid() {
          return (this.payment.estado === 'pagado');
        },

        hasMora() {
          return (this.payment.mora > 0);
        },

        aditionalServices() {
          if (this.payment.servicios_adicionales) {
            return JSON.parse(this.payment.servicios_adicionales);
          }
          return false;
        },

        hasReconection() {
          if (this.aditionalServices) {
            const extraServices = Object.keys(this.aditionalServices);
            return extraServices.includes('0'); // 0 is the code for reconection
          }
          return false;
        },

        cuota() {
          return this.serviceOfPayment.mensualidad - this.payment.descuento;
        },

        total() {
          return utils.sum([this.cuota, this.payment.mora, this.payment.monto_extra]);
        },

        paymentDate: {
          set(val) {
            this.payment.fecha_pago = val;
            this.paymentDate = val;
          },
          get() {
            return (this.payment.fecha_pago) ? this.payment.fecha_pago : moment().format('YYYY-MM-DD');
          }
        },

        selectedContract: {
          set(val) {
            this.store.setSelectedContract(val);
          },

          get() {
            return this.store.selectedContract;
          }
        },

        cols() {
          const paymentEvents = {
            'click .delete-payment': (e, value, row) => {
              this.deletePaymentConfirmation(row.id);
            },
            'click .pay-payment': (e, value, row) => {
              this.selectRow(row);
            }
          };

          const { paymentColumns } = this.store;
          paymentColumns[0].events = paymentEvents;
          return paymentColumns;
        },
      },

      mounted() {
        this.getContracts();
        window.appBus.$on('details.save-abono', () => {
          this.getPayments();
        });
      },

      methods: {
        getContracts() {
          this.$http.get(`contract/get_contracts/${this.clientId}/dropdown`)
            .then((res) => {
              this.contractList = res.data.contracts;
              const len = res.data.contracts.length;
              if (len) {
                this.store.setSelectedContract(this.contractList[len - 1].id_contrato);
                this.getPayments();
              }
            });
        },

        goBack() {
          this.visible = false;
          this.getPayments();
          this.resetPayment();
        },

        getPayments(paymentId) {
          this.$http.post('payment/get_payments/table', this.getDataForm({ id_contrato: this.store.selectedContract }))
            .then((res) => {
              const { data } = res;
              this.payments = data.payments;
              if (paymentId) {
                this.getPayment(paymentId);
              }
            });
        },

        getPayment(paymentId) {
          if (paymentId) {
            this.$http.post('payment/get_payment', this.getDataForm({ id_pago: paymentId }))
              .then((res) => {
                const { data } = res;
                if (data.payment) {
                  this.payment = data.payment;
                  this.serviceOfPayment = data.service;
                } else {
                  this.resetPayment();
                }
                this.extra.serviceToDelete = null;
                this.extra.serviceToAdd = !this.extra.serviceToAdd;
              });
          }
        },

        preparePayment() {
          if (this.payment.id_pago !== 0) {
            const { payment } = this;
            const form = {
              id: payment.id_pago,
              estado: 'pagado',
              fecha_pago: payment.fecha_pago || utils.now(),
              tipo: payment.tipo,
              id_contrato: payment.id_contrato
            };
            this.applyPayment('payment/apply_payment', form);
          } else {
            this.$toasted.info('Noo hay pago seleccionado');
          }
        },

        prepareDiscount() {
          const { payment } = this;
          const form = {
            id_pago: payment.id_pago,
            id_contrato: payment.id_contrato,
            cuota: this.cuota,
            total: this.total(),
            descuento: this.payment.descuento,
            razon_descuento: this.payment.razon_descuento,
            fecha_pago: payment.fecha_pago
          };
          this.applyPayment('payment/apply_discount', form);
        },

        deletePayment(id) {
          this.$http.post('payment/delete_payment', this.getDataForm({ id_pago: id }))
            .then((res) => {
              this.showMessage(res.data.message);
              if (this.payment.id_pago) {
                this.getPayments(this.payment.id_pago);
              } else {
                this.getPayments();
              }
            })
            .catch((error) => {
              this.$toasted.error(error);
            });
        },

        deletePaymentConfirmation(id) {
          const paymentId = id || this.payment.id_pago;
          this.deleteConfirmation('Deshacer Pago', '¿Segiro de querer deshacer este pago?')
            .then((result) => {
              if (result.value) {
                this.deletePayment(paymentId);
              }
            });
        },

        resetPayment() {
          this.payment = {
            id_pago: 0,
            id_contrato: 0,
            id_servicio: 0,
            id_empleado: 0,
            fecha_pago: '',
            concepto: 'extra',
            detalles_extra: '',
            cuota: '',
            mora: '',
            monto_extra: '',
            total: '',
            estado: '',
            fecha_limite: '',
            complete_date: '',
            descuento: '',
            razon_descuento: '',
            deuda: '',
            abono_a: '',
            tipo: '',
            generado: ''
          };
          this.serviceOfPayment = { mensualidad: 0 };
        },

        applyPayment(endpoint, data) {
          this.$http.post(endpoint, this.getDataForm(data))
            .then((res) => {
              if (res.data.message) {
                this.showMessage(res.data.message);
              }
              this.getPayments(this.payment.id_pago);
            })
            .catch((error) => {
              this.$toasted.error(error);
            });
        },

        selectRow(row) {
          this.visible = true;
          this.getPayment(row.id);
        },

        selectPayment() {
          this.getPayment(this.selectedPayment);
        },

        setExtra(service) {
          const form = { service, id_pago: this.payment.id_pago };
          this.$http.post('payment/set_extra', this.getDataForm(form))
            .then((res) => {
              this.showMessage(res.data.message);
              this.getPayment(this.payment.id_pago);
              this.extra.serviceToAdd = !this.extra.serviceToAdd;
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        },

        deleteExtra() {
          const form = { id_servicio: this.extra.serviceToDelete, id_pago: this.payment.id_pago };
          this.$http.post('payment/delete_extra', this.getDataForm(form))
            .then((res) => {
              this.showMessage(res.data.message);
              this.getPayment(this.payment.id_pago);
              this.extra.serviceToDelete = null;
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        },

        changeReconection() {
          if (this.hasReconection) {
            this.extra.serviceToDelete = 0;
            this.deleteExtra();
          } else {
            this.setExtra(0);
          }
        },

        changeMora() {
          const form = {
            id_pago: this.payment.id_pago,
            mora: 1, // set mora
            cuota: this.serviceOfPayment.mensualidad
          };
          if (this.hasMora) {
            form.mora = 0; // delete mora
          }
          this.applyPayment('payment/set_mora', form);
        }

      }
    };
</script>
