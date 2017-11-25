import handler from "./handlers.js";

export default class users {
  constructor(){
    handler(this);
  }

  add() {
    const self = this
    const nick      = $("#user-nickname").val();
    const password  = $("#user-password").val();
    const name      = $("#user-name").val();
    const lastname  = $("#user-lastname").val();
    const dni       = getVal($("#user-dni"));
    const type      = $("#user-type").val();

    const is_empty = isEmpty([nick, password, name, lastname, dni, type]);
    if (!is_empty) {
      const form = 'nickname=' + nick + "&password=" + password + "&name=" + name + "&lastname=" + lastname + "&dni=" + dni + "&type=" + type;
      this.send('add', form)
      .then(()=>{
        self.getAll();
      })
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }

  update() {
    const nick     = $("#e-nickname").val();
    const name     = $("#e-name").val();
    const lastname = $("#e-lastname").val();
    const dni      = $("#e-dni").val();
    const type     = $("#e-type").val();
    const is_empty = isEmpty([nick, name, lastname, dni, type]);

    if (!is_empty) {
      const form = 'nickname=' + nick + "&name=" + name + "&lastname=" + lastname + "&dni=" + dni + "&type=" + type;
      this.send('update', form)
      .then((res) => {
        self.getAll();
      })
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }

  getAll() {
    const self = this;
    const form = "table=users";
    this.send('get_users', form)
    .then((res) => {
      userTable.refresh(res)
    })
  }

  delete (id) {
    const self = this;
    const form = "user_id=" + id;
    this.send('delete_user', form)
    .then((res) => {
      displayMessage(res);
      self.getAll();
    })
  }

  changeState(id){
    const self = this
    const form = "user_id=" + id
    this.send('change_state', form)
    .then(function(res){
      self.getAll()
    })
  }

  send(endpoint, data) {
   return axios.post(`${BASE_URL}user/${endpoint}`, data)
  }
}
