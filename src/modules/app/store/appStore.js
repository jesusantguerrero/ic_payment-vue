export default class AppStore {
  constructor() {
    this.pettyCashTransaction = {
      entrada: 0,
      salida: 0,
      descripcion: ''
    };
    this.pettyCashMode = 'retire';
    this.pettyCashBalance = 0.00;
    this.dayIncome = 0.00;

    this.currentUser = {
      user_id: '',
      nickname: '',
      password: '',
      name: '',
      lastname: '',
      dni: '',
      type: '',
      email: '',
    };

    this.company = {
      logo: '',
      nombre: '',
      descripcion: '',
      direccion: '',
      lema: '',
      telefono1: '',
      telefonos: ''
    };
  }

  pettyCashTransactionEmpty() {
    this.pettyCashTransaction = {
      entrada: 0.00,
      salida: 0.00,
      descripcion: ''
    };
  }

  setPettyCashMode(mode) {
    this.pettyCashMode = mode;
  }

  setPettyCashTransaction(pettyCashTransaction) {
    this.pettyCashTransaction = pettyCashTransaction;
  }

  setPettyCashBalance(balance) {
    const nBalance = Number(balance);
    this.pettyCashBalance = (nBalance > 0 && typeof nBalance === 'number') ? nBalance : 0.00;
  }

  setCompany(company) {
    this.company = company;
  }

  setUser(user) {
    this.currentUser = user;
  }

  setDayIncome(income) {
    this.dayIncome = income;
  }
}
