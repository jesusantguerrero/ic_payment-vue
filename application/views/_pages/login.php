<?php
ob_start( 'ob_gzhandler' );
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <title>IC Payment | <?php echo $title; ?></title>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
    <link rel="stylesheet" href="<?php echo base_url('assets/css/main.css') ?>" />
    <link href="favicon.png" rel="icon" type="image/png"/>
</head>
<body class="login-body">

  <div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1 card login-box">
          <div>
            <h1>IC PAYMENT</h1>
          </div>
          <div class="vertical-line"></div>
          <div>
            <form action="">
              <div class="form-group">
                 <label for="userInput">Usuario</label>
                 <input id="userInput" type="text" class="form-control">
              </div>
              <div class="form-group">
                 <label for="passwordInput">Contraseña</label>
                 <input id="passwordInput" type="password" class="form-control">
              </div>
                  <input type="submit" value="Ingresar">
            </form>

          </div>

        </div>
    </div>
  </div>

  <script src="<?php echo base_url('assets/js/jquery-3.2.1.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/js/bootstrap.min.js') ?>"> </script>
</body>
</html>