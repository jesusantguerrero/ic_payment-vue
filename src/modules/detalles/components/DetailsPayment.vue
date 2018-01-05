<template lang="pug">
  .my-wrapper
    .table-wrapper(v-if="!visible")
      DataTable(ids="payment-table", :parentId="parentId", :data="payments", :cols="cols", :options="tableOptions")

    form.card#app-pago-extra(v-if="visible")
      .row
        h4.col-md-10 {{ payment.concepto }}
        .col-md-1.mb-1
          button(class="btn btn-gray lg" type="submit" @click.prevent.stop="goBack"): i.material-icons arrow_back

        .col-md-1.mb-1
          button(class="btn btn-gray lg" type="submit" @click.prevent.stop="generatePayment"): i.material-icons add

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
          button(class="btn btn-gray lg") Mora
        .col-md-3.mb-3
          label(for="validationCustom05") Aplicar Reconexion
          button(class="btn btn-gray lg") Reconexion
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
          button(class="btn btn-primary lg" type="submit" @click.prevent.stop="deletePayment") Eliminar Pago
        .col-md-3.mb-3(v-if="!isPaid")
          button(class="btn btn-primary lg" type="submit" @click.prevent.stop="applyPayment") Aplicar Pago
        .col-md-3.mb-3(v-if="isPaid")
          button(class="btn btn-success lg" type="submit" @click.prevent.stop="editPayment") Cambiar
</template>


<script>
    import DataTable from './../../sharedComponents/DataTable';
    import ServiceSelector from './../../sharedComponents/ServiceSelector';

    export default {
      components: {
        DataTable,
        ServiceSelector
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
          extras: '',
          parentId: '#client-table-container',
          tableOptions: {
            pageSize: 200,
            pageList: [50, 100, 200, 500, 1000],
            search: false
          },
          selectedPayment: {},
          selectedContract: null,
          payments: '',
          paymentList: [],
          payment: {
            id_pago: 0,
            id_contrato: 0,
            id_servicio: 0,
            id_empleado: 0,
            fecha_pago: 'dd/mm/yyyy',
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
          return `${baseURL}process/getrecibo/${this.payment.id_pago}`;
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
          return (this.aditionalServices && this.aditionalServices.includes(0));
        },

        cuota() {
          return this.payment.cuota - this.payment.descuento;
        },

        total() {
          return this.cuota + this.payment.mora + this.payment.monto_extra;
        },

        cols() {
          const paymentEvents = {
            'click .delete-payment': (e, value, row) => {
              this.deleteConfirmation('Deshacer Pago', '¿Segiro de querer deshacer este pago?')
                .then((result) => {
                  if (result.value) {
                    this.deletePayment(row.id);
                  }
                });
            },
            'click .pay-payment': (e, value, row) => {
              this.selectRow(row);
            }
          };

          const { paymentColumns } = this.store;
          paymentColumns[0].events = paymentEvents;
          return paymentColumns;
        }
      },

      mounted() {
        this.getContracts();
      },

      methods: {
        getContracts() {
          this.$http.get(`contract/get_contracts/${this.clientId}/dropdown`)
            .then((res) => {
              this.contractList = res.data.contracts;
              const len = res.data.contracts.length;
              if (len) {
                this.selectedContract = this.contractList[len - 1].id_contrato;
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
          this.$http.post('payment/get_payments/table', this.getDataForm({ id_contrato: this.selectedContract }))
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
                } else {
                  this.resetPayment();
                }
                this.extra.serviceToDelete = null;
                this.extra.serviceToAdd = !this.extra.serviceToAdd;
              });
          }
        },

        generatePayment() {
          if (this.is_paid || this.payment.id_pago === 0) {
            const form = {
              id_extra: this.extra.id,
              id_servicio: this.extra.id_servicio
            };
            this.$http.post('extra/generate_extra_payment', this.getDataForm(form))
              .then((res) => {
                const { data } = res;
                this.showMessage(data.message);
                this.getPayments();
              })
              .catch((err) => {
                this.$toasted.error(err);
              });
          } else {
            this.$toasted.info('Debe realizar este pago antes de crear uno nuevo');
          }
        },

        applyPayment() {
          if (this.payment.id_pago !== 0 && this.payment.cuota > 0) {
            this.sender('extra/apply_payment');
          } else {
            this.$toasted.info('Debe generar un pago primero o el pago debe ser mayor a cero');
          }
        },

        editPayment() {
          this.sender('extra/edit_payment');
        },

        deletePayment(id) {
          this.$http.post('payment/delete_payment', this.getDataForm({ id_pago: id }))
            .then((res) => {
              this.showMessage(res.data.message);
              if (this.payment.id_pago) {
                this.getPayments(this.payment.id_pago);
              }
            })
            .catch((error) => {
              this.$toasted.error(error);
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
        },

        prepareData() {
          const { payment } = this;
          const data = {
            concepto: `${payment.concepto}`,
            detalles_extra: payment.detalles_extra,
            fecha_pago: payment.fecha_pago,
            cuota: payment.cuota,
            total: payment.cuota,
            estado: 'pagado',
            tipo: payment.tipo,
            generado: true
          };

          const info = {
            id_extra: payment.id_extra,
            id_pago: payment.id_pago
          };

          return { data, info };
        },

        sender(endpoint) {
          const preparedData = this.prepareData();
          const { info, data } = preparedData;

          const form = `data=${JSON.stringify(data)}&info=${JSON.stringify(info)}`;
          this.$http.post(endpoint, form)
            .then((res) => {
              if (res.data.message) {
                this.showMessage(res.data.message);
              }
              this.getPayments(info.id_pago);
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
        }

      }
    };
</script>
