<template lang="pug">
  input(:type="types" ref="input" v-model="customValue" :class="classes" :id="ids" @input="updateValue" @blur="updateValue")
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

    data() {
      return {
        customValue: ''
      };
    },

    mounted() {
      this.customValue = this.value;

      this.initMask();
    },

    watch: {
      value() {
        this.customValue = this.value;
      },

      ids() {
        this.initMask();
      }
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

