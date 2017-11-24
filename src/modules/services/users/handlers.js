export default (Users) => {
  userTable.init();
  $("#btn-save-user").on('click', function (e) {
    e.stopImmediatePropagation();
    Users.add();
  });

  $("#btn-update-user").on('click', function (e) {
    e.stopImmediatePropagation();
    Users.update();
  });
}
