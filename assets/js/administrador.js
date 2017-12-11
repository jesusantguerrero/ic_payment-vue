webpackJsonp([0],Array(44).concat([
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_toasted__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_toasted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_toasted__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__adminSection_vue__ = __webpack_require__(45);





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
  el: '#administrador',
  components: {
    adminSection: __WEBPACK_IMPORTED_MODULE_3__adminSection_vue__["a" /* default */]
  }
}));


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_adminSection_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_33fd9762_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_adminSection_vue__ = __webpack_require__(78);
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_adminSection_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_33fd9762_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_adminSection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_CompanySection__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_UsersSection__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_caja_CajaSection__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_MessageSettings__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_SettingsSection__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_adminStore__ = __webpack_require__(77);
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
  components: {
    CompanySection: __WEBPACK_IMPORTED_MODULE_0__components_CompanySection__["a" /* default */],
    UsersSection: __WEBPACK_IMPORTED_MODULE_1__components_UsersSection__["a" /* default */],
    CajaSection: __WEBPACK_IMPORTED_MODULE_2__services_caja_CajaSection__["a" /* default */],
    SettingsSection: __WEBPACK_IMPORTED_MODULE_4__components_SettingsSection__["a" /* default */],
    MessageSettings: __WEBPACK_IMPORTED_MODULE_3__components_MessageSettings__["a" /* default */]
  },
  mounted(){
  },

  data(){
    const store = new __WEBPACK_IMPORTED_MODULE_5__store_adminStore__["a" /* default */]('admin');

    return {
      store,
      mode: 'company'
    }
  },

  methods: {
    slide(mode) {
      this.mode = mode;
    }
  }
});


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_CompanySection_vue__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a2e1ab6c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_CompanySection_vue__ = __webpack_require__(57);
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_CompanySection_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a2e1ab6c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_CompanySection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharedComponents_PhoneInput__ = __webpack_require__(49);
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
    props: {
      company:{
        type: Object,
        required: true
      },

      store: {
        type: Object,
        required: true
      }
    },

    components:{
      PhoneInput: __WEBPACK_IMPORTED_MODULE_1__sharedComponents_PhoneInput__["a" /* default */]
    },

    mounted() {
      this.getCompany();
    },

    methods: {
      updateCompany(){
      const self = this;
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${baseURL}company/update`, `data=${JSON.stringify(this.company)}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          self.showMessage(res.data.message);
          self.store.setCompany(res.data.company);
        });
      },

      getCompany() {
        const self = this;
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${baseURL}company/get`)
        .then((res) => {
          self.store.setCompany(res.data);
        })
      },

      phoneChange(param) {
        const current = this.store.company;
        current[param.key] = param.value;
        this.store.setCompany(current);
      },

      updatePicture() {
        const self = this;
        const file = new FormData();
        file.append('picture', document.querySelector('#company-picture').files[0])
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${baseURL}company/upload`, file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          self.showMessage(res.data.message);
          if (res.data.company) {
            self.store.setCompany(res.data.company);
          }
        });
      },
    },

    computed: {
      logo() {
        return `${baseURL}assets/uploads/${this.company.logo}`;
      }
    },

  });


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_PhoneInput_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_075d64e8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_PhoneInput_vue__ = __webpack_require__(56);
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_PhoneInput_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_075d64e8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_PhoneInput_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inputmask__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inputmask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inputmask__);
//
//
//
//

  

  /* harmony default export */ __webpack_exports__["a"] = ({
    props:[
      'classes',
      'value',
      'ids',
      'types',
      'data'
    ],

    mounted(){

      this.initMask()
    },

    methods: {
      updateValue(e){
        const unmask = this.getVal(e.target);
        this.$emit('change', {key: this.data, value: unmask});
      },

      initMask() {
        const TelSelector = document.querySelectorAll('[type="tel"]');
        const dniSelector = document.querySelectorAll('[role="cedula"], [id*="dni"]');

        __WEBPACK_IMPORTED_MODULE_0_inputmask___default()({ mask: '(999) 999-9999', greede: false }).mask(TelSelector);
        __WEBPACK_IMPORTED_MODULE_0_inputmask___default()({ mask: ['999-9999999-9', '**-*******', '*{1,20}'], greede: false }).mask(dniSelector);
     },

      getVal(element) {
       return element.inputmask.unmaskedvalue();
      },

      isComplete(element) {
        return element.inputmask.isComplete();
      }
  }
});


