<template lang="pug">

  table(:id="ids", class="display", cellspacing="0", width="100%")
    thead
    tbody
</template>

<script>
  import 'bootstrap';
  import 'bootstrap-table';
  import '../../../node_modules/bootstrap-table/dist/locale/bootstrap-table-es-SP';

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
      data() {
        this.refresh(this.data);
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
          sortOrder: 'asc',
          search: 'true',
          toolbar: self.toolbar,
          showRefresh: false,
          showColumns: false,
          showExport: false,
          minimumCountColumns: 2,
          showPaginationSwitch: false,
          pagination: true,
          idField: 'id',
          pageSize: self.options.pageSize || 50,
          pageList: self.options.pageList || [10, 20, 50, 100, 2000],
          showFooter: false,
          clickToSelect: true,
          singleSelect: true,
          striped: false,
          fixed: true,
          footer: false
        });
        this.table.find('tbody').css({ display: 'table-row-group' });
        this.table.addClass('innertable');
        this.$filter.change();

        if (page) {
          this.table.bootstrapTable('selectPage', page);
        }

        this.listen();
      },

      getSelectedRow(emit = true) {
        const row = this.table.bootstrapTable('getSelections')[0];
        if (emit) {
          this.$emit('selected-row', row);
        }
        return row;
      },

      getId(emit = true) {
        const self = this;
        const id = $.map(this.table.bootstrapTable('getSelections'), row => row[self.idField]);
        if (emit) {
          this.$emit('id', id);
        }
        return id;
      },

      refresh(content) {
        const options = this.table.bootstrapTable('getOptions');
        this.table.bootstrapTable('destroy');
        this.table.find('tbody').html(content);
        this.activate(options.pageNumber);
      },

      listen() {
        const self = this;
        this.table.on('all.bs.table', (e, name, args) => {
          if (name !== 'check.bs.table' && name !== 'uncheck.bs.table') {
            self.$emit(name, args);
          } else {
            const row = this.getSelectedRow();
            this.table.on('check.bs.table');
            self.$emit('check-uncheck', row);
          }
        });

        $(window).resize(() => {
          self.table.bootstrapTable('resetView');
        });
      },

      customSearch() {
        $(`${this.parentId} .pull-right.search`).addClass('hide');
        const $inputSearch = $(`${this.parentId} .search input`);
        const $printTable = $(`${this.parentId} .print-table`);
        // const $other       = $(`${parentId} .first-date`);
        // const $other        = $(`${parentId} .last-date`);
        const self = this;
        // eslint-disable-next-line
        $inputSearch.on('click', function () {
          const $this = $(this).parent();
          $this.addClass('focus');
        });
        // eslint-disable-next-line
        $inputSearch.on('blur', function () {
          const $this = $(this).parent();
          $this.removeClass('focus');
        });
        // eslint-disable-next-line
        this.$filter.on('change', function () {
          let filterWord = $(this).val();
          if (filterWord === 'all') {
            filterWord = self['table-states'];
          }
          self.applyFilter(filterWord);
        });

        if ($printTable.length > 0) {
          $printTable.on('click', () => {
            print();
          });
        }
      },

      applyFilte(filter) {
        const self = this;
        this.table.bootstrapTable('filterBy', {
          [self.statefield]: filter
        });
        self.$emit('filter.bs');
      }
    }
  };

</script>
