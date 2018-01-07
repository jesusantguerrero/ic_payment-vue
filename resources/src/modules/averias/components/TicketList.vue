<template lang="pug">
  #averias-list-view
    .searcher-container.main-toolbar
      .input-group.search
        .input-group-addon: i.material-icons search
        input.form-control.searcher(type="text", v-model="dataSearch.text", @keyup="search", placeholder="Busque averia por cliente")
      .pull-right
        a(target="_blank" href="#" class="btn icon"): i.material-icons build <span class="total-rows"></span>
      .pull-right
        a(target="_blank" href="<?php echo base_url('process/getreport/averias')?>" class="btn icon print-table"): i.material-icons print
      .pull-right
        select#averias-view-mode.form-group.filter.btn.btn-primary(v-model="dataSearch.state")
          option(value="por reparar") Por Reparar
          option(value="reparado") Reparados
          option(value="todos") Todos


    .averia-item-list#averia-list

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
        dataSearch: {
          text: '',
          state: 'por reparar',
        },
        tickets: [],
        hide: false
      };
    },

    mounted() {
      this.itemClickListener();
      busAveria.$on('tickets-listed', () => {
        this.itemClickListener();
      });
    },

    methods: {
      search() {
        this.$http.post('api/averias/search', this.getDataForm(this.dataSearch))
          .then((res) => {
            this.tickets = res.data.tickets;
          })
          .catch(() => {
            this.$toasted.error(res.data.message);
          });
      },

      getTicket(id) {
        const form = {
          id_averia: id
        };

        this.$http.post('api/averias/get_averia', this.getDataForm(form))
          .then((res) => {
            const { data } = res;
            this.store.setDetailMode(true);
            this.store.setTicket(data.ticket);
            this.store.setComments(data.comments);
          });
      }
    }
  };
</script>
