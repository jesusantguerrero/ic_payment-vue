<template lang="pug">
  .company-details#user-section
    h3.section-title Usuarios
    #user-table-container
      .searcher-container.main-toolbar#user-toolbar
        .input-group.search
          .input-group-addon: i.material-icons search
          input(type="text" placeholder=" descripcion").form-control.searcher
        .pull-right
          button.btn.btn-primary.icon(@click="callModal('new')"): i.material-icons
        .pull-right
          button.btn.btn-primary.icon#caller-user(data-toggle="modal" data-target="#new-user-modal") Agregar <i class="material-icons">add</i>
      DataTable(ids="user-table",:parentId="parentId", :data="content", :cols="cols", :toolbar="toolbar")
      UserModal(:user="store.usuario", :validation="validation", :userTypes="userTypes", :modalMode="modalMode")
</template>

<script>
  import swal from 'sweetalert2';
  import $ from 'jquery';
  import DataTable from './../../sharedComponents/DataTable';
  import UserModal from './UserModal';

  export default {
    components: {
      DataTable,
      UserModal
    },
    props: {
      store: {
        type: Object
      }
    },

    data() {
      return {
        content: '',
        parentId: '#user-table-container',
        toolbar: '#user-toolbar',
        idField: 'id',
        validation: {
          password_confirm: '',
        },
        userTypes: [
          {val: 0, text: 'Administrador'},
          {val: 1, text: 'Secretario(a)'},
          {val: 2, text: 'Tecnico'}
        ],
        modalMode: 'new'
      }
    },

    mounted() {
      this.getUsers();
    },

    methods: {
      add() {
      //   const self = this;
      //   const nick = $('#user-nickname').val();
      //   const password = $('#user-password').val();
      //   const name = $('#user-name').val();
      //   const lastname = $('#user-lastname').val();
      //   const dni = getVal($('#user-dni'));
      //   const type = $('#user-type').val();
      //   const empty = isEmpty([nick, password, name, lastname, dni, type]);

      // if (!empty) {
      //   const form = `nickname=${nick}&password=${password}&name=${name}&lastname=${lastname}&dni=${dni}&type=${type}`;
      //   this.send('add', form)
      //   .then((res) => {
      //     displayMessage(res.data);
      //     self.getAll();
      //   });
      // } else {
      //   displayAlert('Revise', 'LLene todos los campos por favor', 'error');
      // }
      },

      update() {
        // const nick = $('#e-nickname').val();
        // const name = $('#e-name').val();
        // const lastname = $('#e-lastname').val();
        // const dni = $('#e-dni').val();
        // const type = $('#e-type').val();
        // const empty = isEmpty([nick, name, lastname, dni, type]);
        // const self = this;

        // if (!empty) {
        //   const form = `nickname=${nick}&name=${name}&lastname=${lastname}&dni=${dni}&type=${type}`;
        //   this.send('update', form)
        //   .then(() => {
        //     self.getAll();
        //   });
        // } else {
        //   displayAlert('Revise', 'LLene todos los campos por favor', 'error');
        // }
      },

      getUsers() {
        const self = this;
        this.$http.get('user/get_users')
        .then((res) => {
            self.content = res.data;
        });
      },

      delete(id) {
        const self = this;
        const form = `user_id=${id}`;
        swal({
          title: 'Eliminar Usuario',
          text: "¿Estas seguro de querer eliminar este usuario?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            sendDelete();
          }
        });

        function sendDelete() {
          self.$http.post('user/delete_user', form)
          .then((res) => {
            self.getUsers();
            self.showMessage(res.data.message);
          });
        }
      },

      changeState(id) {
        const self = this;
        const form = `user_id=${id}`;
        this.$http.post('user/change_state', form)
        .then((res) => {
          self.getUsers();
          self.showMessage(res.data.message);
        });
      },

      callModal(mode) {
        this.modalMode = mode
        $('#user-modal').modal()
      }
    },

    computed: {
      cols() {
        const self = this;
        const userEvents = {
          'click .btn-change-state': (e, value, row, index) => {
          this.changeState(row.id);
          },

          'click .delete-user': (e, value, row, index) => {
          this.delete(row.id);
          }
        }

        return [
           {title: 'No.', field: 'order', align: 'center', valign: 'middle', sortable: true},
           {title: 'COD', field: 'id', align: 'center', valign: 'middle', sortable: true, class:"hide"},
           {title: 'Usuario', field: 'nickname', align: 'center', valign: 'middle', sortable: true},
           {title: 'Nombres', field: 'nombres', align: 'center', valign: 'middle', sortable: true},
           {title: 'Apellidos', field: 'apellidos', align: 'center', valign: 'middle', sortable: true},
           {title: 'Cedula', field: 'cedula', align: 'center', valign: 'middle', sortable: true},
           {title: 'Rol', field: 'tipo', align: 'center', valign: 'middle', sortable: false},
           {title: 'Estado', field: 'estado', align: 'center', valign: 'middle', sortable: false, events: userEvents },
           {title: 'Code Type', field: 'role_level', align: 'center', valign: 'middle', sortable: false, class:"hide"},
           {title: 'Acciones', field: 'acciones', align: 'center', valign: 'middle', sortable: false, events: userEvents}
        ];
      }
    }
  };
</script>
