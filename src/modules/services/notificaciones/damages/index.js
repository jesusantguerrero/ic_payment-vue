export default {
  add(idCliente) {
    const description = $('#a-description').val();

    const empty = isEmpty([idCliente, description]);
    if (!empty) {
      const form = `id_cliente=${idCliente}&descripcion=${description}&tabla=averias`;
      connectAndSend('process/add', true, initGlobalHandlers, null, form, Damages.getAll);
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
    $('#new-averia-modal').find('input,textarea').val('');
  },

  getAll() {
    const status = $('#averias-view-mode').val();
    $('.presentado').text(status);
    const form = `tabla=averias&estado=${status}`;
    connectAndSend('process/getall', false, initGlobalHandlers, fillAveriasList, form, null);
  },

  update($idAveria) {
    const form = `tabla=averias&id_averia=${$idAveria}`;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, Damages.getAll);
  }
};
