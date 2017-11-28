export default {
  init(page) {
    this.el = $('#caja');
    this.el.bootstrapTable();
    this.el.find('tbody').css({ display: 'table-row-group' });
    this.el.addClass('innertable');

    if (page) {
      this.el.bootstrapTable('selectPage', page);
    }
  },

  getSelectedRow() {
    return this.el.bootstrapTable('getSelections')[0];
  },

  refresh(content, callback) {
    const options = this.el.bootstrapTable('getOptions');

    this.el.bootstrapTable('destroy');
    this.el.find('tbody').html(content);
    this.init(options.PageNumber);
    if (callback) { callback(); }
  }
};

