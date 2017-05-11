<?php
ob_start( 'ob_gzhandler' );
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <title>IC Payment | <?php echo $title; ?></title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/bootstrap.min.css') ?>" />
    <link rel="stylesheet" href="<?php echo base_url('assets/css/main.css') ?>" />
    
    <link href="favicon.png" rel="icon" type="image/png"/>
</head>

<body>
    <header>
        
        <div class="header-top">
            <div class="user-div">
                <h5 class="username">Jesus Guerrero<span class="glyphicon glyphicon-user"></span></h5>
            </div>
        </div>
        <div class="header-low">
            <div class="brand">
                <h3>IC<span>Payment</span></h3>
            </div>
            <nav class="top-nav">
                <li class="navButton"><a href="">Lobby</a></li>
                <li class="navButton"><a href="<?php echo base_url('app/admin/clientes.php') ?>">Clientes</a></li>
                <li class="navButton"><a href="<?php echo base_url('app/admin/servicios.php') ?>"">Servicios</a></li>
                <li class="navButton"><a href="<?php echo base_url('app/admin/reportes.php') ?>"">Reportes</a></li>
            </nav>
            <nav class="user-controls">
                <li class="navButton"><a href="<?php echo base_url('app/admin/notificaciones.php') ?>" data-toggle="tooltip" data-placement="top" title="Notificaciones">
                    <i class="material-icons">notifications</i>
                </a></li>
                <li class="navButton"><a href="<?php echo base_url('app/admin/Administrador.php') ?>" data-toggle="tooltip" data-placement="top" title="Administrar">
                    <i class="material-icons">settings</i>
                </a></li>
                <li class="navButton"><a href="<?php echo base_url('app/admin/logout.php') ?>"  data-toggle="tooltip" data-placement="top" title="Cerrar Sesion">
                    <i class="material-icons">power_settings_new</i>
                </a></li>
            </nav>
        </div>
    </header>