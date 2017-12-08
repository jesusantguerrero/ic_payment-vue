<template lang="pug">
  .company-details#user-section
    h3.section-title Usuarios
    #user-table-container
      DataTable(ids="user-table",:parentId="parentId", :data="content", :cols="cols")
</template>

<script>
  import DataTable from './../../sharedComponents/DataTable';

  const operateEvents = {
        'click .like': function (e, value, row, index) {
            alert('You click like action, row: ' + JSON.stringify(row));
        },

        'click .remove': function (e, value, row, index) {
            $table.bootstrapTable('remove', {
                field: 'id',
                values: [row.id]
            });
        }
  };

  export default {
    components: {
      DataTable
    },
    data() {
      return {
        cols: [
           {title: 'No.', field: 'order', 'align': 'center', valign: 'middle', sortable: true},
           {title: 'COD', field: 'id', 'align': 'center', valign: 'middle', sortable: true},
           {title: 'Nombres', field: 'nombres', 'align': 'center', valign: 'middle', sortable: true},
           {title: 'Apellidos', field: 'apellidos', 'align': 'center', valign: 'middle', sortable: true},
           {title: 'Cedula', field: 'cedula', 'align': 'center', valign: 'middle', sortable: true},
           {title: 'Tipo', field: 'tipo', 'align': 'center', valign: 'middle', sortable: false},
           {title: 'Estado', field: 'estado', 'align': 'center', valign: 'middle', sortable: false},
           {title: 'Acciones', field: 'acciones', 'align': 'center', valign: 'middle', sortable: false},
        ],
        content: '',
        parentId: '#user-table-container',
        idField: 'id'
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
      this.send('delete_user', form)
        .then((res) => {
          displayMessage(res.data);
          self.getAll();
        });
    },

    changeState(id) {
      const self = this;
      const form = `user_id=${id}`;
      this.send('change_state', form)
      .then(() => {
        self.getAll();
      });
    },

    operateFormatter(value, row, index) {
        return [
            '<a class="like" href="javascript:void(0)" title="Like">',
            '<i class="glyphicon glyphicon-heart"></i>',
            '</a>  ',
            '<a class="remove" href="javascript:void(0)" title="Remove">',
            '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    }
  }
  }
</script>

