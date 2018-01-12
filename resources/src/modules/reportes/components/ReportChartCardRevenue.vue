<template lang="pug">

</template>

<script>
  export default {
    props: {
      data: Object
    },

    data() {
      return {
        incomes: {
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          total: 0.00
        }
      };
    },
  };
</script>

