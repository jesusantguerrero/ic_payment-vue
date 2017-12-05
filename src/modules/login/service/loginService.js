import axios from 'axios';

export default class Service {
  constructor() {
    this.user = axios.create({
      baseURL
    });
  }

  doLogin(credentials) {
    return this.user.post('auth/do_login', this.getForm(credentials));
  }

  resetPassword(credentials) {
    return this.user.post('auth/reset', this.getForm(credentials));
  }

  validateReset(credentials) {
    return this.user.post('auth/validate_reset', this.getForm(credentials));
  }

  getForm(data) {
    return `data=${JSON.stringify(data)}`;
  }
}
