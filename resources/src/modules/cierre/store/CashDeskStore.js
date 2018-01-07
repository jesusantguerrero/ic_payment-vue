
export default class CashDeskStore {
  constructor() {
    const currency = [1, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000];
    this.currency = {};
    currency.forEach((val) => {
      this.currency[`total${val}`] = 0;
    });
  }

  setUnitValue(unit, value) {
    this.currency[`total${unit}`] = value;
  }
}
