<template lang="pug">
  .my-wrapper
    .table-wrapper(v-if="!visible")
      DataTable(ids="extra-table", :parentId="parentId", :data="extras", :cols="cols", :options="tableOptions")

    form.card#app-pago-extra(v-if="visible")
      .row
        h4.col-md-10 {{extra.concepto}}
        .col-md-1.mb-1
          button(class="btn btn-gray lg" type="submit" @click.prevent.stop="goBack"): i.material-icons arrow_back

        .col-md-1.mb-1
          button(class="btn btn-gray lg" type="submit" @click.prevent.stop="generatePayment"): i.material-icons add

      br
      .row
        .col-md-6.mb-3
          label(for="validationCustom01") Pago
          select(type="text" class="form-control" id="select-extra-payment", v-model="selectedPayment", @change="getPayment")
            option(v-for="payment of paymentList", :value="payment.id_pago") {{ payment.concepto }}
        .col-md-6.mb-3
          label(for="validationCustom02") Concepto
          input(type="text" class="form-control" id="validationCustom02" v-model="payment.concepto")

      .row
        .col-md-6.mb-3
          label(for="validationCustom01") Detalle
          input(type="text" class="form-control", v-model="payment.detalle_extra")
        .col-md-6.mb-3
          label(for="validationCustom02") Fecha
          input(type="date" class="form-control" id="validationCustom02" v-model="payment.fecha_pago")
      .row
        .col-md-6.mb-3
          label(for="validationCustom03") Monto Abonado
          input(type="number" class="form-control" id="validationCustom03" v-model="payment.cuota")
        .col-md-3.mb-3
          label(for="validationCustom05") Modo Pago
          select(type="text" class="form-control" id="validationCustom05" v-model="payment.tipo")
            option(value="efectivo") Efectivo
            option(value="banco") Banco
          br
        .col-md-3.mb-3
          label Recibo
          br
          p(:class="{hide: hide_receipt}")
            a(target="printframe" :href="url_receipt"): i.material-icons description
            | {{payment.estado}}

      .row(:class="firstControls")
        .col-md-6.mb-3

        .col-md-3.mb-3
          button(class="btn btn-primary lg" type="submit" @click.prevent.stop="deletePayment") Eliminar Pago
        .col-md-3.mb-3(v-if="!isPaid")
          button(class="btn btn-primary lg" type="submit" @click.prevent.stop="applyPayment") Aplicar Pago
        .col-md-3.mb-3(v-if="isPaid")
          button(class="btn btn-success lg" type="submit" @click.prevent.stop="editPayment") Cambiar
</template>


<script>
    import swal from 'sweetalert2';
    import DataTable from './../../sharedComponents/DataTable';
    import ExtraStore from './../../extras/store/ExtraStore';

    export default {
      components: {
        DataTable
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
            controls: '',
            id_extra: '',
            id_servicio: '',
            checkbox: '',
            fecha: '',
            concepto: '',
            ultimo_pago: '',
            monto_pagado: '',
            monto_total: '',
            estado: ''
          },
          extras: '',
          parentId: '#client-table-container',
          tableOptions: {
            pageSize: 200,
            pageList: [50, 100, 200, 500, 1000]
          },
          selectedPayment: {},
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
          pagado: false,
          firstControls: {
            hide: false
          }
        };
      },

      computed: {
        url_receipt() {
          return `${baseURL}process/getrecibo/${this.payment.id_pago}`;
        },

        hide_receipt() {
          if (this.payment.estado === 'pagado') {
            return false;
          }
          return this.hide_receipt = true;
        },

        isPaid() {
          this.pagado = (this.payment.estado === 'pagado');
          return this.pagado;
        },

        cols() {
          const extraEvents = {
            'click .delete-extra': (e, value, row) => {
              const self = this;
              swal({
                title: 'Eliminar Extra',
                text: '¿Estas seguro de querer eliminar esto?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.value) {
                  self.deleteExtra(row.id);
                }
              });
            },
            'click .pay-extra': (e, value, row) => {
              this.selectRow(row);
            }
          };

          const extraStore = new ExtraStore();
          const { colunms } = extraStore;
          colunms.splice(3, 1); // index clientes
          colunms[0].events = extraEvents;
          return colunms;
        }
      },

      mounted() {
        this.getExtras();
      },

      methods: {
        getExtras() {
          this.$http.get(`extra/get_all/${this.clientId}`)
            .then((res) => {
              this.extras = res.data.extras;
              this.store.setActiveExtras(res.data.actives);
            });
        },

        deleteExtra(id) {
          const form = { id, id_cliente: this.clientId };
          this.$http.post('extra/delete_extra', this.getDataForm(form))
            .then((res) => {
              this.showMessage(res.data.message);
              this.getExtras();
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        },

        goBack() {
          this.visible = false;
          this.extra = { concepto: '' };
          this.getExtras();
        },

        getPayments(selectedId) {
          this.$http.post('extra/get_extra_payments', this.getDataForm({ id_extra: this.extra.id }))
            .then((res) => {
              const { data } = res;
              this.paymentList = data.payments;
              if (!data.payments) {
                this.resetPayment();
              } else {
                const len = data.payments.length;
                if (len && !selectedId) {
                  this.selectedPayment = this.paymentList[0].id_pago;
                } else if (selectedId) {
                  this.selectedPayment = selectedId;
                }
                this.getPayment();
              }
            });
        },

        getPayment() {
          if (this.selectedPayment) {
            this.$http.post('extra/get_payment', this.getDataForm({ id_pago: this.selectedPayment }))
              .then((res) => {
                const { data } = res;
                if (data.payment) {
                  this.payment = data.payment;
                } else {
                  this.resetPayment();
                }
              });
          }
        },

        generatePayment() {
          if (this.pagado || this.payment.id_pago === 0) {
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

        deletePayment() {
          const self = this;
          const { payment } = this;
          const data = {
            id_extra: payment.id_extra,
            id_pago: payment.id_pago
          };

          this.$http.post('extra/delete_payment', this.getDataForm(data))
            .then((res) => {
              this.showMessage(res.data.message);
              self.getPayments(self.extra.id_extra);
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
          this.extra = row;
          this.visible = true;
          this.getPayments();
        },

        selectPayment() {
          this.getPayment(this.selectedPayment);
        }
      }
    };
</script>
