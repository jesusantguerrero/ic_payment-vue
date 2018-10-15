<template lang="pug">
  router-link(:to='link')
    .payment-item
      .left-part
        .item-profile
              i.material-icons person
      .main-part
          .nombre {{ item.cliente }}
          .concepto {{ item.concepto }}
          .monto RD$ {{ item.total | currencyFormat }}
      .right-part
        .payment-day {{ item.dia }}
        .payment-month {{ item.mes }}
</template>

<script>
  export default {
    props: {
      item: Object
    },
    computed: {
      link() {
        return `/detalles/${this.item.id_cliente}/`;
      }
    }
  };
</script>

