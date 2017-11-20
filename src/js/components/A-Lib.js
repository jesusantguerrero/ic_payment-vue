function fillBSTable(tableId, content) {
  var $table = $(tableId);
  $table.bootstrapTable('destroy');
  $table.find('tbody').html(content);
  $table.bootstrapTable();
  $('.pull-right.search').addClass('hide')
  $table.find('tbody').css({display:"table-row-group"});
  $table.addClass('innertable');

}

function filterBSTable(tableId, state) {
  $(tableId).bootstrapTable('filterBy',{
    estado: state
  });
}