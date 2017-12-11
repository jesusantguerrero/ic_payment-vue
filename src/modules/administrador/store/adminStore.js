export default class Store {
  constructor(options) {
    this.options = options;
    this.company = {
      logo: '',
      nombre: '',
      descripcion: '',
      direccion: '',
      lema: '',
      telefono1: '',
      telefonos: ''

    };
    this.usuarios = [];

    this.usuario = {
      user_id: '',
      nickname: '',
      password: '',
      name: '',
      lastname: '',
      dni: '',
      type: '',
      email: '',
    };

    this.cajaChica = [];
    this.ajustes = {};
    this.ajustesMensajes = {};
    this.ajustesAvanzados = {};
  }

  setCompany(company) {
    this.company = company;
  }

  setUsers(users) {
    this.usuarios = users;
  }

  setUser(user) {
    this.usuario = user;
  }

  cleanUser() {
    this.usuario = {
      user_id: '',
      nickname: '',
      password: '',
      name: '',
      lastname: '',
      dni: '',
      type: '',
      email: ''
    };
  }

  setSettings(settings) {
    this.ajustes = settings;
  }

  setMessageSettings(messageSettings) {
    this.ajustesMensajes = messageSettings;
  }

  setAdvancedSettings(advancedSettings) {
    this.ajustesAvanzados = advancedSettings;
  }
}
