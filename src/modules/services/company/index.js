import handler from './handlers';

export default class company {
  constructor() {
    handler(this);
  }

  update() {
    const companyName = $('#company-name').val();
    const companyStatement = $('#company-statement').val();
    const companyPhone1 = getVal($('#company-phone1'));
    const companyDirection = $('#company-direction').val();
    const companyDescription = $('#company-description').val();
    const companyPhone2 = getVal($('#company-phone2'));

    const form = `nombre=${companyName}&lema=${companyStatement}&descripcion=${companyDescription}&direccion=
    ${companyDirection}&telefono1=${companyPhone1}&telefonos=${companyPhone2}&tabla=empresa`;

    axios.post(`${BASE_URL}process/update`, form);
    then((res) => {
      displayMessage(res);
    });
  }
}
