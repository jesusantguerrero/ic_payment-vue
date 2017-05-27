<div class="container-fluid">
 <?php $user_data = get_user_data(); ?>
    <div class="row welcome-screen">
        <div class="col-md-8 main-card">
            <h3> </h3>
            <div class="row">
                <div class="company-data">
                    <img class="company-logo" src="<?php echo base_url('assets/img/icsservice_logo.svg') ?>" alt="">
                </div>
                <div class="welcome-data">
                    <div class="row">
                        <div class="col-md-6 without-padding">
                            <h4>ICS Services</h4>
                            <h4>Bienvenido <?php echo $user_data['name'] ?></h4>
                            
                                               
                        </div>
                        <div class="col-md-5 date-container">
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
    <div class="row">
        <div class="col-md-8 shortcuts-container">
            <div class="col-md-4 shortcut"  id="caller-new-client" data-toggle="modal" data-target="#new-client-modal">
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
             <div class="col-md-4 shortcut">
                <i class="material-icons">more</i>
                <p class="section-title">Servicio Extra</p>
            </div>
        </div>
        <div class="col-md-4 clock-card">
            <h3 class="card-title t-center" >Hora</h3>
            <h4 class="hour h3-4 t-center"><span></span></h4>  
        </div>
       
    </div>
          
</div>
