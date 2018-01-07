<template lang="pug">
  #ticket-view(class="invisible", :class="{hide: classes.hide}")
    .ticket-screen
      .searcher-container.main-toolbar
        h4.col-md-9 {{ticket.cliente}}
        .pull-right
          button.btn.btn-transparent.lg(type="submit", @click.prevent.stop="quit"): i.material-icons arrow_back
        .pull-right
          button.btn.btn-transparent.lg(type="submit", @click.prevent.stop="print"): i.material-icons print
        .pull-right
          button.btn.btn-transparent.lg(type="submit" @click.prevent.stop="enterEditMode"): i.material-icons edit
      .screen-body
        .row
          .col-md-9.col-xs-8
            .text-contrast {{ ticket.direccion }}
            .text-contrast {{ ticket.codigo }}
            .description(v-if="!mode.edit") {{ ticket.descripcion }}
            .ticket-editor(v-if="mode.edit")
              textarea(cols="30" rows="5" class="form-control" v-model="ticket.descripcion")
              button.btn.btn-remark(@click="closeEditMode") Cancelar
              button.btn(@click="updateDescription") Guardar
          .col-md-3.col-xs-4.more
            p(v-if="!mode.edit")
              i.material-icons person_pin
              | Tecnico: {{ ticket.tecnico}}
            .input-group(v-if="mode.edit")
              span.input-group-addon: i.material-icons person_pin
              input(type="text", class="form-control", placeholder="Tecnico Asignado", v-model="ticket.tecnico")
            p(v-if="!mode.edit")
              i.material-icons check
              | {{ticket.estado}}
            .input-group(v-if="mode.edit")
              span.input-group-addon: i.material-icons check
              select.form-control(v-model="ticket.estado" @change="updateState")
                option(value="por reparar") Por Reparar
                option(value="reparado") Reparado

            p
              i.material-icons event
              | Reporte: {{ticket.fecha}}
            p
              i.material-icons event
              | Reparacion: {{ ticket.fecha_reparacion }}

      .screen-comment-list
        h4 Reportes
        .new-comment
          textarea(cols="30", rows="5", class="form-control" v-model="new_comment" placeholder="Haga click aqui para escribir un nuevo Reporte" @focus="startComment")
          button.btn(btn-remark", @click="closeCommentMode" v-if="mode.newComment") Cancelar
          button.btn(@click="addComment" v-if="mode.newComment") Agregar

        .comment-item(v-for="comment in comments")
          .top-row(:data-id="comment.id_reporte")
            .info: span.client-name {{comment.empleado}}
            i.material-icons.comment-control(@click="_deleteComment") delete
          .description
            .text {{ comment.descripcion }}
          .status-bar
            span: i.material-icons event
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
        this.$http.post('api/averias/add_comment', this.getDataForm(form))
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
          .then(() => {
            this.deleteComment(idComment);
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
        this.$http.post('api/averias/delete_comment', this.getDataForm(form))
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
        this.$http.post('api/averias/get_comments', this.getDataForm(form))
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
        this.$http.post('api/averias/update_averia', form)
          .then((res) => {
            window.appBus.$emit('ticket.search-tickets');
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
