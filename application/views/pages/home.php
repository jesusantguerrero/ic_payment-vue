<div class="container-fluid">
    <?php $user_data = get_user_data(); ?>
    <div class="row welcome-screen">
        <div class="col-md-8 col-xs-12 main-card">
            <h3> </h3>
            <div class="row">
                <div class="company-data">
                    <img class="company-logo" src="<?php echo base_url('assets/img/icsservice_logo.svg') ?>" alt="">
                </div>
                <div class="welcome-data">
                    <div class="row">
                        <div class="col-md-6 without-padding">
                            <h4>ICS Services</h4>
                            <h4>Bienvenido
                                <?php echo $user_data['name'] ?>
                            </h4>


                        </div>
                        <div class="col-md-5 col-xs-6 date-container">
                            <p class="day"></p>
                            <p class="month-year"></p>
                            <span class="dayweek"></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-md-4 col-xs-12 details-card">
            <div class="layout-container">
                <div class="pagos-layer">
                    <h3 class="card-title" data-toggle="modal" data-target="#notification-view">Proximos Pagos</h3>
                    <div class="placeholder-icon"><i class="material-icons icon-placeholder">notifications_active</i></div>
                    <div class="list-nextpayments">
                        <?php $this->payment_model->get_next_payments(); ?>
                    </div>
                    <div class="centered-container-small hidden-xs">
                        <a href="<?php echo base_url('app/admin/clientes') ?>" class="btn btn-remark search-client">Buscar Cliente</a>
                    </div>
                </div>
                <div class="averias-layer">
                    <h3 class="card-title" data-toggle="modal" data-target="#notification-view">Caja Chica</h3>
                    <div class="placeholder-icon"><i class="material-icons icon-placeholder">money</i></div>
                    <div class="list-repair centered-container">
                        <?php  $last_saldo = $this->caja_chica_model->get_last_saldo(); ?>
                        <h2 class="current-saldo"><?php echo "RD$ ".CurrencyFormat($last_saldo); ?></h2>
                    </div>
                </div>
                <div class="deudores-layer">
                    <h3 class="card-title" data-toggle="modal" data-target="#notification-view">Lista de Deudores</h3>
                    <div class="placeholder-icon"><i class="material-icons icon-placeholder">money_off</i></div>
                    <div class="list-nextpayments">
                        <?php $this->payment_model->get_moras_home(); ?>
                    </div>
                    <div class="centered-container-small hidden-xs">
                        <a href="<?php echo base_url('app/admin/clientes') ?>" class="btn btn-remark search-client">Buscar Cliente</a>
                    </div>
                </div>

                <div class="day-income-layer">
                    <h3 class="card-title" data-toggle="modal" data-target="#notification-view">Ganancias del dia</h3>
                    <div class="list-repair centered-container">
                        <?php  $day_income = $this->payment_model->day_income("today"); ?>
                        <?php $abonos_all = $this->report_model->get_total_abonos(); ?>

                        <a target="_blank" href="<?php echo base_url('process/getreport/payment/today') ?>">
                        <h2 class="current-saldo"><?php echo "RD$ ".CurrencyFormat($day_income); ?></h2></a>
                        <br>
                        <h4>-- Abonos Actuales --</h4>
                        <a target="_blank" href="<?php echo base_url('process/getreport/abonos') ?>">
                            <h2 class="current-saldo"><?php echo "RD$ ".CurrencyFormat($abonos_all); ?></h2></a>
                        <br>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="row home-options-container">
        <div class="col-md-8 hidden-xs shortcuts-container">
            <div class="col-md-4 shortcut" id="caller-new-client" data-toggle="modal" data-target="#new-client-modal">
                <i class="material-icons">supervisor_account</i>
                <p class="section-title">Nuevo Cliente</h4>
            </div>
            <div class="col-md-4 shortcut" data-toggle="modal" data-target="#search-client-modal">
                <i class="material-icons">library_books</i>
                <p class="section-title">Nuevo Contrato</h3>
            </div>
            <div class="col-md-4 shortcut" data-toggle="modal" data-target="#search-client-modal">
                <i class="material-icons">monetization_on</i>
                <p class="section-title">Registrar Pago</h4>
            </div>
            <div class="col-md-4 shortcut" id="caller-new-client" data-toggle="modal" data-target="#add-extra-modal">
                <i class="material-icons">more</i>
                <p class="section-title">Servicio Extra</p>
            </div>
        </div>
        <div class="col-md-4 clock-card">
            <h3 class="card-title t-center">Hora</h3>
            <h4 class="hour h3-4 t-center"><span></span></h4>
        </div>

    </div>

</div>