/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return ((_vm.types)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],ref:"input",class:_vm.classes,attrs:{"id":_vm.ids,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.value)?_vm._i(_vm.value,null)>-1:(_vm.value)},on:{"blur":_vm.updateValue,"change":function($event){var $$a=_vm.value,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.value=$$a.concat([$$v]))}else{$$i>-1&&(_vm.value=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.value=$$c}}}}):((_vm.types)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],ref:"input",class:_vm.classes,attrs:{"id":_vm.ids,"type":"radio"},domProps:{"checked":_vm._q(_vm.value,null)},on:{"blur":_vm.updateValue,"change":function($event){_vm.value=null}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],ref:"input",class:_vm.classes,attrs:{"id":_vm.ids,"type":_vm.types},domProps:{"value":(_vm.value)},on:{"blur":_vm.updateValue,"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value}}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"company-details",attrs:{"id":"company-section"}},[_c('h3',{staticClass:"section-title"},[_vm._v("Detalles de la Empresa")]),_c('form',[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"company-profile"},[_c('img',{staticClass:"company-profile__logo",attrs:{"src":_vm.logo,"alt":"company_logo"}})])]),_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"file-container",attrs:{"for":"company-picture"}},[_vm._v("Actualizar Logo"),_c('input',{staticClass:"form-control",attrs:{"type":"file","id":"company-picture"},on:{"change":_vm.updatePicture}})])])])]),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Nombre de la Empresa")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.company.nombre),expression:"company.nombre"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.company.nombre)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.company, "nombre", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Lema")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.company.lema),expression:"company.lema"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.company.lema)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.company, "lema", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Telefono Principal")]),_c('PhoneInput',{staticClass:"form-control",attrs:{"placeholder":"Phone","types":"tel","data":"telefono1","value":_vm.company.telefono1},on:{"change":_vm.phoneChange}})],1)]),_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Direccion")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.company.direccion),expression:"company.direccion"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.company.direccion)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.company, "direccion", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Descripción")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.company.descripcion),expression:"company.descripcion"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.company.descripcion)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.company, "descripcion", $event.target.value)}}})]),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Telefono2")]),_c('PhoneInput',{staticClass:"form-control",attrs:{"placeholder":"Phone","types":"tel","data":"telefonos","value":_vm.company.telefonos},on:{"change":_vm.phoneChange}})],1)]),_c('div',{staticClass:"right col-md-12"},[_c('input',{attrs:{"type":"submit","value":"Guardar Datos"},on:{"click":function($event){$event.preventDefault();_vm.updateCompany($event)}}})])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_UsersSection_vue__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1ed4d816_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_UsersSection_vue__ = __webpack_require__(65);
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_UsersSection_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1ed4d816_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_UsersSection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert2__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharedComponents_DataTable__ = __webpack_require__(60);
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
  components: {
    DataTable: __WEBPACK_IMPORTED_MODULE_1__sharedComponents_DataTable__["a" /* default */]
  },
  data() {
    return {

      content: '',
      parentId: '#user-table-container',
      toolbar: '#user-toolbar',
      idField: 'id'
    }
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    add() {
    //   const self = this;
    //   const nick = $('#user-nickname').val();
    //   const password = $('#user-password').val();
    //   const name = $('#user-name').val();
    //   const lastname = $('#user-lastname').val();
    //   const dni = getVal($('#user-dni'));
    //   const type = $('#user-type').val();
    //   const empty = isEmpty([nick, password, name, lastname, dni, type]);

    // if (!empty) {
    //   const form = `nickname=${nick}&password=${password}&name=${name}&lastname=${lastname}&dni=${dni}&type=${type}`;
    //   this.send('add', form)
    //   .then((res) => {
    //     displayMessage(res.data);
    //     self.getAll();
    //   });
    // } else {
    //   displayAlert('Revise', 'LLene todos los campos por favor', 'error');
    // }
    },

    update() {
      // const nick = $('#e-nickname').val();
      // const name = $('#e-name').val();
      // const lastname = $('#e-lastname').val();
      // const dni = $('#e-dni').val();
      // const type = $('#e-type').val();
      // const empty = isEmpty([nick, name, lastname, dni, type]);
      // const self = this;

      // if (!empty) {
      //   const form = `nickname=${nick}&name=${name}&lastname=${lastname}&dni=${dni}&type=${type}`;
      //   this.send('update', form)
      //   .then(() => {
      //     self.getAll();
      //   });
      // } else {
      //   displayAlert('Revise', 'LLene todos los campos por favor', 'error');
      // }
    },

    getUsers() {
      const self = this;
      this.$http.get('user/get_users')
      .then((res) => {
          self.content = res.data;
      });
    },

    delete(id) {
      const self = this;
      const form = `user_id=${id}`;
      __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default()({
        title: 'Eliminar Usuario',
        text: "¿Estas seguro de querer eliminar este usuario?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          sendDelete();
        }
      });

      function sendDelete() {
        self.$http.post('user/delete_user', form)
        .then((res) => {
          self.getUsers();
          self.showMessage(res.data.message);
        });
      }
    },

    changeState(id) {
      const self = this;
      const form = `user_id=${id}`;
      this.$http.post('user/change_state', form)
      .then((res) => {
        self.getUsers();
        self.showMessage(res.data.message);
      });
    },
  },

  computed: {
    cols() {
      const self = this;
      const userEvents = {
        'click .btn-change-state': (e, value, row, index) => {
        this.changeState(row.id);
        },

        'click .delete-user': (e, value, row, index) => {
        this.delete(row.id);
        }
      }

      return [
         {title: 'No.', field: 'order', 'align': 'center', valign: 'middle', sortable: true},
         {title: 'COD', field: 'id', 'align': 'center', valign: 'middle', sortable: true, class:"hide"},
         {title: 'Usuario', field: 'nickname', 'align': 'center', valign: 'middle', sortable: true},
         {title: 'Nombres', field: 'nombres', 'align': 'center', valign: 'middle', sortable: true},
         {title: 'Apellidos', field: 'apellidos', 'align': 'center', valign: 'middle', sortable: true},
         {title: 'Cedula', field: 'cedula', 'align': 'center', valign: 'middle', sortable: true},
         {title: 'Rol', field: 'tipo', 'align': 'center', valign: 'middle', sortable: false},
         {title: 'Estado', field: 'estado', 'align': 'center', valign: 'middle', sortable: false, events: userEvents },
         {title: 'Code Type', field: 'role_level', 'align': 'center', valign: 'middle', sortable: false, class:"hide"},
         {title: 'Acciones', field: 'acciones', 'align': 'center', valign: 'middle', sortable: false, events: userEvents}
      ]
    }
  }
});


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_DataTable_vue__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4bdc91fa_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_DataTable_vue__ = __webpack_require__(64);
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_DataTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4bdc91fa_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_DataTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_table__ = __webpack_require__(63);
//
//
//
//
//
//
//





