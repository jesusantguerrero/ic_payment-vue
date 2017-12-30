import axios from 'axios';
import utils from './../../sharedComponents/utils';

const $http = axios.create({
  baseURL
});

export default class RouterService {
  constructor() {
    this.$http = $http;
  }

  getSectionList() {
    return this.$http.get('section/get_sections/list');
  }

  getSectionIps(sectionId) {
    return this.$http.post('section/get_ips/list', utils.getDataForm({ sectionId }));
  }
}
