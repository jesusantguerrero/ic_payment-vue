<template lang="pug">
  .form-group
    label(for="client-provincia") Servicio
    select.form-control#select-extra-service(type="text", v-model="serviceId", @change="select")
      option(:value="service.id_servicio" ,v-for="service of serviceList") {{ service.nombre }}
</template>

<script>
  import ServiceService from './../servicios/service/serviceService';

  const Service = new ServiceService();

  export default {
    props: {
      serviceType: {
        type: String,
        default: 'reparacion'
      },
      value: String
    },
    data() {
      return {
        serviceList: [],
        serviceId: null,
        selectedService: {}
      };
    },

    mounted() {
      this.getServices();
    },

    watch: {
      value(val) {
        if (!val) {
          this.serviceId = null;
        }
      }
    },

    methods: {
      change() {
        this.$emit('change', this.selectedService);
      },

      getServices() {
        Service.getServiceList(this.serviceType)
          .then((res) => {
            this.serviceList = res.data.services;
          });
      },

      select() {
        this.serviceList.forEach((item) => {
          if (item.id_servicio === this.serviceId) {
            this.selectedService = item;
            this.change();
          }
        });
      },
    },

  };
</script>
