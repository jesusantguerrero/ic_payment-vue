<template lang="pug">
  #print-view(:class="{hide: isHide}")
    .factura-body
      .cabecera
        .company-name
          h4.company-oficial-name.t-center  {{ appStore.company.nombre }}
          p
        p.fecha-reporte Fecha: {{ cierre.fecha | spanishDateFormat}}
        p: b.hora-reporte Autor {{cierre.autor}}
      .concepto: h4 Cierre de Caja
      .cuerpo
        p
          b Total de ingresos:
          span.right {{ cierre.total_ingresos | currencyFormat }}
        p
          b Pagos via Banco:
          span.right {{ cierre.pagos_banco | currencyFormat }}
        p
          b Pagos en efectivo:
          span.right {{ cierre.pagos_efectivo | currencyFormat }}
        p
          b Efectivo en caja:
          span.right {{ cierre.efectivo_caja | currencyFormat }}
        p
          b Total Descuadre:
          span.right {{ cierre.total_descuadre | currencyFormat }}
        p
          b Gastos :
          span.right {{ cierre.total_gastos | currencyFormat }}
        p
          b Banco(Ganancia):
          span.right {{ cierre.banco | currencyFormat }}

      .pie-pagina
        p.t-center: a(href="#", @click.prevent="print") Imprimir

    .centered-container-small
      a.link.btn(:href="foward.link") <i class="material-icons">power_settings_new</i> {{ foward.text }}
</template>

<script>
  export default {
    props: {
      appStore: {
        type: Object,
        required: true
      },

      cierre: {
        type: Object,
        require: true
      }
    },

    data() {
      return {
        back: {
          link: 'somelink',
          text: 'volver a cierre'
        },

        foward: {
          link: `${baseURL}auth/do_logout`,
          text: 'cerrar session'
        }
      };
    },

    filters: {
      spanishDateFormat(date) {
        moment.locale('es-DO');
        return moment(date).format('dddd DD [de] MMMM [del] YYYY');
      }
    },

    methods: {
      goBack() {
        this.$emit('closing');
      },

      print() {
        print();
      }
    }
};
</script>
