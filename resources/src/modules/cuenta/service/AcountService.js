import axios from 'axios';
import utils from './../../sharedComponents/utils';

const $http = axios.create({
  baseURL
});

class AcountService {
  constructor() {
    this.$http = $http;
  }

  async getUser() {
    const { data } = await this.$http.post('user/get_user');
    return data.user;
  }

  getService(id) {
    return this.$http.post('service/get_service', utils.getDataForm({ id }))
      .then(res => res.data.service);
  }
}

export default new AcountService();
