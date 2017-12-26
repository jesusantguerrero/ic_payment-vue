<template lang="pug">
  select(class="form-control", :id="theId")
    option(value="0") Escriba el nombre del cliente
</template>


<script>
  export default {
    mounted() {
      this.initSelect2();
    },
    props: {
      endpoint: {
        type: String,
        required: true
      },
      theId: {
        type: String,
        required: true
      },
      parentId: {
        type: String,
        required: true
      }
    },

    methods: {
      initSelect2() {
        this.sel = $(`#${this.theId}`).select2({
          dropdownParent: $(this.parentId),
          width: '100%',
          ajax: {
            url: this.endpoint,
            dataType: 'json',
            delay: 250,
            data(params) {
              return {
                q: params.term,
              };
            },

            processResults(data, params) {
              params.page = params.page || 1;
              return {
                results: data.items,
                pagination: {
                  more: (params.page * 30) < data.total_count
                }
              };
            },
            cache: true
          }
        });

        this.sel.on('select2:select', (e) => {
          this.$emit('select', e.params.data);
        });
      },
    }
  };
</script>
