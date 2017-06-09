<div class="screen reports row">
  <div class="col-md-12">
    <!-- main tab -->
    <div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#ingresos" aria-controls="home" role="tab" data-toggle="tab">Lista de Averías</a></li>
        <li role="presentation"><a href="#pagos" aria-controls="profile" role="tab" data-toggle="tab">Instalaciones</a></li>
        <li role="presentation"><a href="#balance" aria-controls="messages" role="tab" data-toggle="tab">Deudores</a></li>
        
      </ul>

      <!-- Tab panes -->
      <div class="tab-content mylists">
        <div role="tabpanel" class="tab-pane active" id="ingresos">
         <div class="searcher-container clearfix">
          <h4 class="search-criteria">Presentado: Todos</h4>
          <a data-toggle="modal" data-target="#retire-money-modal" class="btn">Imprimir Reporte</a>
          <button class="btn" data-toggle="modal" data-target="#add-money-modal">Color</button>
          <select name="" id="">
          <option value="">--Enlistar --</option>
            <option value="">Todos</option>
            <option value="">Por Reparar</option>
            <option value="">En Proceso</option>
            <option value="">Reparados</option>
            <option value="">En Proceso y Por Reparar</option>
          </select>
        </div>
          
          <div class="averia-item-list">
            <div class="averia-item">
            <div class="top-row">
              <div class="status"><i class="material-icons">check_box_outline_blank</i><small>Por Resolver</small></div>
              <div class="code">1</div>
              <div class="client-name">Jesus Antonio Guerrero Alvarez</div>
              <div class="client-direction">C/ Primera #12 Barrio George, La Romana</div>
              <button>Actualizar</button>
            </div>
            <div class="description">
              <div class="date">2017-6-9</div>
              <div class="title-item">Falla De Conexion:</div>
              <div class="text">Una falla de que se yo para que se yo que tiene que se yo y todo lo que no se yo</div>
            </div>
          </div>
           <div class="averia-item">
            <div class="top-row">
              <div class="status"><i class="material-icons">check_box_outline_blank</i><small>Por Resolver</small></div>
              <div class="code">1</div>
              <div class="client-name">Jesus Antonio Guerrero Alvarez</div>
              <div class="client-direction">C/ Primera #12 Barrio George, La Romana</div>
              <button>Actualizar</button>
            </div>
            <div class="description">
              <div class="date">2017-6-9</div>
              <div class="title-item">Falla De Conexion:</div>
              <div class="text">Una falla de que se yo para que se yo que tiene que se yo y todo lo que no se yo</div>
            </div>
          </div>
         </div>
          
        </div>
        <div role="tabpanel" class="tab-pane" id="pagos">
        
         <div class="instalation-controls">
           <a target="_blank" href="<?php echo base_url('process/getreport/installations') ?>" type="button" class="btn btn-large btn-block btn-default">Imprimir Reporte</a>
         </div>
          <?php $this->report_model->get_installations(); ?>
        </div>
        <div role="tabpanel" class="tab-pane" id="balance">
          <div class="instalation-controls">
           <a target="_blank" href="<?php echo base_url('process/getreport/deudores') ?>" type="button" class="btn btn-large btn-block btn-default">Imprimir Reporte</a>
         </div>
          <?php $this->report_model->get_moras_view() ?>
        </div>
        </div>
      </div>

    </div>

    <!-- end of main tab-->
  </div>
</div>