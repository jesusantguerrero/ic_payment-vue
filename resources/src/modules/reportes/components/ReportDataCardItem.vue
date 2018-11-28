<template lang="pug">
  .small-data-card
    i.material-icons {{ icon }}
    span.data {{ data }}
    span {{ title }}
    .card-detail(v-if="detail")
      a(:href="detail.link || '#'" class="cover-links") {{ detail.title }}
</template>

<script>
  export default {
    props: {
      icon: {
        type: String
      },
      data: {
        type: Number | String
      },
      title: {
        type: String
      },
      detail: {
        type: Object
      }
    },
    data() {
      return {
        detailLink: '#'
      };
    }
  };
</script>
