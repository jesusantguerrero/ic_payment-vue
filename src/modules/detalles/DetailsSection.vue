<template lang="pug">
  .main-content.detalles.col-md-12
    .row
      .col-xs-6.col-md-3.center-row.aside-wide-left
        .client-profile
          span {{ initials }}
        h5 {{ fullname }}
        p.detail-stat
          i.material-icons timeline
          | {{ client.estado }}

        .payment-controls
          .input-group
            span.input-group-addon#addon Contrato
            //-  <select  class="form-control" id="select-contract"> // contracts </select> -->
          .box#payment-detail-box(:class="{visible: activeTab == 'payments'}")
            .box-header.with-border
              h3.box-title Detalles de Pago
              .box-tools.pull-right
                button(type="button", class="mybtn btn-box-tool", data-widget="collapse"): i.fa.fa-minus

            .box-body
              h6 Forma de pago
              .btn-group(role="group", aria-label="Basic example")
                button(type="button", class="btn btn-small payment-mode") efectivo
                button(type="button", class="btn btn-small payment-mode") banco
          button(class="btn" id="btn-pay") Registrar Pago
        .contract-controls.hide
          button.btn.icon#btn-detail-cancel-contract(title="cancelar contrato", disabled="true"): i.material-icons delete
          button.btn.icon#btn-detail-suspend-contract(title="suspender contrato" disabled="true"): i.material-icons report_problem
          button.btn.icon#btn-call-reconnect(title="Reconectar", disabled="true"): i.material-icons fiber_smart_record
          button.btn.icon#btn-call-extra(title="extras", disabled="true"): i.material-icons more

      .col-md-9.wide-main-content
        .wrapper
          ul.nav.nav-tabs(role="tablist", id="main-tabs")
            li(role="presentation", :class="{active : activeTab == 'client'}"): a(href="#client" aria-controls="home" role="tab" data-toggle="tab") Cliente
            li(role="presentation", :class="{active : activeTab == 'payments'}"): a(href="#payments" aria-controls="messages" role="tab" data-toggle="tab") Pagos
            li(role="presentation", :class="{active : activeTab == 'abonos'}"): a(href="#abonos" aria-controls="settings" role="tab" data-toggle="tab", ) Abonos
            li(role="presentation", :class="{active : activeTab == 'observations'}"): a(href="#observations" aria-controls="settings" role="tab" data-toggle="tab") Observaciones
            li(role="presentation", :class="{active : activeTab == 'extras'}")
              a(href="#extras" aria-controls="settings" role="tab" data-toggle="tab") Extras
                span(v-if="store.activeExtras" class="badge") {{ store.activeExtras }}


          .tab-content
            .tab-pane.fade.in#client(role="tabpanel", :class="{active : activeTab == 'client'}")
              DetailsProfile(:client="client", :fullname="fullname")

            .tab-pane.fade.in#payments(role="tabpanel", :class="{active : activeTab == 'payments'}")
              DetailsPayment(:clientId="clientId", :store="store" )

            .tab-pane.fade.in#abonos(role="tabpanel", :class="{active : activeTab == 'abonos'}")
              DetailsAbonos(:store="store" )

            .tab-pane.fade.in#observations(role="tabpanel", :class="{active : activeTab == 'observations'}")
              DetailsObservations(:client="client", :save-observation="saveObservation")

            .tab-pane.fade.in#extras(role="tabpanel", :class="{active : activeTab == 'extras'}")
              DetailsExtraServices(:clientId="clientId", :store="store" )

</template>

<script>
  import DetailsProfile from './components/DetailsProfile';
  import DetailsObservations from './components/DetailsObservations';
  import DetailsExtraServices from './components/DetailsExtraServices';
  import DetailsPayment from './components/DetailsPayment';
  import DetailsAbonos from './components/DetailsAbonos';
  import DetailsStore from './store/DetailsStore';
  import utils from './../sharedComponents/utils';

  const store = new DetailsStore();

  export default {
    props: {
      clientId: {
        type: String
      },
      activeWindow: {
        type: String
      }
    },
    components: {
      DetailsProfile,
      DetailsObservations,
      DetailsExtraServices,
      DetailsPayment,
      DetailsAbonos
    },

    data() {
      return {
        client: {},
        activeTab: '',
        store
      };
    },

    mounted() {
      this.getClient();
      this.activeTab = this.activeWindow;
      utils.spyLeftNavigation();
    },
    computed: {
      initials() {
        const { client } = this;
        return (client.nombres) ? `${client.nombres[0]}${client.apellidos[0]}` : 'N/D';
      },

      fullname() {
        const { client } = this;
        return `${client.nombres} ${client.apellidos}`;
      }
    },

    methods: {
      getClient() {
        this.$http.post('clients/get_client', this.getDataForm({ id: this.clientId }))
          .then((res) => {
            this.client = res.data.client;
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },

      saveObservation() {
        const form = {
          id: this.clientId,
          row: 'observaciones',
          value: this.client.observaciones
        };

        this.$http.post('clients/update_row', this.getDataForm(form))
          .then((res) => {
            if (res.data.message.type === 'success') {
              this.client.observaciones = this.client.observaciones;
            }
            this.showMessage(res.data.message);
          });
      },

      changeTab(tabName) {
        this.activeTab = tabName;
      }
    }
  };
</script>
