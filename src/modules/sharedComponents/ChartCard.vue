<template lang="pug">
   canvas(:class="dataClass", :id="dataId")
</template>

<script>
  import LineChart from './charts/LineChart';

  export default {
    props: {
      labels: {
        type: Array
      },
      data: {
        type: Array
      },

      options: {
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
        this.chart = new LineChart(document.querySelector(`#${this.dataId}`), this.labels, this.data, {});
      },

      refresh() {
        this.chart.update(this.data);
      },
    }
  };

</script>
