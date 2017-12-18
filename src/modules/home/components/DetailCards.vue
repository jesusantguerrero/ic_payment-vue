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
                h2.current-saldo {{ store.pettyCashBalance | currencyFormat }}

          .deudores-layer
              h3.card-title(data-toggle="modal", data-target="#notification-view") Lista de Deudores
              .placeholder-icon: i.material-icons.icon-placeholder money_off
              .list-nextpayments

          .day-income-layer
              h3.card-title(data-toggle="modal", data-target="#notification-view") Ganancias del dia
              .list-repair.centered-container
                  a(target="_blank" href="base_url('process/getreport/payment/today")
                  h2.current-saldo day_income

      .details-card-controls
        .detail-card__control A
        .detail-card__control B
        .detail-card__control C
        .detail-card__control D
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
      moveControls() {
        const btnAverias = $('#btn-see-averias');
        const btnPagos = $('#btn-see-pagos');
        const btnDeudores = $('#btn-see-deudores');
        const btnDayIncomes = $('#btn-see-day-incomes');
        const layoutContainer = $('.layout-container');

        btnAverias.on('click', () => {
          layoutContainer.animate({
            left: '-100%'
          }, 200);
        });

        btnPagos.on('click', () => {
          layoutContainer.animate({
            left: '0'
          }, 200);
        });

        btnDeudores.on('click', () => {
          layoutContainer.animate({
            left: '-200%'
          }, 200);
        });

        btnDayIncomes.on('click', () => {
          layoutContainer.animate({
            left: '-300%'
          }, 200);
        });
      }
    }
  };
</script>
