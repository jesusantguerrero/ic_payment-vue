export default damages = {
    add: function (idCliente) {
      var form, description;
      description = $("#a-description").val();

      var is_empty = isEmpty([idCliente, description]);
      if (!is_empty) {
        form = 'id_cliente=' + idCliente + "&descripcion=" + description + "&tabla=averias";
        connectAndSend("process/add", true, initGlobalHandlers, null, form, Damages.getAll);
      } else {
         displayAlert("Revise", "LLene todos los campos por favor", "error");
      }
      $('#new-averia-modal').find('input,textarea').val("");
    },

    getAll: function () {
      var status = $("#averias-view-mode").val();
      $(".presentado").text(status);
      var form = "tabla=averias&estado=" + status;
      connectAndSend('process/getall', false, initGlobalHandlers, fillAveriasList, form, null);
    },

    update: function ($id_averia) {
      var form = "tabla=averias&id_averia=" + $id_averia;
      connectAndSend('process/update', true, initGlobalHandlers, null, form, Damages.getAll);
    }
  }
