<template lang="pug">
   .col-md-4.col-xs-12.details-card
      .layout-container
          .pagos-layer
              h3.card-title Proximos Pagos
              .placeholder-icon: i.material-icons.icon-placeholder notifications_active
              .list-nextpayments
                HomeDetailCardsItem(v-for="item of nextPayments", :key="item.id_cliente", :item="item")

          .averias-layer
              h3.card-title Caja Chica
              .placeholder-icon: i.material-icons.icon-placeholder money
              .list-repair.centered-container
                h2.current-saldo RD$ {{ store.pettyCashBalance | currencyFormat }}

          .deudores-layer
              h3.card-title Lista de Deudores
              .placeholder-icon: i.material-icons.icon-placeholder money_off
              .list-nextpayments
                HomeDetailCardsItem(v-for="item of debtors", :key="item.id_cliente", :item="item")

          .day-income-layer
              h3.card-title Ganancias del dia
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
  import HomeDetailCardsItem from './HomeDetailCardsItem.vue';

  export default {
    components: {
      HomeDetailCardsItem
    },
    props: {
      store: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        mode: '',
        nextPayments: null,
        debtors: null
      };
    },
    mounted() {
      this.moveControls();
      this.getList('get_next_payments', 'nextPayments');
      this.getList('get_debtors', 'debtors');
    },

    methods: {
      moveControls(position) {
        const layoutContainer = $('.layout-container');
        layoutContainer.animate({
          left: `${position}%`
        }, 200);
      },

      getList(endpoint, propertyToFill) {
        this.$http.get(`report/${endpoint}`)
          .then((res) => {
            this[propertyToFill] = res.data[propertyToFill];
          });
      },

    }
  };
</script>
