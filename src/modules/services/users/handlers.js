export default (Users) => {
  $('#btn-save-user').on('click', (e) => {
    e.stopImmediatePropagation();
    Users.add();
  });

  $('#btn-update-user').on('click', (e) => {
    e.stopImmediatePropagation();
    Users.update();
  });
};
