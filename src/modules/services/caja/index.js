import handler from './handlers';
import cajaTable from './cajaTable';

export default class {
  constructor() {
    this.cajaTable = cajaTable;
    if (currentPage === 'administrador') {
      this.cajaTable.init();
      this.getAll();
    }
    handler(this);
  }

  add() {
    const self = this;
    const amount = $('#caja-a-amount').val();
    const description = $('#caja-a-description').val();
    const form = `entrada=${amount}&descripcion=${description}&tabla=caja`;
    const empty = isEmpty([amount, description]);

    if (!empty) {
      this.send('add', form)
        .then((res) => {
          displayMessage(res.data);
          self.getAll();
        });
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  retire() {
    const self = this;
    const amount = $('#caja-r-amount').val();
    const description = $('#caja-r-description').val();
    const form = `salida=${amount}&descripcion=${description}`;
    const empty = isEmpty([amount, description]);

    if (!empty) {
      this.send('retire', form)
        .then((res) => {
          displayMessage(res.data);
          console.log(self);
          self.gatAll();
        });
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  getAll() {
    const self = this;
    const form = 'tabla=caja';
    this.send('getAll', form)
      .then((res) => {
        self.cajaTable.refresh(res.data);
        self.getSaldo();
      });
  }

  getSaldo() {
    const form = 'tabla=caja';
    this.send('getone', form)
      .then((res) => {
        updateSaldo(res.data);
      });
  }

  search() {
    const self = this;
    const $dateSearch = $('#caja-date');
    const $userSearch = $('#caja-user');
    const date = ($dateSearch.val()) ? $dateSearch.val() : '%';
    const userId = ($userSearch.val()) ? $userSearch.val() : '%';

    const form = `tabla=caja&id_empleado=${userId}&fecha=${date}`;
    this.send('search', form)
      .then((res) => {
        self.cajaTable.refresh(res.data);
      });
  }

  send(endpoint, data) {
    return axios.post(`${BASE_URL}process/${endpoint}`, data);
  }
}
