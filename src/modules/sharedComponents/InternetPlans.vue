<template lang="pug">
  .row.shortcuts-container.for-services
    .service-card.shortcut(:id="item.id_servicio", v-for="item of services", @click="select(item)", :class="{ selected: selectedService == item.id_servicio }")
      i.material-icons rss_feed
      | {{ item.nombre }}


</template>

<script>
  import ServiceService from './../servicios/service/serviceService';

  const service = new ServiceService();

  export default {
    data() {
      return {
        services: [],
        selectedService: null
      };
    },
    mounted() {
      this.getServices();
    },

    methods: {
      getServices() {
        service.getServiceList('internet')
          .then((res) => {
            this.services = res.data.services;
          });
      },

      select(item) {
        this.selectedService = item.id_servicio;
        this.$emit('selected', item);
      }
    }
  };
</script>
