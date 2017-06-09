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
          <h4 class="search-criteria">Presentado:<span class="presentado"> Todos </span>  (<span class="total-rows"></span>)</h4>
          <a  target="_blank" href="<?php echo base_url('process/getreport/averias') ?>" class="btn">Imprimir Reporte</a>
          <select name="" id="averias-view-mode">
            <option value="todos">--Enlistar --</option>
            <option value="todos">Todos</option>
            <option value="por reparar">Por Reparar</option>
            <option value="en proceso">En Proceso</option>
            <option value="reparado">Reparados</option>
            <option value="actuales">En Proceso y Por Reparar</option>
          </select>
        </div>
          
          <div class="averia-item-list">
         
            <?php $this->averia_model->get() ?>
         </div>
          
        </div>
        <div role="tabpanel" class="tab-pane" id="pagos">
        <div class="searcher-container clearfix">
          <h4 class="search-criteria">Instalaciones de Hoy </span>  (<?php echo $this->report_model->count_installations(); ?>)</h4>
           <a target="_blank" href="<?php echo base_url('process/getreport/installations') ?>" type="button" class="btn">Imprimir Reporte</a>
        </div>
         <div class="instalation-controls">
          
         </div>
          <?php $this->report_model->get_installations(); ?>
        </div>
        <div role="tabpanel" class="tab-pane" id="balance">
        <div class="searcher-container clearfix">
          <h4 class="search-criteria">Clientes en fecha de corte </span>  (<?php echo $this->report_model->count_moras_view(); ?>)</h4>
           <a target="_blank" href="<?php echo base_url('process/getreport/deudores') ?>" type="button" class="btn">Imprimir Reporte</a>
        </div>
          <?php $this->report_model->get_moras_view() ?>
        </div>
        </div>
      </div>

    </div>

    <!-- end of main tab-->
  </div>
</div>