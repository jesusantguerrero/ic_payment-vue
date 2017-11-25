import handler from './handlers';

export default class caja {
  constructor() {
    handler(this);
  }

  add() {
    const self = this;
    const amount = $("#caja-a-amount").val();
    const description = $("#caja-a-description").val();
    const form = "entrada=" + amount + "&descripcion=" + description + "&tabla=caja";
    const is_empty = isEmpty([amount, description]);

    if (!is_empty) {
      this.send('add', form)
      then((res) => {
        displayMessage(res);
        self.getAll();
      })
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }

  retire() {
    const self = this;
    const amount = $("#caja-r-amount").val();
    const description = $("#caja-r-description").val();
    const form = "salida=" + amount + "&descripcion=" + description;
    const is_empty = isEmpty([amount, description]);

    if (!is_empty) {
       this.send('retire', form)
       then((res) => {
         displayMessage(res)
         self.gatAll();
       })
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }

  getAll() {
    const self = this;
    const form = "tabla=caja";
    this.send('getAll', form)
    then((res) => {
      cajaTable.refresh(res)
      self.getSaldo()
    })
  }

  getSaldo() {
    const form = "tabla=caja";
    this.send('getone', form)
    then((res) => {
      updateSaldo(res);
    })
  }

  search() {
    const $dateSearch = $("#caja-date");
    const $userSearch = $("#caja-user");
    const date = ($dateSearch.val()) ? $dateSearch.val() : '%';
    const userId = ($userSearch.val()) ? $userSearch.val() : '%';

    const form = "tabla=caja&id_empleado=" + userId + "&fecha=" + date;
    this.send('search', form)
    then((res)=>{
      cajaTable.refresh(res)
    })
  }

  send(endpoint, data) {
    return axios.post(`${BASE_URL}process/${endpoint}`, data)
   }

}
