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
    this.pettyCashBalance = (balance > 0 && typeof balance === 'number') ? balance : 0.00;
  }
}
