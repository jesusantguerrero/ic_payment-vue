<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="Cache-Control" content="no-cache" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

  <title>IC Payment | {title} </title>
  {css}
    <link rel="stylesheet" href="{link}">
  {/css}
  <link rel="icon" type="image/png" sizes="96x96" href="{url}favicon-96x96.png">

</head>

<body class="login-body">
  <div class="container-fluid container-login">
    <div class="loader"> <span class="load"></span></div>
    <div class="row justify-content-center">
     <!-- <div class="col-md-6 justify-content-center hidden-xs">
       <div class="hidden-xs">
         <h1>PAYMENT PLUS</h1>
       </div>
      </div> -->
      <div class="col-md-6 login-box">
        <form>
          <div class="cabecera">
            <img src="{url}favicon-96x96.png" alt="">
            <h4>Ingresa tus datos</h4>
          </div>
          <div class="form-group">
            <label for="user-input">Usuario</label>
            <input v-model ="credentials.user" id="user-input" type="text" class="form-control"  @keypress.enter="login">
          </div>
          <div class="form-group">
            <label for="password-input">Contraseña</label>
            <input id="password-input" type="password" class="form-control" v-model="credentials.password" @keypress.enter="login">
          </div>
          <p class="validation"></p>
          <div class="form-group">
            <input type="button" id="btn-send-credentials" value="Ingresar" @click="login">
          </div>

        </form>

      </div>
    </div>

    <div class="copyrights">
      <p>Code and Design by Jesus Guerrero</p>
      <p>2018 &copy; All Rights Reserved</p>
    </div>
    </div>

  </div>


  <div class="splash-screen">
    <img class="splash-logo" src="{url}assets/img/icpayment_logo_alter.svg" alt="">
    <h1>Payment Plus</h1>
  </div>

  <script>
    const baseURL = '{url}'
  </script>

  {js}
    <script src="{link}"></script>
  {/js}

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
  <script>

  </script>
</body>

</html>
