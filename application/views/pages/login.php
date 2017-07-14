<?php
ob_start( 'ob_gzhandler' );
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <title>IC Payment | <?php echo $title; ?></title>
    <link rel="stylesheet" href="<?php echo base_url('assets/css/bootstrap.min.css') ?>"/>
    <link rel="stylesheet" href="<?php echo base_url('assets/css/sweetalert2.min.css') ?>" />
    <link rel="stylesheet" href="<?php echo base_url('assets/css/main.css') ?>" />
    
    <link rel="icon" type="image/png" sizes="32x32" href="<?php  echo base_url('/favicon-32x32.png')?>">
    <link rel="icon" type="image/png" sizes="96x96" href="<?php  echo base_url('/favicon-96x96.png')?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php  echo base_url('/favicon-16x16.png')?>">
    <link rel="manifest" href="<?php  echo base_url('/manifest.json')?>">
    
    
</head>
<body class="login-body">

  <div class="container-fluid">
    <div class="row">
    <div class="loader">
      <span class="load"></span>
    </div>
    </div>
        <div class="col-md-10 col-md-offset-1 card login-box">
          <div>
            
            <h1>IC PAYMENT</h1>
          </div>
          <div class="vertical-line"></div>
          <div>
            <form>
            
              <div class="form-group">
                 <label for="user-input">Usuario</label>
                 <input id="user-input" type="text" class="form-control">
              </div>
              <div class="form-group">
                 <label for="password-input">Contraseña</label>
                 <input id="password-input" type="password" class="form-control">
              </div>
              <p class="validation"></p>
              <input type="button" id="send-credentials" value="Ingresar">
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
  <script src="<?php echo base_url('assets/js/lib/jquery-3.2.1.min.js') ?>"></script>
  <script> 
    setTimeout(function() {
      $(".splash-screen").hide()
    }, 2500);
    
  </script>
  <script type="text/javascript" src="<?php echo base_url('assets/js/lib/sweetalert2.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/js/lib/bootstrap.min.js') ?>"> </script>
  <script type="text/javascript" src="<?php echo base_url('assets/js/lib/globals.js')?>"></script>
  <script type="text/javascript" src="<?php echo base_url('assets/js/ajax2.js')?>"></script>
</body>
</html>