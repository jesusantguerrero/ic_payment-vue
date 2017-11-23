export default class Store {

  constructor(options) {
    this.options = options
    this.credentials = {
      user: '',
      password: '',
      email: '',
      validation_token: '',
    }
  }
}
