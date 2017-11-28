import handler from './handlers';

export default class settings {
  constructor() {
    handler(this);
  }

  update() {
    const settingsCargoMora = $('#settings-mora').val();
    const settingsFechaCorte = $('#settings-fecha-corte').val();
    const settingsReconexion = $('#settings-reconexion').val();
    const settingsPenalizacionCancelacion = $('#settings-penalizacion-cancelacion').val();
    const settingsMesesPorDefecto = $('#settings-meses-por-defecto').val();
    const settingsSplitDay = $('#settings-split-day').val();

    const form = `cargo_mora=${settingsCargoMora}&fecha_corte=${settingsFechaCorte}&reconexion=${settingsReconexion}
    &penalizacion_cancelacion=${settingsPenalizacionCancelacion}&meses_por_defecto=${settingsMesesPorDefecto}
    &split_day=${settingsSplitDay}&tabla=settings`;

    axios.post(`${BASE_URL}process/update`, form)
      .then((res) => {
        displayMessage(res.data);
      });
  }
}
