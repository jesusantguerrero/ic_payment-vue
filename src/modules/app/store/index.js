export default class appStore {
  constructor() {
    this.moneyMovement = {
      amount: 0,
      description: ''
    };

    this.pettyCashBalance = 0.00;
  }

  moneyMovementEmpty() {
    this.moneyMovement = {
      amount: 0.00,
      description: ''
    };
  }

  setPettyCashBalance(balance) {
    const nBalance = Number(balance);
    this.pettyCashBalance = (nBalance > 0 && typeof nBalance === 'number') ? nBalance : 0.00;
  }
}
