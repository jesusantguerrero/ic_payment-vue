<template lang="pug">
  button(class="btn", :class="theClass", @click.prevent.stop="click") {{ text }}
</template>

<script>
  export default {
    props: {
      active: Boolean,
      text: String
    },
    computed: {
      theClass() {
        return (this.active) ? 'btn-primary' : 'btn-gray';
      }
    },
    methods: {
      click() {
        this.$emit('click');
      }
    }
  };
</script>

