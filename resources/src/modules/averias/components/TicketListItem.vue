<template lang="pug">
  .averia-item(@click="selected")
    .top-row
      .info
        span.client-name {{ item.cliente }}
        span.client-direction :: {{ item.direccion }} ::
        span.client-direction <b>Celular: </b> {{ item.celular | phoneFormat }}
      button.btn-update-averia(@click.stop="update") Actualizar
    .description
      .text {{ item.descripcion }}
    .status-bar(v-if="item.fecha")
      span
        i.material-icons event
        | Fecha de Reporte: {{ item.fecha }}
      span(class='$fecha_class', style='color:#06f', v-if="item.fecha_reparacion")
        i.material-icons event
        | Fecha de Reparacion: {{ item.fecha_reparacion }}
      span.status(:style='color')
        i.material-icons {{ icon }}
        | {{ item.estado }}
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },

    computed: {
      dateClass() {
        return (this.item.estado === 'reparado') ? '' : 'hide';
      },

      color() {
        return (this.item.estado === 'reparado') ? { color: '#1FD1A8' } : { color: '#dF0a00' };
      },

      icon() {
        return (this.item.estado === 'reparado') ? 'check_box' : 'check_box_outline_blank';
      },
    },

    methods: {
      update() {
        const id = this.getId();
        this.$emit('update', id);
      },

      selected() {
        const id = this.getId();
        this.$emit('selected', id);
      },

      getId() {
        return (this.item.id_averia) ? this.item.id_averia : this.item.id_contrato;
      }
    }
  };
</script>
