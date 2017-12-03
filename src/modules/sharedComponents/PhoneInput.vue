<template lang="pug">
  input(:type="types", ref="input",v-model="value", :class="classes", :id="ids" @blur="updateValue")
</template>

<script>
  import InputMask from 'inputmask';

  export default {
    props:[
      'classes',
      'value',
      'ids',
      'types',
      'data'
    ],

    mounted(){

      this.initMask()
    },

    methods: {
      updateValue(e){
        const unmask = this.getVal(e.target);
        this.$emit('change', {key: this.data, value: unmask});
      },

      initMask() {
        const TelSelector = document.querySelectorAll('[type="tel"]');
        const dniSelector = document.querySelectorAll('[role="cedula"], [id*="dni"]');

        InputMask({ mask: '(999) 999-9999', greede: false }).mask(TelSelector);
        InputMask({ mask: ['999-9999999-9', '**-*******', '*{1,20}'], greede: false }).mask(dniSelector);
     },

      getVal(element) {
       return element.inputmask.unmaskedvalue();
      },

      isComplete(element) {
        return element.inputmask.isComplete();
      }
  }
}
</script>

