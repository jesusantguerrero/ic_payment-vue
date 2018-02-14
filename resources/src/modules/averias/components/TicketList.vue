<template lang="pug">
  #averias-list-view
    .searcher-container.main-toolbar
      .input-group.search
        .input-group-addon: i.material-icons search
        input.form-control.searcher(type="text", v-model="dataSearch.text", @keyup="search", placeholder="Busque averia por cliente")
      .pull-right
        a(target="_blank" href="#" class="btn icon"): i.material-icons build <span class="total-rows"></span>
      .pull-right
        a(target="_blank", :href="printLink", class="btn icon print-table"): i.material-icons print
      .pull-right
        select#averias-view-mode.form-group.filter.btn.btn-primary(v-model="dataSearch.state", @change="search")
          option(value="por reparar") Por Reparar
          option(value="reparado") Reparados
          option(value="todos") Todos
    .averia-item-list#averia-list
      h6 {{ searchResults }}
      TicketListItem(v-for="ticket of tickets", :item="ticket", :key="ticket.id_averia", @update="updateTicketState")
</template>

<script>
  import TicketListItem from './TicketListItem.vue';

  export default {
    components: {
      TicketListItem
    },
    props: {
      store: {
        type: Object,
        required: true
      },

    },
    data() {
      return {
        dataSearch: {
          text: '',
          state: 'por reparar',
        },
        tickets: [],
        hide: false,
        searching: false
      };
    },

    computed: {
      searchResults() {
        return (this.searching) ? 'Cargando listado de averias ...' : `Resultados: ${this.count} averias`;
      },

      count() {
        return (this.tickets) ? this.tickets.length : 0;
      },

      printLink() {
        return `${baseURL}report/get_report/tickets`;
      }
    },

    mounted() {
      this.search();
      window.appBus.$on('ticket-list.search', () => {
        this.search();
      });
    },

    methods: {
      search() {
        this.searching = true;
        this.$http.post('api/ticket/search', this.getDataForm(this.dataSearch))
          .then((res) => {
            this.tickets = res.data.tickets;
            this.searching = false;
          })
          .catch(() => {
            this.$toasted.error(res.data.message);
            this.searching = false;
          });
      },

      getTicket(id) {
        const form = {
          id_averia: id
        };

        this.$http.post('api/ticket/get_ticket', this.getDataForm(form))
          .then((res) => {
            const { data } = res;
            this.store.setDetailMode(true);
            this.store.setTicket(data.ticket);
            this.store.setComments(data.comments);
          });
      },

      updateTicketState(id) {
        this.$http.post('api/ticket/update_ticket_state', this.getDataForm({ id_averia: id }))
          .then((res) => {
            const { message } = res.data;
            this.showMessage(res.data.message);
            if (message.type === 'success') {
              this.search();
            }
          });
      }
    }
  };
</script>