const context = {}
window.$ = window.jQuery = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a
Object(__WEBPACK_IMPORTED_MODULE_1_bootstrap_table__["a" /* default */])();

  /* harmony default export */ __webpack_exports__["a"] = ({
    props: {
      cols: {
        type: Array
      },
      data: {
        type: String
      },
      options: {
        type: Object
      },
      ids: {
        type: String
      },
      endpoint: {
        type: String
      },
      parentId: {
        type: String
      },
      toolbar: {
        type: String
      }
    },
    mounted() {
      this.init();
      this.refresh(this.data);
    },
    watch: {
      data(){
          this.refresh(this.data)
      }
    },

    methods: {

      init() {
        this.table = $(`#${this.ids}`);
        this.$filter = $(`${this.parentId} .filter`);
        this.customSearch();
        this.activate();
        this.listen();
      },

      activate(page) {
        const self = this;
        this.table.bootstrapTable({
          columns: self.cols,
          sortOrder: "asc" ,
          search: "true",
          toolbar: self.toolbar,
          showRefresh: false,
          showColumns: false,
          showExport: false,
          minimumCountColumns: "2",
          showPaginationSwitch: false,
          pagination: "true",
          idField: "id",
          pageSize: "50",
          pageList: "[10,20,50,100,2000]",
          showFooter: false,
          clickToSelect: true,
          singleSelect: true,
          striped: false,
          fixed: true,
          footer: false
        });
        this.table.find('tbody').css({display:"table-row-group"});
        this.table.addClass('innertable');
        this.$filter.change();

        if(page){
          this.table.bootstrapTable('selectPage', page);
        }

        this.listen()

      },

      getSelectedRow(emit = true){
        const row = this.table.bootstrapTable('getSelections')[0];
        if (!emit) {
          return row;
        } else {
          this.$emit('selected-row', row);
        }
      },

      getId(emit = true){
        const self = this;
        const id = $.map(this.table.bootstrapTable('getSelections'),function(row){
          return row[self.idField];
        });

        if (!emit) {
          return id
        }

        this.$emit('id', id)
      },

      refresh(content){
        const options = this.table.bootstrapTable('getOptions');
        this.table.bootstrapTable('destroy');
        this.table.find('tbody').html(content);
        this.activate(options.pageNumber);
      },

      listen() {
        const self = this;
        this.table.on('all.bs.table',function(e, name, args){
          if (name != 'check.bs.table' && name != 'uncheck.bs.table') {
            self.$emit(name);
          } else {
            this.getSelectedRow
            this.table.on('check.bs.table')
            self.$emit(name);
          }
        });

        $(window).resize(function () {
            self.table.bootstrapTable('resetView');
        });


      },

      customSearch() {
        $(`${this.parentId} .pull-right.search`).addClass('hide')
        const $inputSearch = $(`${this.parentId} .search input`);
        const $printTable  = $(`${this.parentId} .print-table`);
        //const $other       = $(`${parentId} .first-date`);
        //const $other        = $(`${parentId} .last-date`);
        const self = this

        $inputSearch.on('click', function (e) {
          const $this = $(this).parent();
          $this.addClass('focus')
        });

        $inputSearch.on('blur', function (e) {
          const $this = $(this).parent();
          $this.removeClass('focus');
        });

        this.$filter.on('change', function (e) {
          const _filtro = $(this).val();
          const _status = _filtro;
          if(_filtro == 'all'){
            _filtro = self['table-states'];
            _status = '';
          }
          self.applyFilter(_filtro);
        })
      },

      applyFilte(filter) {
        const self = this;
        this.table.bootstrapTable('filterBy',{
          [self.statefield]: filter
        })
        self.$emit('filter.bs')
      }
    }
  });



