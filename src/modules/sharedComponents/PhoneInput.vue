<template lang="pug">
  input(type="tel", ref="input", :class="classes", :value="value",v-on:input="updateValue" @blur="formatValue", @focus="selectAll")
</template>

<script>
  export default {
    props:[
      'classes',
      'value'
    ],

    mounted(){
      this.formatValue()
    },

    methods: {
      formatValue(){
        const result = this.phoneFormat(this.value)
        this.$emit('input', result.value)
      },

      updateValue(e) {
        const value = e.target.value
        const formatted = this.phoneFormat(value);
        if (formatted != value){
          this.$refs.input.value  = formatted
        }
        this.$emit('input',this.numberFormat(formatted));
      },

      selectAll(e) {
        e.target.select()
      },

      phoneFormat (val) {
          let result
          const len = val.length
          if(len >= 10){
            result = `(${val.slice(0, 3)})-${val.slice(3,6)}-${val.slice(6,)}`
          } else if (len >= 6) {
            result = `(${val.slice(0, 3)})-${val.slice(3,6)}`
          } else if (len >= 3) {
            result = `(${val.slice(0, 3)})`;
          } else {
            result = val
          }
          return result;
      },

    numberFormat(value) {
      const result = value.replace(/[-]|[(]|[)]/gi, '')
      return result
    }
  }
}
</script>

