export default class DetailsStore {
  constructor() {
    this.activeExtras = 0;
  }

  setActiveExtras(extras) {
    this.activeExtras = extras;
  }
}
