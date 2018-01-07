<template lang="pug">
  .company-details#user-section
    h3.section-title Usuarios
    #user-table-container
      .searcher-container.main-toolbar#user-toolbar
        .input-group.search
          .input-group-addon: i.material-icons search
          input(type="text", placeholder=" descripcion").form-control.searcher
        .pull-right
          button.btn.btn-primary.icon: i.material-icons
        .pull-right
          button.btn.btn-primary.icon#caller-user(data-toggle="modal" data-target="#new-user-modal", @click="callModal('new')") Agregar <i class="material-icons">add</i>
      DataTable(ids="user-table",:parentId="parentId", :data="content", :cols="cols", :toolbar="toolbar", :options="tableOptions")
      UserModal(:user="store.usuario", :validation="validation", :userTypes="userTypes", :modalMode="modalMode", @add="add", @update="update", @dimiss="dimiss")
</template>

<script>
  import swal from 'sweetalert2';
  import DataTable from './../../sharedComponents/DataTable.vue';
  import AdminUserSectionModal from './AdminUserSectionModal.vue';
  import utils from './../../sharedComponents/utils';

  export default {
    components: {
      DataTable,
      AdminUserSectionModal
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
          { val: 0, text: 'Administrador' },
          { val: 1, text: 'Secretario(a)' },
          { val: 2, text: 'Tecnico' }
        ],
        modalMode: 'new',
        tableOptions: {
          pageSize: 5
        }
      };
    },

    mounted() {
      this.getUsers();
    },

    methods: {
      add() {
        const self = this;
        const user = this.store.usuario;
        const newUser = {
          nickname: user.nickname,
          password: user.password,
          name: user.name,
          lastname: user.lastname,
          dni: user.dni,
          type: user.type,
          email: user.email,
        };
        const empty = utils.isEmpty(newUser);

        if (!empty) {
          if (newUser.password === this.validation.password_confirm) {
            this.$http.post('user/add', this.getDataForm(newUser))
              .then((res) => {
                self.showMessage(res.data.message);
                self.getUsers();
                self.dimiss();
              });
          } else {
            this.$toasted.error('Las contraseñas no coinciden');
          }
        } else {
          this.$toasted.error('LLene todos los campos por favor');
        }
      },

      dimiss() {
        this.store.emptyUser();
        this.validation.password_confirm = '';
      },

      update() {
        const self = this;
        const user = this.store.usuario;
        const userId = user.user_id;
        const userUpdated = {
          nickname: user.nickname,
          name: user.name,
          lastname: user.lastname,
          dni: user.dni,
          type: user.type,
          email: user.email
        };
        const empty = utils.isEmpty(userUpdated);

        if (!empty) {
          this.$http.post(`user/update/${userId}`, this.getDataForm(userUpdated))
            .then((res) => {
              self.showMessage(res.data.message);
              self.getUsers();
              self.dimiss();
            });
        } else {
          this.$toasted.error('LLene todos los campos por favor');
        }
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

        function sendDelete() {
          self.$http.post('user/delete_user', form)
            .then((res) => {
              self.getUsers();
              self.showMessage(res.data.message);
            });
        }

        swal({
          title: 'Eliminar Usuario',
          text: '¿Estas seguro de querer eliminar este usuario?',
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

      getUser(id) {
        this.$http.get(`user/get_user/${id}`)
          .then((res) => {
            this.store.setUser(res.data.user);
            this.callModal('edit');
          })
          .catch(() => {
            this.$toasted.error('Error al obtener usuario');
          });
      },

      callModal(mode) {
        this.modalMode = mode;
        $('#user-modal').modal();
      }
    },

    computed: {
      cols() {
        const userEvents = {
          'click .btn-change-state': (e, value, row) => {
            this.changeState(row.id);
          },

          'click .delete-user': (e, value, row) => {
            this.delete(row.id);
          },

          'click .edit-user': (e, value, row) => {
            this.getUser(row.id);
          }
        };

        return [
          {
            title: 'No.',
            field: 'order',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'COD',
            field: 'id',
            align: 'center',
            valign:	'middle',
            sortable:	true,
            class:	'hide'
          },
          {
            title: 'Usuario',
            field: 'nickname',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'Nombres',
            field: 'nombres',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'Apellidos',
            field: 'apellidos',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'Cedula',
            field: 'cedula',
            align: 'center',
            valign: 'middle',
            sortable: true
          },
          {
            title: 'Rol',
            field: 'tipo',
            align: 'center',
            valign: 'middle',
            sortable: false
          },
          {
            title: 'Estado',
            field: 'estado',
            align: 'center',
            valign: 'middle',
            sortable: false,
            events: userEvents
          },
          {
            title: 'Code Type',
            field: 'role_level',
            align: 'center',
            valign: 'middle',
            sortable: false,
            class: 'hide'
          },
          {
            title: 'Acciones',
            field: 'acciones',
            align: 'center',
            valign: 'middle',
            sortable: false,
            events: userEvents
          }
        ];
      }
    }
  };
</script>