/***/ }),
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"display",attrs:{"id":_vm.ids,"cellspacing":"0","width":"100%"}},[_c('thead'),_c('tbody')])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"company-details",attrs:{"id":"user-section"}},[_c('h3',{staticClass:"section-title"},[_vm._v("Usuarios")]),_c('div',{attrs:{"id":"user-table-container"}},[_vm._m(0,false,false),_c('DataTable',{attrs:{"ids":"user-table","parentId":_vm.parentId,"data":_vm.content,"cols":_vm.cols,"toolbar":_vm.toolbar}})],1)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"searcher-container main-toolbar",attrs:{"id":"user-toolbar"}},[_c('div',{staticClass:"input-group search"},[_c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("search")])]),_c('input',{staticClass:"form-control searcher",attrs:{"type":"text","placeholder":" descripcion"}})]),_c('div',{staticClass:"pull-right"},[_c('button',{staticClass:"btn btn-primary icon"},[_c('i',{staticClass:"material-icons"})])]),_c('div',{staticClass:"pull-right"},[_c('button',{staticClass:"btn btn-primary icon",attrs:{"id":"caller-user","data-toggle":"modal","data-target":"#new-user-modal"}},[_vm._v("Agregar "),_c('i',{staticClass:"material-icons"},[_vm._v("add")])])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_CajaSection_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44013ffd_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CajaSection_vue__ = __webpack_require__(70);
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_CajaSection_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44013ffd_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CajaSection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handlers__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cajaTable__ = __webpack_require__(69);
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
  data() {
    return {
      cajaTable: __WEBPACK_IMPORTED_MODULE_1__cajaTable__["a" /* default */],
      searchOptions: {
        firstDate: '',
        secondDate: '',
        user: '',
      },
      userList: ''
    }
  },

  mounted() {
    this.cajaTable = __WEBPACK_IMPORTED_MODULE_1__cajaTable__["a" /* default */];
    if (currentPage === 'administrador') {
      this.cajaTable.init();
      this.getAll();
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__handlers__["a" /* default */])(this);
  },

  methods: {
    getAll() {
      const self = this;
      const form = 'tabla=caja';
      this.send('getAll', form)
        .then((res) => {
          self.cajaTable.refresh(res.data);
          self.getSaldo();
        });
    },

    getSaldo() {
      const form = 'tabla=caja';
      this.send('getone', form)
        .then((res) => {
          updateSaldo(res.data);
        });
    },

    search() {
      const self = this;
      const form = `tabla=caja&id_empleado=${searchOptions.user}&fecha=${searchOptions.firstDate}`;
      this.send('search', form)
        .then((res) => {
          self.cajaTable.refresh(res.data);
        });
    },

    send(endpoint, data) {
      return axios.post(`${BASE_URL}process/${endpoint}`, data);
    },

    add() {
      const self = this;
      const amount = $('#caja-a-amount').val();
      const description = $('#caja-a-description').val();
      const form = `entrada=${amount}&descripcion=${description}&tabla=caja`;
      const empty = isEmpty([amount, description]);

      if (!empty) {
        this.send('add', form)
          .then((res) => {
            displayMessage(res.data);
            self.getAll();
          });
      } else {
        displayAlert('Revise', 'LLene todos los campos por favor', 'error');
      }
    },

    retire() {
      const self = this;
      const amount = $('#caja-r-amount').val();
      const description = $('#caja-r-description').val();
      const form = `salida=${amount}&descripcion=${description}`;
      const empty = isEmpty([amount, description]);

      if (!empty) {
        this.send('retire', form)
          .then((res) => {
            displayMessage(res.data);
            console.log(self);
            self.gatAll();
          });
      } else {
        displayAlert('Revise', 'LLene todos los campos por favor', 'error');
      }
    },
  }
});



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((Caja) => {
  const btnAddMoney = $('#btn-add-money');
  const btnRetireMoney = $('#btn-retire-money');
  const userSearch = $('#caja-user');
  const dateSearch = $('#caja-date');

  btnAddMoney.on('click', function (e) {
    e.stopImmediatePropagation();
    Caja.add();
  });

  btnRetireMoney.on('click', function (e) {
    e.stopImmediatePropagation();
    Caja.retire();
  });

  dateSearch.on('change', function (e) {
    e.stopImmediatePropagation();
    Caja.search();
  });

  userSearch.on('change', function (e) {
    e.stopImmediatePropagation();
    Caja.search();
  });
});


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init(page) {
    this.el = $('#caja');
    this.el.bootstrapTable();
    this.el.find('tbody').css({ display: 'table-row-group' });
    this.el.addClass('innertable');

    if (page) {
      this.el.bootstrapTable('selectPage', page);
    }
  },

  getSelectedRow() {
    return this.el.bootstrapTable('getSelections')[0];
  },

  refresh(content, callback) {
    const options = this.el.bootstrapTable('getOptions');

    this.el.bootstrapTable('destroy');
    this.el.find('tbody').html(content);
    this.init(options.PageNumber);
    if (callback) { callback(); }
  }
});



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"company-details",attrs:{"id":"caja-section"}},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"searcher-container main-toolbar",attrs:{"id":"caja-toolbar"}},[_vm._m(1,false,false),_vm._v(" "),_c('div',{staticClass:"input-group search"},[_vm._m(2,false,false),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchOptions.user),expression:"searchOptions.user"}],staticClass:"form-control",attrs:{"name":""},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.searchOptions, "user", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},[_vm._v("\n        "+_vm._s(_vm.userList)+"\n      ")])]),_vm._v(" "),_c('div',{staticClass:"input-group search"},[_vm._m(3,false,false),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchOptions.firstDate),expression:"searchOptions.firstDate"}],staticClass:"form-control caja-for-date",attrs:{"type":"date","placeholder":"Fecha"},domProps:{"value":(_vm.searchOptions.firstDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.searchOptions, "firstDate", $event.target.value)}}})]),_vm._v(" "),_vm._m(4,false,false),_vm._v(" "),_vm._m(5,false,false)]),_vm._v(" "),_vm._m(6,false,false)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h3',{staticClass:"section-title"},[_vm._v(" Caja Chica -\n    "),_c('small',[_vm._v(" saldo actual:\n      "),_c('span',{staticClass:"current-saldo"})])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group search"},[_c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("search")])]),_vm._v(" "),_c('input',{staticClass:"form-control searcher",attrs:{"type":"text","placeholder":" descripcion"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("person_pin")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("event")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"pull-right"},[_c('button',{staticClass:"btn btn-primary icon",attrs:{"data-toggle":"modal","data-target":"#retire-money-modal"}},[_c('i',{staticClass:"material-icons"},[_vm._v("remove")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"pull-right"},[_c('button',{staticClass:"btn btn-primary icon",attrs:{"data-toggle":"modal","data-target":"#add-money-modal"}},[_c('i',{staticClass:"material-icons mi__single"},[_vm._v("add")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"table t-users",attrs:{"id":"caja","data-sort-name":"order","data-minimum-count-columns":"2","data-show-pagination-switch":"false","data-search":"true","data-toolbar":"#caja-toolbar","data-pagination":"true","data-unique-id":"id","data-page-size":"5","data-page-list":"[5,10,50, 100]","data-show-footer":"false","data-striped":"false"}},[_c('thead',[_c('tr',[_c('th',{staticClass:"hide",attrs:{"data-field":"id"}},[_vm._v("COD")]),_vm._v(" "),_c('th',{attrs:{"data-field":"fecha"}},[_vm._v("Fecha")]),_vm._v(" "),_c('th',{attrs:{"data-field":"descripcion"}},[_vm._v("Descripcion")]),_vm._v(" "),_c('th',{attrs:{"data-field":"ingreso"}},[_vm._v("Ingreso")]),_vm._v(" "),_c('th',{attrs:{"data-field":"salida"}},[_vm._v("Salida")]),_vm._v(" "),_c('th',{attrs:{"data-field":"saldo"}},[_vm._v("Saldo de Caja")]),_vm._v(" "),_c('th',{attrs:{"data-field":"autor"}},[_vm._v("Hecha Por")])])]),_vm._v(" "),_c('tbody')])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_MessageSettings_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_581d2ae9_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MessageSettings_vue__ = __webpack_require__(73);
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_MessageSettings_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_581d2ae9_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MessageSettings_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

