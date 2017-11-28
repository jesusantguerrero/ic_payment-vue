<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="Cache-Control" content="no-cache" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

  <title>IC Payment | <?php echo $title; ?> </title>
  <link rel="stylesheet" href="<?php echo base_url('assets/css/secundaryCss.min.css?version=pre-1.0.0') ?>" />
	<link rel="stylesheet" href="<?php echo base_url('assets/css/5-others/square/frontend.min.css?version=pre-1.0.0') ?>"/>
 	<link rel="stylesheet" href="<?php echo base_url('assets/css/main.min.css?version=pre-1.0.0') ?>"/>
  <link rel="icon" type="image/png" sizes="96x96" href="<?php  echo base_url('/favicon-96x96.png')?>">

</head>

<body class="login-body">
  <div class="container-fluid">
    <div class="row">
      <div class="loader"> <span class="load"></span></div>
     <div class="col-md-6 justif-content-center">
       <div class="hidden-xs">
         <h1>IC PAYMENT</h1>
       </div>
       </div>
      <div class="col-md-6 login-box" data-endpoint="<?php echo base_url() ?>">
        <form>
          <div class="cabecera">
            <img src="<?php echo base_url('favicon-96x96.png') ?>" alt="">
            <h4>Ingresa tus datos</h4>
          </div>
          <div class="form-group">
            <label for="user-input">Usuario</label>
            <input v-model ="credentials.user" type="text" class="form-control" placeholder="usuario:demo contraseña:demo" @keypress.enter="login">
          </div>
          <div class="form-group">
            <label for="password-input">Contraseña</label>
            <input id="password-input" type="password" class="form-control" v-model="credentials.password" @keypress.enter="login">
          </div>
          <p class="validation"></p>
          <div class="form-group">
            <input type="button" id="send-credentials" value="Ingresar" @click="login">
          </div>

        </form>

      </div>
    </div>
  </div>
  <div class="copyrights">
    <p>Code and Design by Insane Code-Jesus Guerrero</p>
    <p>2017 &copy; All Rights Reserved</p>
  </div>
  </div>

  <div class="splash-screen">
    <img class="splash-logo" src="<?php echo base_url('assets/img/icpayment_logo_alter.svg') ?>" alt="">
    <h1>IC Payment</h1>
  </div>

  <div class="toast">
    <span></span>
  </div>
  <script src="<?php echo base_url('assets/js/manifest.js?pre-1.0.0') ?>"></script>
  <script src="<?php echo base_url('assets/js/vendor.js?pre-1.0.0') ?>"></script>
  <script src="<?php echo base_url('assets/js/lib/globals.js?pre-1.0.0') ?>"></script>
  <script src="<?php echo base_url('assets/js/login.js?pre-1.0.1') ?>"></script>

  <script>
    setTimeout(function () {
      $(".splash-screen").hide()
    }, 2500);

  </script>

  <script>
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-97873154-2', 'auto');
    ga('send', 'pageview');

  </script>
</body>

</html>
