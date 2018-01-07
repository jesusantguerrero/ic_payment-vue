<template lang="pug">
  input(:type="types", ref="input",v-model="value", :class="classes", :id="ids" @blur="updateValue")
</template>

<script>
  import InputMask from 'inputmask';
  import utils from './utils';

  export default {
    props: [
      'classes',
      'value',
      'ids',
      'types',
      'data'
    ],

    mounted() {
      this.initMask();
    },

    methods: {
      updateValue(e) {
        const unmask = this.getVal(e.target);
        this.$emit('change', { key: this.data, value: unmask });
      },

      initMask() {
        utils.startInputMask(InputMask);
      },

      getVal(element) {
        return element.inputmask.unmaskedvalue();
      },

      isComplete(element) {
        return element.inputmask.isComplete();
      }
    }
  };
</script>

