  var ticketListView = new Vue({
    el: '#averias-list-view',
    data: {
      dataSearch: {
        text: '',
        state: 'por reparar',
      },
      tickets: [],
      hide: false
    },

    mounted: function () {
      this.itemClickListener();
      var self = this
      busAveria.$on('tickets-listed', function () {
        self.itemClickListener()
      });
    },

    methods: {
      search: function () {
        var form = 'data=' + JSON.stringify(this.dataSearch);
        var send = axios.post(BASE_URL + 'api/averias/search', form);

        send.then(function (res) {
          this.fillAveriasList(res.data);
        })

        send.catch(function () {
          console.error(res.data.mensaje);
        })

      },

      fillAveriasList: function ($content) {
        $('#averia-item-list').html($content);
        ticketListView.itemClickListener();
      },

      itemClickListener: function () {
        $('#averias-list-view .averia-item').on('click', function () {
          var id_averia = $(this).find('.code').text().trim();
          ticketView.getTicket(id_averia);
        })
      }
    }
  });

  var emptyTicket = {
    "id_averia": "",
    "id_cliente": "",
    "cliente": "",
    "direccion": "",
    "descripcion": "",
    "celular": "",
    "fecha": "",
    "estado": "",
    "fecha_reparacion": "",
    "codigo": '',
  }
  
  var ticketView = new Vue({
    el: '#ticket-view',
    
    data: {
      classes: {
        hide: true
      },
      mode: {
        newComment: false,
        edit: false,
      },
      new_comment: '',
      comments: [],
      ticket: emptyTicket
    },
    created: function () {
      $('#ticket-view').removeClass('invisible')
    },

    methods: {
      getTicket: function (id_averia) {
        var form = 'data=' + JSON.stringify({
          id_averia: id_averia
        })
        var send = axios.post(BASE_URL + 'api/averias/get_averia', form);
        
        send.then(function (res) {
          var data = res.data;
          ticketView.classes.hide = false;
          ticketListView.hide = true;
          ticketView.ticket = data.ticket;
          ticketView.comments = data.comments;
        })
      },

      quit: function () {
        this.ticket = emptyTicket;
        this.comments = null;
        this.classes.hide = true;
        this.closeCommentMode();
        ticketListView.hide = false;
      },

      print: function () {
        print();
      },

      startComment: function () {
        this.mode.newComment = true;
      },

      addComment: function () {
        var form = getForm({id_averia: this.ticket.id_averia, descripcion: this.new_comment});
        var send = axios.post(BASE_URL + 'api/averias/add_comment',form);
        var self = this;
        send.then( function (res) {
          self.getComments();
          self.closeCommentMode()
          displayMessage(res.data.mensaje);
        });
      },

      _deleteComment: function (e) {
        var commentItem = e.target.parentNode.parentNode
        var idComment = e.target.parentNode.attributes['data-id'].value
        var self = this;
        commentItem.classList.add('to-delete');

        swal({
          title: 'Está Seguro?',
          text: "Seguro de que eliminar este reporte?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar'
        })
        .then(function(){
          self.deleteComment(idComment);
          commentItem.classList.remove('to-delete')
        })
        .catch(function () {
          commentItem.classList.remove('to-delete')
        })
      },

      deleteComment: function (idComment){
        var self = this;
        var form = getForm({ id_reporte: idComment});
        var send = axios.post(BASE_URL + 'api/averias/delete_comment',form);

        send.then( function (res) {
          self.getComments();
          displayMessage(res.data.mensaje);
        });
      },

      editComment: function () {

      },
      
      closeCommentMode: function () {
        this.mode.newComment = false;
        this.new_comment = '';
      },

      getComments: function () {
        var form = getForm({id_averia: this.ticket.id_averia});
        var send = axios.post(BASE_URL + 'api/averias/get_comments',form);
        var self = this
        send.then( function (res) {
          self.comments = res.data.comments;
        });
      },

      updateDescription: function () {
        this.updateTicket(['id_averia','descripcion']);
      },

      updateTicket: function (fields) {
        this.closeEditMode();
        var form = getForm(this.getFields(fields));
        var send = axios.post(BASE_URL + 'api/averias/update_averia',form);

        send.then( function (res) {
          ticketListView.search();
          displayMessage(res.data.mensaje)
        })
      },

      deleteTicket: function () {
        console.info('deleted');
      },

      closeEditMode: function () {
        this.mode.edit = false;
      },

      enterEditMode: function () {
        this.mode.edit = true;
      },

      getFields: function (fields) {
        var selectedFields = {};
        var self = this;
        fields.forEach(function(field) {
          selectedFields[field] = self.ticket[field]
        }, this);

        return selectedFields;
      }

    }
  })

  function getForm(object){
    return "data=" + JSON.stringify(object);
  }
