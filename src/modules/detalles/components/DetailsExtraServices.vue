<template lang="pug">
  .wrapper
    DataTable(ids="extra-table", v-if="!visible", :parentId="parentId", :data="extras", :cols="cols", :options="tableOptions", @check-uncheck="selectRow")

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
          select(type="text" class="form-control" id="select-extra-payment")
        .col-md-6.mb-3
          label(for="validationCustom02") Concepto
          input(type="text" class="form-control" id="validationCustom02" v-model="recibo.detalles_extra")

      .row
        .col-md-6.mb-3
          label(for="validationCustom01") Detalle
          input(type="text" class="form-control")
        .col-md-6.mb-3
          label(for="validationCustom02") Fecha
          input(type="date" class="form-control" id="validationCustom02" v-model="recibo.fecha_pago")
      .row
        .col-md-6.mb-3
          label(for="validationCustom03") Monto Abonado
          input(type="number" class="form-control" id="validationCustom03" v-model="recibo.cuota")
        .col-md-3.mb-3
          label(for="validationCustom05") Modo Pago
          select(type="text" class="form-control" id="validationCustom05" v-model="recibo.tipo")
            option(value="efectivo") Efectivo
            option(value="banco") Banco
          br
        .col-md-3.mb-3
          label Recibo
          br
          p(:class="{hide: hide_recibo}")
            a(target="printframe" :href="url_recibo"): i.material-icons description
            | {{recibo.estado}}

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
    import DataTable from './../../sharedComponents/DataTable.vue';
    import ExtraStore from './../../extras/store/ExtraStore';

    const reciboReset = {
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

    export default {
      components: {
        DataTable
      },
      props: {
        clientId: {
          type: String,
          required: true
        }
      },
      data() {
        return {
          recibo: {
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
          firstControls: {
            hide: false
          },
          extras: '',
          paymentList: [],
          parentId: '#client-table-container',
          tableOptions: {
            pageSize: 200,
            pageList: [50, 100, 200, 500, 1000]
          },
        };
      },

      computed: {
        url_recibo() {
          return `${baseURL}process/getrecibo/${this.recibo.id_pago}`;
        },

        hide_recibo() {
          if (this.recibo.estado === 'pagado') {
            return false;
          }
          return this.hide_recibo = true;
        },

        isPaid() {
          this.pagado = (this.recibo.estado === 'pagado');
          return this.pagado;
        },

        cols() {
          const extraStore = new ExtraStore();
          const { colunms } = extraStore;
          colunms.splice(3, 1); // index clientes
          return colunms;
        }
      },

      mounted() {
        this.getExtras();
      },

      methods: {

        goBack() {
          extraTable.el.parents('.bootstrap-table').removeClass('hide');
          this.visible = false;
          this.extra = { concepto: '' };
          extraTable.refresh(listExtras);
        },

        generatePayment() {
          if (this.pagado || this.recibo.id_pago === 0) {
            const form = `data=${JSON.stringify(this.extra)}`;
            this.$http.post('extra/generate_extra_payment', form)
              .then((res) => {
                const { data } = res;
                this.showMessage(data.message);
                selectExtraPayment.html(data.payments).change();
              });
            send.catch(() => {

            });
          } else {
            this.$toasted.info('Debe realizar este pago antes de crear uno nuevo');
          }
        },

        getExtras() {
          this.$http.get(`extra/get_all/${this.clientId}`)
            .then((res) => {
              this.extras = res.data.extras;
            });
        },

        getPayment(paymentId) {
          this.$http.post('extra/get_payment', this.getDataForm({ id_pago: paymentId }))
            .then((res) => {
              const { data } = res;
              if (data.recibo) {
                this.recibo = data.recibo;
              }
            });
        },

        applyPayment() {
          if (this.recibo.id_pago !== 0) {
            this.sender('extra/apply_payment');
          } else {
            this.$toasted.info('Debe generar un pago primero');
          }
        },

        editPayment() {
          this.sender('extra/edit_payment');
        },

        sender(endpoint) {
          const self = this;
          const preparedData = this.prepareData();
          const { info, data } = preparedData;

          const form = `data=${JSON.stringify(data)}&info=${JSON.stringify(info)}`;
          this.$http.post(BASE_URL + endpoint, form)

            .then((res) => {
              if (data.extras) {
                listExtras = res.data.extras;
              }

              if (data.mensaje) {
                this.showMessage(data.mensaje);
              }

              self.getPayments(self.extra.id_extra);
            })
            .catch((error) => {
              this.$toasted.error(error);
            });
        },

        prepareData() {
          const { recibo } = this;
          const data = {
            concepto: 'extra -',
            detalles_extra: recibo.detalles_extra,
            fecha_pago: recibo.fecha_pago,
            cuota: recibo.cuota,
            total: recibo.cuota,
            estado: 'pagado',
            tipo: recibo.tipo,
            generado: true
          };

          const info = {
            id_extra: recibo.id_extra,
            id_pago: recibo.id_pago
          };

          return { data, info };
        },

        getPayments() {
          this.$http.post('extra/get_extra_payment_of', this.getDataForm({ id_extra: this.extra.id_extra }))
            .then((res) => {
              const { data } = res;
              if (!data.pagos) {
                this.recibo = reciboReset;
              }
              this.paymentList = data.pagos;
            });
        },

        deletePayment() {
          const self = this;
          const { recibo } = this;
          const data = {
            id_extra: recibo.id_extra,
            id_pago: recibo.id_pago
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

        selectRow(name, row) {
          this.extra = row;
          this.visible = true;
          this.getPayments(row.id_extra);
        },

        selectPayment() {
          this.getPayment(this.selectedPayment);
        }
      }
    };
</script>

