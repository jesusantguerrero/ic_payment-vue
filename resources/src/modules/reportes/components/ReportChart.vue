<template lang="pug">
   canvas(:class="dataClass", :id="dataId")
</template>

<script>
  import SingleChart from './../../sharedComponents/charts/SingleChart';

  export default {
    props: {
      labels: {
        type: Array,
        required: true
      },

      data: {
        type: Array,
        required: true
      },

      config: {
        type: Object,
        required: true
      },

      dataClass: {
        type: String,
      },

      dataId: {
        type: String
      },

      ownDataset: {
        type: Array,
        default: null
      }
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
        this.refresh();
        this.intialized = false;
      },

      ownDataset() {
        this.refresh();
      }
    },

    methods: {

      init() {
        this.chart = new SingleChart(document.querySelector(`#${this.dataId}`), this.labels, this.data, this.config, this.ownDataset);
      },

      refresh() {
        const data = this.ownDataset || this.data;
        this.chart.update(data);
      },
    }
  };

</script>
