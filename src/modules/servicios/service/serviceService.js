import axios from 'axios';
import utils from './../../sharedComponents/utils';

const $http = axios.create({
  baseURL
});

export default class serviceService {
  constructor() {
    this.$http = $http;
  }

  getServiceList(type = '') {
    return this.$http.post(`service/get_services/${type}`);
  }

  getService(id) {
    return this.$http.post('service/get_service', utils.getDataForm({ id }))
      .then(res => res.data.service);
  }
}
