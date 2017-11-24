export default (settings) => {
  $("#btn-update-settings").on('click', function (e) {
    e.preventDefault();
    settings.update();
  });
}
