export default class appStore {
  constructor() {
    this.moneyMovement = {
      amount: 0,
      description: ''
    };
  }

  moneyMovementEmpty() {
    this.moneyMovement = {
      amount: 0.00,
      description: ''
    };
  }
}
