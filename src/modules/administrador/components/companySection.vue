<template lang="pug">
  .company-details#company-section
    h3.section-title Detalles de la Empresa
    form
      .row
        .col-md-6
          .company-profile
            img(:src="logo", alt="company_logo").company-profile__logo
        .col-md-6
          .form-group
            label.file-container(for="company-picture") Actualizar Logo
              input.form-control(type="file", id="company-picture", @change="updatePicture")
      .row
        .col-md-6
          .form-group
            label Nombre de la Empresa
            input.form-control(type="text" , v-model="company.nombre")
          .form-group
            label Lema
            input.form-control(type="text", v-model="company.lema")
          .form-group
            label Telefono Principal
            PhoneInput(placeholder="Phone", types="tel", data="telefono1", :value="company.telefono1" v-on:change="phoneChange", class="form-control")
        .col-md-6
          .form-group
            label Direccion
            input.form-control(type="text", v-model="company.direccion")
          .form-group
            label Descripción
            input.form-control(type="text", v-model="company.descripcion")
          .form-group
            label Telefono2
            PhoneInput(placeholder="Phone", types="tel", data="telefonos", :value="company.telefonos" v-on:change="phoneChange", class="form-control")
        .right.col-md-12
          input(type="submit", value="Guardar Datos", @click.prevent="updateCompany")
</template>


<script>
import axios from 'axios';
import PhoneInput from './../../sharedComponents/PhoneInput'

  export default {
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
      PhoneInput
    },

    mounted() {
      this.getCompany();
    },

    methods: {
      updateCompany(){
      const self = this;
        axios.post(`${baseURL}company/update`, `data=${JSON.stringify(this.company)}`, {
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
        axios.get(`${baseURL}company/get`)
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
        axios.post(`${baseURL}company/upload`, file, {
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

  }
</script>
