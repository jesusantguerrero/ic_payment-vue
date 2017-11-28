import Damages from './damages';
import Installations from './installations';

export default class notifications {
  constructor() {
    cDamages = new Damages();
    cInstallations = new Installations();
  }
}
