<template lang="pug">
  .row.shortcuts-container.for-services
    .service-card.shortcut(:id="item.id_servicio", v-for="item of services", :data-price="item.mensualidad", click="select(item)")
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
        this.$emit('selected', item);
      }
    }
  };
</script>
