<template lang="pug">
  .modal.fade(tabindex="-1", role="dialog", id="search-client-modal")
    .modal-dialog.modal-lg(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title Nuevo Contrato
        div
        .modal-body
            #search-client-container
              .searcher-container.main-toolbar#search-client-toolbar(style="margin-bottom: 0")
                .input-group.search(style="width: 100%; margin-bottom: 5px")
                  .input-group-addon: i.material-icons search
                  input.form-control.searcher#client-searcher(type="text",v-model="search", @keyup="getClients", :placeholder="placeholder")

              DataTable(ids="search-client-table", :parentId="parentId", :data="clients", :cols="cols", :toolbar="toolbar", :options="tableOptions")
        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-send-message", @click.stop.prevent='sendMessage') enviar

</template>

<script>
  import DataTable from './../../sharedComponents/DataTable.vue';

  export default {
    components: {
      DataTable
    },

    data() {
      return {
        parentId: '#search-client-container',
        toolbar: '#search-client-toolbar',
        clients: '',
        tableOptions: {
          pageSize: 5
        },
        search: '',
        placeholder: 'Busque cliente por cedula, nombre, apellidos o id',

        cols: [
          {
            field: 'orden',
            title: 'No.',
            align: 'center',
            valign:	'middle'
          },
          {
            field: 'checkbox',
            checkbox: true,
            class: 'hide'
          },
          {
            field: 'id',
            title: 'id',
            class: 'hide'
          },
          {
            field: 'nombres',
            title: 'Nombres',
            align: 'center',
            valign:	'middle'
          },
          {
            field: 'apellidos',
            title: 'Apellidos',
            align: 'center',
            valign:	'middle'
          },
          {
            field: 'cedula',
            title: 'Cedula',
            align: 'center',
            valign:	'middle'
          },
          {
            field: 'celular',
            title: 'Celular',
            align: 'center',
            valign:	'middle'
          },
          {
            field: 'estado',
            title: 'Estado',
            align: 'center',
            valign:	'middle'
          },
          {
            field: 'estadoreal',
            title: 'Estado Real',
            class: 'hide',
            align: 'center',
            valign:	'middle'
          },
          {
            field: 'nombre_completo',
            title: 'Nombre Completo',
            class: 'hide'
          },
        ]
      };
    },

    methods: {
      getClients() {
        console.log('here i am');
      }
    }
  };
</script>
