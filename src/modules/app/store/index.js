export default class appStore {
  constructor() {
    this.pettyCashTransaction = {
      entrada: 0,
      salida: 0,
      descripcion: ''
    };
    this.pettyCashMode = 'retire';
    this.pettyCashBalance = 0.00;
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
}
