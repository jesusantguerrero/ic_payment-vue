export default {
  getAll() {
    const status = $('#installations-view-mode').val();
    const form = `tabla=instalaciones&estado=${status}`;
    connectAndSend('process/getall', false, initGlobalHandlers, fillInstallationsList, form, null);
  },

  update($idPago) {
    const form = `tabla=instalaciones&id_pago=${$idPago}`;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, Installations.getAll);
  }
};
