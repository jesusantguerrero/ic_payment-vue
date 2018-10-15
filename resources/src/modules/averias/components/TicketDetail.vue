<template lang="pug">
  h3 Hello worlds
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
        classes: {
          hide: true
        },
        mode: {
          newComment: false,
          edit: false,
        },
        new_comment: '',
      };
    },

    methods: {
      quit() {
        this.store.emptyTicket();
        this.store.emptyComments();
        this.store.setDetailMode(false);
        this.closeCommentMode();
      },

      print() {
        print();
      },

      startComment() {
        this.mode.newComment = true;
      },

      addComment() {
        const form = {
          id_averia: this.ticket.id_averia,
          descripcion: this.new_comment
        };
        this.$http.post('api/ticket/add_comment', this.getDataForm(form))
          .then((res) => {
            this.getComments();
            this.closeCommentMode();
            this.showMessage(res.data.message);
          });
      },

      _deleteComment(e) {
        const commentItem = e.target.parentNode.parentNode;
        const idComment = e.target.parentNode.attributes['data-id'].value;
        commentItem.classList.add('to-delete');

        this.deleteConfirmation('Está Seguro?', 'Seguro de que eliminar este reporte?')
          .then((result) => {
            if (result.value) {
              this.deleteComment(idComment);
            }
            commentItem.classList.remove('to-delete');
          })
          .catch(() => {
            commentItem.classList.remove('to-delete');
          });
      },

      deleteComment(idComment) {
        const form = {
          id_reporte: idComment
        };
        this.$http.post('api/ticket/delete_comment', this.getDataForm(form))
          .then((res) => {
            this.getComments();
            this.showMessage(res.data.message);
          });
      },

      editComment() {
        // comming soon
      },

      closeCommentMode() {
        this.mode.newComment = false;
        this.new_comment = '';
      },

      getComments() {
        const form = {
          id_averia: this.ticket.id_averia
        };
        this.$http.post('api/ticket/get_comments', this.getDataForm(form))
          .then((res) => {
            this.store.setComments(res.data.comments);
          });
      },

      updateDescription() {
        this.updateTicket(['id_averia', 'descripcion', 'tecnico', 'estado', 'fecha_reparacion']);
      },

      updateState() {
        if (this.store.ticket.estado === 'por reparar') {
          this.store.ticket.fecha_reparacion = '';
        } else {
          this.store.ticket.fecha_reparacion = moment().format('YYYY-MM-DD');
        }
      },

      updateTicket(fields) {
        this.closeEditMode();
        const form = this.getDataForm(this.getFields(fields));
        this.$http.post('api/ticket/update_ticket', form)
          .then((res) => {
            window.appBus.$emit('ticket-list.search');
            this.showMessage(res.data.message);
          });
      },

      deleteTicket() {
        this.$toasted.info('deleted');
      },

      closeEditMode() {
        this.mode.edit = false;
      },

      enterEditMode() {
        this.mode.edit = true;
      },

      getFields(fields) {
        const selectedFields = {};
        fields.forEach((field) => {
          selectedFields[field] = this.store.ticket[field];
        });

        return selectedFields;
      }

    }
  };
</script>
