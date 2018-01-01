<template lang="pug">
   .col-md-4.col-xs-12.details-card
      .layout-container
          .pagos-layer
              h3.card-title(data-toggle="modal", data-target="#notification-view") Proximos Pagos
              .placeholder-icon: i.material-icons.icon-placeholder notifications_active
              .list-nextpayments

          .averias-layer
              h3.card-title(data-toggle="modal", data-target="#notification-view") Caja Chica
              .placeholder-icon: i.material-icons.icon-placeholder money
              .list-repair.centered-container
                h2.current-saldo RD$ {{ store.pettyCashBalance | currencyFormat }}

          .deudores-layer
              h3.card-title(data-toggle="modal", data-target="#notification-view") Lista de Deudores
              .placeholder-icon: i.material-icons.icon-placeholder money_off
              .list-nextpayments

          .day-income-layer
              h3.card-title(data-toggle="modal", data-target="#notification-view") Ganancias del dia
              .list-repair.centered-container
                  a(target="_blank" href="base_url('process/getreport/payment/today")
                  h2.current-saldo RD$ {{ store.dayIncome | currencyFormat }}

      .details-control-container
        button.detail-control(@click="moveControls(0)") Pagos
        button.detail-control(@click="moveControls(-100)") Caja Chica
        button.detail-control(@click="moveControls(-200)") Deudores
        button.detail-control(@click="moveControls(-300)") Ganancias
</template>


<script>
  export default {
    props: {
      store: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        mode: ''
      };
    },
    mounted() {
      this.moveControls();
    },

    methods: {
      moveControls(position) {
        const layoutContainer = $('.layout-container');
        layoutContainer.animate({
          left: `${position}%`
        }, 200);
      }
    }
  };
</script>
