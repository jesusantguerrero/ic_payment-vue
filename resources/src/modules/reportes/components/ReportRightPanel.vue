<template lang="pug">
  .col-md-3.right-panel
      div
        ul.nav.nav-tabs(role="tablist")
          li(role="presentation" class="active"): a(href="#general" aria-controls="home" role="tab" data-toggle="tab") General
          li(role="presentation"): a(href="#week" aria-controls="week" role="tab" data-toggle="tab") Semana

        .tab-content
          .tab-pane.fade.in.active#general(role="tabpanel")
            .today-data
              h5 Ventas de hoy
              p
                a(target="printframe" href="<?php echo base_url('process/getreport/payment/today') ?>")
                span(class="amount") RD$ {{ appStore.dayIncome | currencyFormat }}

              div
                h5 Clientes Por Servicios
                p
                .normal-chart
                  canvas(id="services-chart")

          .tab-pane.fade.in#week(role="tabpanel")
            h5 Ingesos esta semana
            .normal-chart
              canvas(class="little-chart" id="week-chart")
</template>
