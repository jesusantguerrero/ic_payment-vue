export default {
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
