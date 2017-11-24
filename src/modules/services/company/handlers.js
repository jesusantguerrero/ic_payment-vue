export default (Company) => {
  $("#update-company-data").on('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    Company.update();
  });
}
