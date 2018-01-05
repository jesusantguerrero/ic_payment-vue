<template lang="pug">

  table(:id="ids", class="display", cellspacing="0", width="100%")
    thead
    tbody
</template>

<script>
  import 'bootstrap-table';
  import '../../../node_modules/bootstrap-table/dist/locale/bootstrap-table-es-SP';
  import '../../../node_modules/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile';

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
        this.intialized = false;
      }
    },

    methods: {

      init() {
        this.table = $(`#${this.ids}`);
        this.$filter = $(`${this.parentId} .filter`);
        this.activate();
        this.listen();
      },

      activate(page) {
        const self = this;
        let search = true;
        if (typeof self.options.search !== 'undefined') {
          search = false;
        }
        this.table.bootstrapTable({
          columns: self.cols,
          sortOrder: 'asc',
          search,
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
          footer: false,
          mobileResponsive: true,
          checkOnInit: true
        });
        this.table.find('tbody').css({ display: 'table-row-group' });
        this.table.addClass('innertable');
        this.$filter.change();
        if (!this.intialized) {
          this.initialized = true;
          this.customSearch();
          this.listen();
        }
        if (page) {
          this.table.bootstrapTable('selectPage', page);
        }
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
          if (name === 'check.bs.table' || name === 'uncheck.bs.table') {
            const row = this.getSelectedRow();
            self.$emit('check-uncheck', name, row, args);
          } else if (name === 'click-cell.bs.table' && args[0] === 'estado') {
            self.$emit('cell-clicked', name, args);
          }
        });

        $(window).resize(() => {
          self.table.bootstrapTable('resetView');
        });
      },

      customSearch() {
        $(`${this.parentId} .pull-right.search`).addClass('hide');
        const $inputSearch = $(`${this.parentId} .search input`);

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
          if (filterWord === 'todo') {
            filterWord = self.options.states;
          }
          self.applyFilter(filterWord);
        });
      },

      applyFilter(filter) {
        const self = this;
        this.table.bootstrapTable('filterBy', {
          [self.options.stateField]: filter
        });
        self.$emit('filter.bs');
      }
    }
  };

</script>
