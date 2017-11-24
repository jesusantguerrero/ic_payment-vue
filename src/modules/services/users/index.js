import handler from "./handlers.js";

export default class users {
  constructor(){
    handler(this);
  }

  add() {
    const self = this
    const form, nick, password, name, lastname, dni, type, is_empty;

    nick      = $("#user-nickname").val();
    password  = $("#user-password").val();
    name      = $("#user-name").val();
    lastname  = $("#user-lastname").val();
    dni       = getVal($("#user-dni"));
    type      = $("#user-type").val();

    const is_empty = isEmpty([nick, password, name, lastname, dni, type]);
    if (!is_empty) {
      form = 'nickname=' + nick + "&password=" + password + "&name=" + name + "&lastname=" + lastname;
      form += "&dni=" + dni + "&type=" + type;
      this.send('add', form)
      .then(()=>{
        self.getAll();
      })
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }

  update() {
    const form, nick, password, name, lastname, dni, type;

    nick     = $("#e-nickname").val();
    name     = $("#e-name").val();
    lastname = $("#e-lastname").val();
    dni      = $("#e-dni").val();
    type     = $("#e-type").val();

    const is_empty = isEmpty([nick, name, lastname, dni, type]);
    if (!is_empty) {
      form = 'nickname=' + nick + "&name=" + name + "&lastname=" + lastname;
      form += "&dni=" + dni + "&type=" + type;
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
