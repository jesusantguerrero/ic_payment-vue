export default (Sections) => {
  if (!ran) {
    sectionTable.init();
    Sections.getIps();
    ran = true;
  }

  $("#btn-add-section").on('click', function (e) {
    e.preventDefault()
    e.stopImmediatePropagation();
    Sections.add();
  });

  $("#select-sector").on('change', function (e) {
    e.stopImmediatePropagation();
    Sections.getIps();
  });
}
