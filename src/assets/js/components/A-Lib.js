function isCurrentPage(pageName){
  if(getCurrentPage() == pageName){
    return true
  }  
  return false;
}

function getCurrentPage(){
  var currentPage = $("title").text().split(" ");
  currentPage = currentPage[4].toLowerCase().trim();
  return currentPage;
}

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