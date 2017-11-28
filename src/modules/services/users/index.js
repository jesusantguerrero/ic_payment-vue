import handler from './handlers';
import UserTable from './userTable';

export default class users {
  constructor() {
    handler(this);
    this.userTable = new UserTable(this);
    this.userTable.init();
  }

  add() {
    const self = this;
    const nick = $('#user-nickname').val();
    const password = $('#user-password').val();
    const name = $('#user-name').val();
    const lastname = $('#user-lastname').val();
    const dni = getVal($('#user-dni'));
    const type = $('#user-type').val();

    const empty = isEmpty([nick, password, name, lastname, dni, type]);
    if (!empty) {
      const form = `nickname=${nick}&password=${password}&name=${name}&lastname=${lastname}&dni=${dni}&type=${type}`;
      this.send('add', form)
        .then((res) => {
          displayMessage(res.data);
          self.getAll();
        });
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  update() {
    const nick = $('#e-nickname').val();
    const name = $('#e-name').val();
    const lastname = $('#e-lastname').val();
    const dni = $('#e-dni').val();
    const type = $('#e-type').val();
    const empty = isEmpty([nick, name, lastname, dni, type]);
    const self = this;

    if (!empty) {
      const form = `nickname=${nick}&name=${name}&lastname=${lastname}&dni=${dni}&type=${type}`;
      this.send('update', form)
        .then(() => {
          self.getAll();
        });
    } else {
      displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    }
  }

  getAll() {
    const form = 'table=users';
    const self = this;
    this.send('get_users', form)
      .then((res) => {
        self.userTable.refresh(res.data);
      });
  }

  delete(id) {
    const self = this;
    const form = `user_id=${id}`;
    this.send('delete_user', form)
      .then((res) => {
        displayMessage(res.data);
        self.getAll();
      });
  }

  changeState(id) {
    const self = this;
    const form = `user_id=${id}`;
    this.send('change_state', form)
      .then(() => {
        self.getAll();
      });
  }

  send(endpoint, data) {
    return axios.post(`${BASE_URL}user/${endpoint}`, data);
  }
}
