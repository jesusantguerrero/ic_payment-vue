<template lang="pug">
  table(:id="ids", class="display", cellspacing="0", width="100%")
    thead
      tr
        td(v-for="col of cols") {{ col.name }}
    tbody
</template>

<script>

import jquery from 'jquery';
import jzip from 'jszip';
import pdf from 'pdfmake';
import dt from 'datatables.net-dt';
import dtBtn from  'datatables.net-buttons-dt';
import dtBtn5 from 'datatables.net-buttons/js/buttons.html5.js';
import btnPrint from  'datatables.net-buttons/js/buttons.print.js';
import fixedheader from 'datatables.net-fixedheader-dt';
import dtResponsive from  'datatables.net-responsive-dt';
import dtSelect from  'datatables.net-select-dt';

window.$ = window.jQuery = jquery;

  export default {
    props: {
      cols: {
        type: Array
      },
      data: {
        type: String
      },
      options: {
        type: Object
      },
      ids: {
        type: String
      },
      endpoint: {
        type: String
      }
    },

    methods: {
      init() {
        $(this.ids).DataTable( {
          "processing": true,
          "serverSide": true,
          "ajax": this.endpoint
        });
      },


    }
  }
</script>
