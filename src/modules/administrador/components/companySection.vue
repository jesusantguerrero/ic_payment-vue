<template lang="pug">
  .company-details#company-section
    h3.section-title Detalles de la Empresa
    form
      .company-profile
        img(:src="logo", alt="company_logo").company-profile__logo
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
            input.form-control(type="tel", v-model="company.telefono1")
        .col-md-6
          .form-group
            label Direccion
            input.form-control(type="text", v-model="company.direccion")
          .form-group
            label Descripción
            input.form-control(type="text", v-model="company.descripcion")
          .form-group
            label Telefono2
            MaskedInput(mask="(111) 111-111", placeholder="Phone", v-model="company.telefonos" @input="phoneChange('telefonos', arguments[1])", class="form-control")
        .right.col-md-12
          input(type="submit", value="Guardar Datos", @click.prevent="updateCompany")
</template>


<script>
import axios from 'axios';
import MaskedInput from 'vue-masked-input'

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
      MaskedInput
    },

    mounted() {
      this.getCompany();
    },

    methods: {
      updateCompany(){
        axios.post(`${baseURL}company/update`, `data=${JSON.stringify(this.company)}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          displayMessage(res.data.message);
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

      phoneChange(key, value) {
        const current = this.store.company;
        current[key] = value;
        this.store.setCompany(current);
      }
    },

    computed: {
      logo() {
        return `${baseURL}assets/uploads/${this.company.logo}`;
      }
    },

  }
</script>
