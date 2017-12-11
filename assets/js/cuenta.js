webpackJsonp([3],{

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_toasted__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_toasted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_toasted__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_AcountSection_vue__ = __webpack_require__(80);





const options = {
  theme: 'primary',
  position: 'top-right',
  duration: 5000
};

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_vue_toasted___default.a, options);

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].mixin({
  methods: {
    showMessage(message) {
      this.$toasted[message.type](message.text);
    },

    getDataForm(object) {
      return `data=${JSON.stringify(object)}`;
    }
  }
});

const $http = __WEBPACK_IMPORTED_MODULE_1_axios___default.a.create({
  baseURL
});

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].prototype.$http = $http;


/* harmony default export */ __webpack_exports__["default"] = (new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#acount-section',
  components: {
    'acount-section': __WEBPACK_IMPORTED_MODULE_3__components_AcountSection_vue__["a" /* default */]
  }
}));


/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_AcountSection_vue__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21fd3b4e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_AcountSection_vue__ = __webpack_require__(82);
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_AcountSection_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21fd3b4e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_AcountSection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert2__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sweetalert2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'AcountSection',
  data() {
    return {
      user: {
        user_id: '',
        nickname: '',
        name: '',
        lastname: '',
        dni: '',
        type: '',
        email: ''
      },
      isChangePassword: false,
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
      states: {
        'has-error': false,
        'has-success': false,
        button: true,
       }
     }
  },

  mounted() {
    this.getUser();
  },

  methods: {
    getUser() {
      const self = this;
      this.$http.get('user/get_user')
        .then((res) => {
          const user = res.data.user;
          user['fullname'] = user.name + ' ' + user.lastname;
          self.user = user;
        })
    },

    updateInfo() {
      if (this.isChangePassword) {
        this.changePassword()
      } else {
        this.changeEmail()
      }
    },

    changePassword() {
      const self = this;
      if (this.states['has-success']) {
        const form = 'data=' + JSON.stringify({
          user_id: this.user.user_id,
          current_password: this.currentPassword,
          new_password: this.newPassword
        });

        this.$http.post('user/update_password', form)
        .then((res) => {
          self.showMessage(res.data.message);
          window.location = `${baseURL}app/logout`;
        })
      } else {
        this.$toasted.error("Las contraseñas no conciden");
      }
    },

    changeEmail() {
      const self = this
      const user = this.user

      __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default()({
        title: 'Contraseña',
        input: 'password',
      })
      .then(function (password) {
        const form = 'data=' + JSON.stringify({
          'user_id': user.user_id,
          'password': password,
          'field': 'email',
          'value': user.email
        });

        self.$http.post('user/update_field', form)
        .then(function (res) {
          self.showMessage(res.data.message);
        })
      })
    },

    confirmPasswordServer(password) {
      const self = this;
      const form = 'data=' + JSON.stringify({
        user_id: this.user.user_id,
        current_password: password
      });

      return new Promise((resolve, reject) => {
        self.$http.post('user/confirm_password', form)
        .then((res) => {
          self.showMessage(res.data.message);
          resolve(res.data.is_correct);
        })
      })
    },

    confirmPassword() {
      const self = this;
      this.confirmPasswordServer(this.currentPassword)
      .then((isCorrect) =>{
        self.isChangePassword = isCorrect;
      })
    },

    checkPassword() {
      if ((this.newPassword == this.passwordConfirm) && this.changePassword) {
        this.setStates(true, false);
        this.states.button = true;
      } else if (this.changePassword) {
        this.setStates(false, true);
        this.states.button = false;
      } else {
        this.setStates(false, false);
      }
    },

    setStates(success, error) {
      this.states['has-success'] = success;
      this.states['has-error'] = error;
    },
  }
});


/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"company-details",attrs:{"id":"acount-form"}},[_c('h3',[_vm._v("Detalles de la Cuenta")]),_c('form',[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Nombre de Usuario")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.nickname),expression:"user.nickname"}],staticClass:"form-control",attrs:{"type":"text","disabled":"true"},domProps:{"value":(_vm.user.nickname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "nickname", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Contraseña actual")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentPassword),expression:"currentPassword"}],staticClass:"form-control",attrs:{"type":"password"},domProps:{"value":(_vm.currentPassword)},on:{"keypress":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }$event.preventDefault();_vm.confirmPassword($event)},"input":function($event){if($event.target.composing){ return; }_vm.currentPassword=$event.target.value}}})]),(_vm.isChangePassword)?_c('div',{staticClass:"form-group",class:_vm.states},[_c('label',[_vm._v("Nueva Contraseña")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newPassword),expression:"newPassword"}],staticClass:"form-control",attrs:{"type":"password"},domProps:{"value":(_vm.newPassword)},on:{"keyup":_vm.checkPassword,"input":function($event){if($event.target.composing){ return; }_vm.newPassword=$event.target.value}}})]):_vm._e(),(_vm.isChangePassword)?_c('div',{staticClass:"form-group",class:_vm.states},[_c('label',[_vm._v("Confirmar Nueva Contraseña")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.passwordConfirm),expression:"passwordConfirm"}],staticClass:"form-control",attrs:{"type":"password"},domProps:{"value":(_vm.passwordConfirm)},on:{"keyup":_vm.checkPassword,"input":function($event){if($event.target.composing){ return; }_vm.passwordConfirm=$event.target.value}}})]):_vm._e(),(!_vm.isChangePassword)?_c('h4',{staticClass:"text-primary"},[_vm._v("Para cambiar la contraseña escriba su contraseña actual y presione enter")]):_vm._e()]),_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group hide"},[_c('label',[_vm._v("COD")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.user_id),expression:"user.user_id"}],staticClass:"form-control",attrs:{"type":"text","disabled":"true"},domProps:{"value":(_vm.user.user_id)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "user_id", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Email")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.email),expression:"user.email"}],staticClass:"form-control",attrs:{"type":"email"},domProps:{"value":(_vm.user.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "email", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Nombre")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.fullname),expression:"user.fullname"}],staticClass:"form-control",attrs:{"type":"text","disabled":"true"},domProps:{"value":(_vm.user.fullname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "fullname", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Tipo de Cuenta")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.role),expression:"user.role"}],staticClass:"form-control",attrs:{"type":"text","disabled":"true"},domProps:{"value":(_vm.user.role)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "role", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Cedula(sin guiones)")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.dni),expression:"user.dni"}],staticClass:"form-control",attrs:{"type":"text","disabled":"true"},domProps:{"value":(_vm.user.dni)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "dni", $event.target.value)}}})]),_c('div',{staticClass:"right"},[_c('input',{staticClass:"form-control",attrs:{"type":"submit","value":"Guardar Datos"},on:{"click":function($event){$event.preventDefault();_vm.updateInfo($event)}}})])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

},[79]);
//# sourceMappingURL=cuenta.js.map