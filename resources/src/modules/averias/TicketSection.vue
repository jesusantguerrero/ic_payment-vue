<template lang="pug">
  .container-fluid
    TicketList(:store="store", v-if="!store.detailMode")
    TicketDetail(:store="store", v-if="store.datailMode")
</template>

<script>
  import TicketList from './components/TicketList.vue';
  import TicketDetail from './components/TicketDetail.vue';
  import TicketStore from './store/TicketStore';

  const store = new TicketStore();
  export default {
    components: {
      TicketList,
      TicketDetail
    },
    data() {
      return {
        store
      };
    }
  };
</script>
