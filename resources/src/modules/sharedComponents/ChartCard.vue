<template lang="pug">
   canvas(:class="dataClass", :id="dataId")
</template>

<script>
  import SingleChart from './charts/SingleChart';

  export default {
    props: {
      labels: {
        type: Array
      },
      data: {
        type: Array
      },

      config: {
        type: Object
      },

      dataClass: {
        type: String
      },

      dataId: {
        type: String
      },
    },

    data() {
      return { chart: null };
    },

    mounted() {
      this.init();
      this.refresh();
    },

    watch: {
      data() {
        this.refresh(this.data);
        this.intialized = false;
      }
    },

    methods: {

      init() {
        this.chart = new SingleChart(document.querySelector(`#${this.dataId}`), this.labels, this.data, this.config);
      },

      refresh() {
        this.chart.update(this.data);
      },
    }
  };

</script>
