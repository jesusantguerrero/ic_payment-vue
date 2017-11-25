
export default class Service {
  constructor(options) {
    this.user = axios.create({
      baseURL: options.enpoint
    });
  }

  doLogin(credentials) {
    return this.user.post('login',this.getForm(credentials));
  }

  resetPassword(credentials) {
    return this.user.post('reset',this.getForm(credentials));
  }

  validateReset(credentials) {
    return this.user.post('validate_reset', this.getForm(credentials));
  }

  getForm(data) {
    const form = `data=${JSON.stringify(data)}`
  }
}
