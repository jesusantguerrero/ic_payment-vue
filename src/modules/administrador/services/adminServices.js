export default class Service {
  constructor(options) {
    this.options = options;
    this.company = axios.create({
      baseURL: '/company/'
    });
  }

  // Company
  getCompany() {
    return this.company.get('get');
  }

  updateCompany(data) {
    return this.company.post('update', data);
  }

  changePicture(data) {
    return this.company.post('upload', data);
  }
  // caja

  // users

  // settings
}