const configMessage = {
  email: '',
  password: '',
  device_id: '',
  country_code: '',
  send_at: '1 second',
  expires_at: '1 hour'
}

/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return{
      config: configMessage
    }
  },

  created() {
    this.getConfig()
  },

  methods: {
    getConfig() {
      const self = this;
      this.$http.get(`messages/get_config`)
        .then((res) => {
          if (res.data.config) {
            self.config = res.data.config
          }
        })
        .catch((error) => {
           self.$toast.error(error)
        })
    },

    saveSettings(e) {
      const self = this
      this.$http.post(`messages/save_config`, this.getDataForm(this.config))
        .then((res) => {
          self.showMessage(res.data.menssage);
        })
        .catch((err) => {
          self.$toast.error(err);
        })
    }
  }
});



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"company-details",attrs:{"id":"message-settings-section"}},[_c('h3',{staticClass:"section-title"},[_vm._v(" Ajustes de Mensajes")]),_vm._v(" "),_c('form',{attrs:{"action":""}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-name"}},[_vm._v("Correo Electronico")]),_vm._v(" "),_c('div',{staticClass:"input-group"},[_vm._m(0,false,false),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.email),expression:"config.email"}],staticClass:"form-control",attrs:{"type":"email"},domProps:{"value":(_vm.config.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config, "email", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-phrase"}},[_vm._v("Codigo Pais")]),_vm._v(" "),_c('div',{staticClass:"input-group"},[_vm._m(1,false,false),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.country_id),expression:"config.country_id"}],staticClass:"form-control",attrs:{"name":""},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.config, "country_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},[_c('option',{attrs:{"value":"1"}},[_vm._v("RD (+1)")])])])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-phone1"}},[_vm._v("ID Telefono")]),_vm._v(" "),_c('div',{staticClass:"input-group"},[_vm._m(2,false,false),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.device_id),expression:"config.device_id"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.config.device_id)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config, "device_id", $event.target.value)}}})])])]),_vm._v(" "),_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-name"}},[_vm._v("Contraseña")]),_vm._v(" "),_c('div',{staticClass:"input-group"},[_vm._m(3,false,false),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.password),expression:"config.password"}],staticClass:"form-control",attrs:{"type":"password"},domProps:{"value":(_vm.config.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config, "password", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-name"}},[_vm._v("Margen Entre Mensajes")]),_vm._v(" "),_c('div',{staticClass:"input-group"},[_vm._m(4,false,false),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.start_at),expression:"config.start_at"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.config.start_at)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config, "start_at", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-name"}},[_vm._v("Tiempo de Expiracion")]),_vm._v(" "),_c('div',{staticClass:"input-group"},[_vm._m(5,false,false),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.expires_at),expression:"config.expires_at"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.config.expires_at)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config, "expires_at", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"right"},[_c('input',{attrs:{"type":"submit","value":"Revisar"},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.saveSettings($event)}}})])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("email")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("settings_phone")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("phone")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("lock_outline")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("access_time")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("access_time")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_SettingsSection_vue__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06042d27_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_SettingsSection_vue__ = __webpack_require__(76);
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_SettingsSection_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06042d27_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_node_modules_vue_loader_lib_selector_type_template_index_0_SettingsSection_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
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
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  data() {
    return {
      settings: {
        cargo_mora: '',
        fecha_corte: '',
        reconexion: '',
        split_day: '',
        penalizacion_cancelacion: '',
        meses_por_defecto: '',
      }
    }
  },

  mounted(){
    this.getSettings();
  },

  methods: {
    update() {
      const self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${baseURL}settings/update`, this.getDataForm(this.settings))
        .then((res) => {
          self.showMessage(res.data.message);
        });
    },

    getSettings() {
      const self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${baseURL}settings/get`)
      .then((res)=> {
        self.settings = res.data;
      })
    }
  }
});


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"company-details",attrs:{"id":"settings-section"}},[_c('h3',{staticClass:"section-title"},[_vm._v("Ajustes del Programa")]),_c('form',[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-name"}},[_vm._v("Monto de la mora")]),_c('div',{staticClass:"input-group"},[_vm._m(0,false,false),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.cargo_mora),expression:"settings.cargo_mora"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.settings.cargo_mora)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings, "cargo_mora", $event.target.value)}}})])]),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-phrase"}},[_vm._v("Fecha de Corte")]),_c('div',{staticClass:"input-group"},[_vm._m(1,false,false),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.fecha_corte),expression:"settings.fecha_corte"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.settings.fecha_corte)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings, "fecha_corte", $event.target.value)}}})])]),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-phone1"}},[_vm._v("Monto de Reconexion")]),_c('div',{staticClass:"input-group"},[_vm._m(2,false,false),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.reconexion),expression:"settings.reconexion"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.settings.reconexion)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings, "reconexion", $event.target.value)}}})])])]),_c('div',{staticClass:"col-md-6"},[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-name"}},[_vm._v("Penalizacion Por Cancelacion:")]),_c('div',{staticClass:"input-group"},[_vm._m(3,false,false),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.penalizacion_cancelacion),expression:"settings.penalizacion_cancelacion"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.settings.penalizacion_cancelacion)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings, "penalizacion_cancelacion", $event.target.value)}}})])]),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-name"}},[_vm._v("Meses Por defecto de un contrato:")]),_c('div',{staticClass:"input-group"},[_vm._m(4,false,false),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.meses_por_defecto),expression:"settings.meses_por_defecto"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.settings.meses_por_defecto)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings, "meses_por_defecto", $event.target.value)}}})])]),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"company-name"}},[_vm._v("Split Day")]),_c('div',{staticClass:"input-group"},[_vm._m(5,false,false),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.settings.split_day),expression:"settings.split_day"}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(_vm.settings.split_day)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings, "split_day", $event.target.value)}}})])]),_c('div',{staticClass:"right"},[_c('input',{attrs:{"id":"btn-update-settings","type":"submit","value":"Guardar Datos"},on:{"click":function($event){$event.preventDefault();_vm.update($event)}}})])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("%")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("event")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("attach_money")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("%")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("event_note")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"material-icons"},[_vm._v("event_note")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Store {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Store;



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrapper"},[_c('div',{staticClass:"left-navigation administrador col-md-2"},[_c('div',{staticClass:"aside-nav"},[_c('li',{staticClass:"aside-buttons"},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.slide('company')}}},[_c('i',{staticClass:"material-icons"},[_vm._v("description")]),_vm._v(" Empresa")])]),_c('div',{staticClass:"aside-buttons"},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.slide('users')}}},[_c('i',{staticClass:"material-icons"},[_vm._v("person_pin")]),_vm._v(" Usuarios")])]),_vm._m(0,false,false),_c('div',{staticClass:"aside-buttons"},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.slide('settings')}}},[_c('i',{staticClass:"material-icons"},[_vm._v("settings")]),_vm._v(" Ajustes")])]),_c('div',{staticClass:"aside-buttons"},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.slide('message_settings')}}},[_c('i',{staticClass:"material-icons"},[_vm._v("phonelink_setup")]),_vm._v(" Ajustes de Mensajes")])])])]),_c('div',{staticClass:"main-content col-md-10"},[_c('div',{staticClass:"section-player"},[(_vm.mode == 'company')?_c('CompanySection',{attrs:{"company":_vm.store.company,"store":_vm.store}}):_vm._e(),(_vm.mode == 'users')?_c('UsersSection',{attrs:{"company":_vm.store.company}}):_vm._e(),(_vm.mode == 'settings')?_c('SettingsSection',{attrs:{"company":_vm.store.company}}):_vm._e(),(_vm.mode == 'message_settings')?_c('MessageSettings',{attrs:{"company":_vm.store.company}}):_vm._e()],1)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"aside-buttons"},[_c('a',{attrs:{"href":"#caja-section"}},[_c('i',{staticClass:"material-icons"},[_vm._v("move_to_inbox")]),_vm._v(" Caja Chica")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
]),[44]);
//# sourceMappingURL=administrador.js.map