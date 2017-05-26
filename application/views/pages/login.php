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
    <link rel="stylesheet" href="<?php echo base_url('assets/css/main.css') ?>" />
    
    <link rel="icon" type="image/png" sizes="32x32" href="<?php  echo base_url('/favicon-32x32.png')?>">
    <link rel="icon" type="image/png" sizes="96x96" href="<?php  echo base_url('/favicon-96x96.png')?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php  echo base_url('/favicon-16x16.png')?>">
    
</head>
<body class="login-body">

  <div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1 card login-box">
          <div>
            <!--<img src="<?php echo base_url('assets/img/icpayment_logo_alter.svg') ?>" alt="">-->
            <h1>IC PAYMENT</h1>
          </div>
          <div class="vertical-line"></div>
          <div>
            <form action="<?php echo base_url('app/login') ?>" method='post'>
              <div class="form-group">
                 <label for="user-input">Usuario</label>
                 <input name="user-input" type="text" class="form-control">
              </div>
              <div class="form-group">
                 <label for="password-input">Contraseña</label>
                 <input name="password-input" type="password" class="form-control">
              </div>
                  <input type="submit" value="Ingresar">
            </form>

          </div>

        </div>
    </div>
    <div class="copyrights">
      <p>Code and Design by Insane Code-Jesus Guerrero</p>
      <p>2017 &copy; All Rights Reserved</p>
    </div>
  </div>

  <script src="<?php echo base_url('assets/js/jquery-3.2.1.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/js/bootstrap.min.js') ?>"> </script>
</body>
</html>