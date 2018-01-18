
import 'bootstrap-table';
import '@/../../node_modules/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile';
import '@/../../node_modules/bootstrap-table/dist/locale/bootstrap-table-es-SP';

export default {
  fillBSTable(tableId, content) {
    const $table = $(tableId);
    $table.bootstrapTable('destroy');
    $table.find('tbody').html(content);
    $table.bootstrapTable();
    $('.pull-right.search').addClass('hide');
    $table.find('tbody').css({ display: 'table-row-group' });
    $table.addClass('innertable');
  },

  filterBSTable(tableId, state) {
    $(tableId).bootstrapTable('filterBy', {
      estado: state
    });
  }
};
