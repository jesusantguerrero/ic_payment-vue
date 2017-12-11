<template lang="pug">

  table(:id="ids", class="display", cellspacing="0", width="100%")
    thead
    tbody
</template>

<script>

import jquery from 'jquery';
import bt from 'bootstrap-table';

const context = {}
window.$ = window.jQuery = jquery
bt();

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
      },
      parentId: {
        type: String
      },
      toolbar: {
        type: String
      }
    },
    mounted() {
      this.init();
      this.refresh(this.data);
    },
    watch: {
      data(){
          this.refresh(this.data)
      }
    },

    methods: {

      init() {
        this.table = $(`#${this.ids}`);
        this.$filter = $(`${this.parentId} .filter`);
        this.customSearch();
        this.activate();
        this.listen();
      },

      activate(page) {
        const self = this;
        this.table.bootstrapTable({
          columns: self.cols,
          sortOrder: "asc" ,
          search: "true",
          toolbar: self.toolbar,
          showRefresh: false,
          showColumns: false,
          showExport: false,
          minimumCountColumns: "2",
          showPaginationSwitch: false,
          pagination: "true",
          idField: "id",
          pageSize: "50",
          pageList: "[10,20,50,100,2000]",
          showFooter: false,
          clickToSelect: true,
          singleSelect: true,
          striped: false,
          fixed: true,
          footer: false
        });
        this.table.find('tbody').css({display:"table-row-group"});
        this.table.addClass('innertable');
        this.$filter.change();

        if(page){
          this.table.bootstrapTable('selectPage', page);
        }

        this.listen()

      },

      getSelectedRow(emit = true){
        const row = this.table.bootstrapTable('getSelections')[0];
        if (!emit) {
          return row;
        } else {
          this.$emit('selected-row', row);
        }
      },

      getId(emit = true){
        const self = this;
        const id = $.map(this.table.bootstrapTable('getSelections'),function(row){
          return row[self.idField];
        });

        if (!emit) {
          return id
        }

        this.$emit('id', id)
      },

      refresh(content){
        const options = this.table.bootstrapTable('getOptions');
        this.table.bootstrapTable('destroy');
        this.table.find('tbody').html(content);
        this.activate(options.pageNumber);
      },

      listen() {
        const self = this;
        this.table.on('all.bs.table',function(e, name, args){
          if (name != 'check.bs.table' && name != 'uncheck.bs.table') {
            self.$emit(name);
          } else {
            this.getSelectedRow
            this.table.on('check.bs.table')
            self.$emit(name);
          }
        });

        $(window).resize(function () {
            self.table.bootstrapTable('resetView');
        });


      },

      customSearch() {
        $(`${this.parentId} .pull-right.search`).addClass('hide')
        const $inputSearch = $(`${this.parentId} .search input`);
        const $printTable  = $(`${this.parentId} .print-table`);
        //const $other       = $(`${parentId} .first-date`);
        //const $other        = $(`${parentId} .last-date`);
        const self = this

        $inputSearch.on('click', function (e) {
          const $this = $(this).parent();
          $this.addClass('focus')
        });

        $inputSearch.on('blur', function (e) {
          const $this = $(this).parent();
          $this.removeClass('focus');
        });

        this.$filter.on('change', function (e) {
          let _filtro = $(this).val();
          let _status = _filtro;
          if(_filtro == 'all'){
            _filtro = self['table-states'];
            _status = '';
          }
          self.applyFilter(_filtro);
        })
      },

      applyFilte(filter) {
        const self = this;
        this.table.bootstrapTable('filterBy',{
          [self.statefield]: filter
        })
        self.$emit('filter.bs')
      }
    }
  }

</script>
