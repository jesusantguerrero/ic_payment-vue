<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <title>.:: IC Payment | <?php echo ucfirst($title); ?> ::.</title>
    <link rel="stylesheet" href="<?php echo base_url('assets/css/material-icons.css') ?>">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/bootstrap.min.css') ?>" />
    <link rel="stylesheet" href="<?php echo base_url('assets/css/main.css') ?>" />
    <link rel="stylesheet" href="<?php echo base_url('assets/css/print.css') ?>" media='print' />
    <script type="text/javascript" src="<?php echo base_url('assets/js/jquery-3.2.1.min.js') ?>"></script>
    <script type="text/javascript" src="<?php echo base_url('assets/js/moment.min.js') ?>"></script>
    <script type="text/javascript" src="<?php echo base_url('assets/js/Chart.js') ?>"></script>
    <script type="text/javascript" src="<?php echo base_url('assets/js/currencyFormat.js') ?>"></script>
    <script type="text/javascript" src="<?php echo base_url('assets/js/bootstrap.min.js') ?>"></script>
    <link rel="icon" type="image/png" sizes="96x96" href="<?php  echo base_url('/favicon-96x96.png')?>">
    <link rel="manifest" href="<?php  echo base_url('/manifest.json')?>">


</head>
<header>
    <?php $user_data = get_user_data(); 
          $notifications = $this->report_model->count_moras_view();
    ?>

    <div class="header-low">
        <div class="brand">
            <a href="<?php echo base_url() ?>">
                <h3>IC<span>Payment</span></h3>
            </a>
        </div>
        <nav class="top-nav">
            <li class="navButton"><a href="<?php echo base_url('app/admin/home') ?>">Lobby</a></li>
            <li class="navButton"><a class="<?php if($title == 'clientes')  echo " active "?>" href="<?php echo base_url('app/admin/clientes') ?>">Clientes</a></li>
            <li class="navButton"><a class="<?php if($title == 'servicios') echo " active " ?>" href="<?php echo base_url('app/admin/servicios') ?>">Servicios</a></li>
            <li class="navButton"><a class="<?php if($title == 'contratos') echo " active " ?>" href="<?php echo base_url('app/admin/contratos') ?>">Contratos</a></li>
            <?php if($user_data['type'] == 0): ?>
            <li class="navButton"><a class="<?php if($title == 'reportes') echo " active "?>" href="<?php echo base_url('app/admin/reportes') ?>">Reportes</a></li>
            <?php endif; ?>
        </nav>
        <div class="user-div">
            <nav class="user-controls">
                <li class="navButton">
                    <a href="<?php echo base_url('app/admin/notificaciones')?>" data-toggle="tooltip" data-placement="bottom" title="Notificaciones">
                        <i class="material-icons">notifications</i>
                    </a> <?php if ($notifications > 0): ?> 
                        <span class="badge"><?php echo $notifications ;?></span>
                        <?php endif; ?>
                    </li>
                <li class="navButton">
                    <a  href="" data-toggle="modal" data-target="#retire-money-modal"   data-placement="bottom" title="Caja Chica">
                        <i class="material-icons">add_shopping_cart</i>
                    </a></li>
                <li class="navButton">
                    <a href="" data-target="#new-averia-modal" data-toggle="modal" data-placement="bottom" title="Reportes">
                        <i class="material-icons">assignment</i>
                    </a></li>

            </nav>
            <h5 class="user-name">
                <?php echo $user_data['name'];?>
            </h5>
            <div class="dropdown mymenu">
                <a id="dLabel" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <div class="profile-picture">
                        <span><?php echo $user_data['name'][0].$user_data['lastname'][0] ?></span>
                    </div>
                    <span class="caret"></span>
                </a>

                <?php echo $tooltip; ?>
            </div>

        </div>
    </div>
</header>