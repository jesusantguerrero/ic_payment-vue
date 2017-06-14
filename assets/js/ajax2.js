$(function () {
    var currentPage = $("title").text().split(" ");
  currentPage = currentPage[4].toLowerCase().trim();
  var ran = false;
  switch (currentPage) {
    case "login":
      loginHandlers();
      break;
    case "secciones":
      sectionHandlers();
      break;
  }
  loginHandlers();
  

  function loginHandlers() {
    $("#send-credentials").on('click', function (e) {
      e.stopImmediatePropagation();
      login();
    });

    $("#user-input").on('keydown', function (e) {
      e.stopImmediatePropagation();
      sendToLogin(e)

    })

    $("#password-input").on('keydown', function (e) {
      e.stopImmediatePropagation();
      sendToLogin(e)
    })
  }

  function sectionHandlers() {
    if (!ran) {
      getIps();
      ran = true;
    }

    $("#btn-add-section").on('click', function (e) {
      e.stopImmediatePropagation();
      addSection();
    });

     $("#select-sector").on('change', function (e) {
      e.stopImmediatePropagation();
      getIps();
    });
  }

  function login() {
    var user = $("#user-input").val();
    var password = $("#password-input").val();
    var is_empty = isEmpty([user, password])
    if (!is_empty) {
      var form = 'user=' + user + '&password=' + password;
      connectAndSend('app/login', false, false, processLoginData, form, null, loading)
    } else {
      swal({
        title: 'Complete los datos',
        text: 'LLene todos los campos indicados para ingresar',
        type: 'error',
      });
    }
  }

  function loading() {
    $(".loader").css({
      display: "block"
    });
  }

  function processLoginData(response) {
    if (response == true) {
      window.location.href = BASE_URL + 'app/admin/';
    } else {
      $(".loader").css({
        display: "none"
      });
      swal({
        title: 'Credenciales Incorrectas',
        text: 'Revise los datos ingresados e intente de nuevo',
        type: 'error',
        confirmButtonClass: 'btn',
        buttonsStyling: false
      });
    }
  }

  function sendToLogin(e) {
    key = e.which
    if (key == 13) {
      login();
    }
  }

  $("a[href]").on('click', function () {
    loading();
    var $this = $(this);
    try {
      var target = $this.attr('target');
      setTimeout(function () {
        $(".loader").css({
          display: "none"
        });
      }, 3000)
    } catch (error) {

    }

  })

  /********************************************************
   *                  Funciones de las Secciones                            
   *                                                       *
   ********************************************************/

  function addSection() {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    })

    var steps = [{
        title: 'Nombre del sector'
      },
      'Codigo del Sector',
      "cuantas Ip's tendremos disponibles?"
    ]

    swal.queue(steps).then(function (result) {
      swal.resetDefaults()
      save(result)
    });

    function save(result){
      var form;
      var nombre              = result[0],
          codigoArea          = result[1],
          registrosPosibles   = result[2];

      form = "nombre="+nombre+"&codigo_area="+codigoArea+"&registros_posibles="+ registrosPosibles;
      form += "&tabla=secciones"
     
      return new Promise(function(resolve){
         if(connectAndSend('process/add', true, false, null, form, null, getSections)){
           return resolve();
         }
      })
    }
  }

  function getIps() {
    var id = $("#select-sector").val();
    if (id != null) {
      var form = "tabla=ips&id=" + id;
      connectAndSend('process/getall', false, null, reorderTable, form,null);
    }
  }

  function reorderTable(content){
    var table = $("#t-sections");
    table.bootstrapTable('destroy');
    $("#t-sections tbody").html(content);
    table.bootstrapTable();
  }

  function getSections() {

      var form = "tabla=secciones";
      connectAndSend('process/getall', false, null, fillSelect, form,null);

    function fillSelect(content){
      $("#select-sector").html(content);
    }
  }



});