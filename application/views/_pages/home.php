<div class="container-fluid">
 <?php $user_data = get_user_data(); ?>
    <div class="row welcome-screen">
        <div class="col-md-8 main-card">
            <h3 class="card-title">Panel Principal</h3>
            <div class="row">
                <div class="company-data">
                    <img class="company-logo" src="<?php echo base_url('assets/img/insanecode_logo.png') ?>" alt="">
                </div>
                <div class="welcome-data">
                    <h4 class="writtings">Bienvenido a IC Payment, <?php echo $user_data['name'] ?></h4>
                    <div class="row">
                        <div class="col-md-7 without-padding">
                            <p class="company-name h3-4"><b>Empresa:</b> ICS Services</p>
                            <p class="hour h3-4"><b>Hora:</b> <span></span></p>                       
                        </div>
                        <div class="col-md-4 date-container">
                            <p class="day"></p>
                            <p class="month-year"></p>
                            <span class="dayweek">Lunes</span>                           
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="col-md-4 details-card">
            <h3 class="card-title">Proximos Pagos</h3>
            <div class="placeholder-icon"><i class="material-icons icon-placeholder">notifications_active</i></div>
            <div class="list-nextpayments"></div>
            <button class="btn btn-remark search-client">Buscar Cliente</button>
        </div>
    </div>
    <div class="row shortcuts-container">
        <div class="col-md-4 shortcut"  id="caller-new-client" data-toggle="modal" data-target="#new-client-modal">
            <i class="material-icons">supervisor_account</i>
            <p class="section-title">Nuevo Cliente</h4>
        </div>
        <div class="col-md-4 shortcut">
            <i class="material-icons">library_books</i>
            <p class="section-title">Nuevo Contrato</h>
        </div>
        <div class="col-md-4 shortcut">
            <i class="material-icons">monetization_on</i>
            <p class="section-title">Registrar Pago</h4>
        </div>
         <div class="col-md-4 shortcut">
            <i class="material-icons">more</i>
            <p class="section-title">Servicio Extra</p>
        </div>
    </div>
</div>
