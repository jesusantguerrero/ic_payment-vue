<template lang="pug">
  .navigator
   h4.title {{ title }}
   .cs-row(v-if="display")
      button(@click="removeTime()"): i.material-icons navigate_before</i></button><span class="value">{{ year }}</span>
      button(@click="addTime()"): i.material-icons navigate_next</i></button>
</template>

<script>
  export default {
    props: {
      title: String,
      display: {
        type: String,
        default: null
      }
    },
    data() {
      return { year: '' };
    },

    mounted() {
      this.year = new Date().getFullYear();
    },

    methods: {
      addTime() {
        this.year += 1;
        this.change();
      },

      removeTime() {
        if (this.year > 0) {
          this.year -= 1;
        }
        this.change();
      },

      change() {
        this.$emit('change', this.year);
      }
    }
  };
</script>

