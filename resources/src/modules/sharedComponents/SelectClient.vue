<template lang="pug"> 
  multiselect(
    v-model="selectedOptions",
    id="ajax",
    label="text",
    track-by="id",
    placeholder="Escriba el nombre del cliente",
    open-direction="bottom",
    :options="options",
    :searchable="true",
    :loading="isLoading",
    :internal-search="false",
    :options-limit="300",
    :limit="3",
    :limit-text="limitText",
    :max-height="600",
    :show-no-results="false",
    :disabled="disabled"
    @select="$emit('select', $event)"
    @search-change="asyncFind"
  )
    span(slot="noResult").
      No fueron encotrados clientes.
</template>


<script>
import Multiselect from 'vue-multiselect';

export default {
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
    },
    empty: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  components: {
    Multiselect
  },
  data() {
    return {
      selectedOptions: [],
      options: [],
      isLoading: false
    };
  },
  methods: {
    limitText(count) {
      return `y otros ${count} clientes`;
    },
    asyncFind(query) {
      this.isLoading = true;
      this.$http.get(`${this.endpoint}?q=${query}`).then((response) => {
        this.options = response.data.items;
        this.isLoading = false;
      });
    },
    clearAll() {
      this.selectedOptions = [];
    }
  }
};
</script>
