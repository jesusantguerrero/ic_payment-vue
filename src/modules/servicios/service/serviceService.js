import axios from 'axios';

const $http = axios.create({
  baseURL
});

export default class serviceService {
  constructor() {
    this.$http = $http;
  }

  getServiceList(type) {
    return this.$http.post(`service/get_services/${type}`);
  }
}
