<?php $user_data = get_user_data() ?>
<div class="screen reports row">
  <div class="col-md-12">
    <!-- main tab -->
    <div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#averias" aria-controls="home" role="tab" data-toggle="tab">Lista de Averías</a></li>
        <li role="presentation"><a href="#pagos" aria-controls="profile" role="tab" data-toggle="tab">Instalaciones</a></li>
        <li role="presentation"><a href="#balance" aria-controls="messages" role="tab" data-toggle="tab">Deudores</a></li>
        <?php if(auth_user_type(0)):?>
        <li role="presentation"><a href="#recibos" aria-controls="messages" role="tab" data-toggle="tab">Pagos</a></li>
        <li role="presentation"><a href="#historial" aria-controls="messages" role="tab" data-toggle="tab">Historico de Moras</a></li>
        <?php endif;?>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content mylists">
        <div role="tabpanel" class="tab-pane active" id="averias">
          <div id="averias-list-view">
          <div class="searcher-container main-toolbar" :class="{hide:hide}" id="clients-toolbar">
            <div class="input-group search">
              <div class="input-group-addon"><i class="material-icons">search</i></div>
              <input type="text" class="form-control searcher" v-model="dataSearch.text" @keyup="search" placeholder="Busque averia por cliente">
            </div>
            <div class="pull-right">
              <a target="_blank" href="#" class="btn icon"><i class="material-icons">build</i><span class="total-rows"></span></a>
            </div>
            <div class="pull-right">
              <a target="_blank" href="<?php echo base_url('process/getreport/averias')?>" class="btn icon print-table"><i class="material-icons">print</i></a>
            </div>
            <div class="pull-right">
              <select id="averias-view-mode" class="form-group filter btn btn-dafault" v-model="dataSearch.state">
                <option value="por reparar">Por Reparar</option>
                <option value="reparado">Reparados</option>
                <option value="todos">Todos</option>
              </select>  
            </div>
          </div>
          <div class="averia-item-list" :class="{hide:hide}" id="averias-list">
            <?php $this->averia_model->get() ?>
          </div>
          </div>

          <div id="ticket-view" class="invisible" :class="{hide: classes.hide}">
            <div class="screen">
              <h4>{{ ticket.cliente }}</h4>
            </div>
            <button class="btn">Agregar</button>
          </div>
          
        </div>

        <div role="tabpanel" class="tab-pane" id="pagos">
          <div class="searcher-container clearfix">
            <h4 class="search-criteria">Instalaciones de Hoy </span> (
              <?php echo $this->report_model->count_installations(); ?> )</h4>
            <a target="_blank" href="<?php echo base_url('process/getreport/installations') ?>" type="button" class="btn">Imprimir Reporte</a>
           <select name="" id="installations-view-mode">
            <option value="por instalar">Por Instalar</option>
            <option value="instalado">Instalados</option>
            <option value="todos">Todos</option>
          </select>
          </div>
          <div class="instalation-controls">

          </div>
          <div class="averia-item-list" id="installations-list">

            <?php $this->report_model->get_installations_list();?>
          </div>
          
        </div>
        <div role="tabpanel" class="tab-pane" id="balance">
          <div class="searcher-container clearfix" id="moras-toolbar">
            <h4 class="search-criteria">Clientes en fecha de corte </span> (
              <?php echo $this->report_model->count_moras_view(); ?> )</h4>
            <a target="_blank" href="<?php echo base_url('process/getreport/deudores') ?>" type="button" class="btn">Imprimir Reporte</a>
          </div>
          <table data-toggle="table" 
            class="innertable general-table" 
            data-sort-name="cliente" 
            data-sort-order="asc" 
            data-search="true" 
            data-show-refresh="false"
            data-show-columns="false" 
            data-show-export="false" 
            data-minimum-count-columns="2"
            data-toolbar="#moras-toolbar"
            data-pagination="true" 
            data-id-field="contrato" 
            data-page-size="50" 
            data-page-list="[10,20,50, 100,200,500]" 
            data-show-footer="false">
            <thead>
              <tr>
                <th data-field="contrato" data-sortable="true">Contrato</th>
                <th data-field="cliente" data-sortable="true">Cliente</th>
                <th data-field="celular" data-sortable="true">Celular</th>
                <th data-field="cuota" data-sortable="true">Cuota</th>
                <th data-field="mora" data-sortable="true">Mora</th>
                <th data-field="extra" data-sortable="true">Extra</th>
                <th data-field="total" data-sortable="true">Total</th>
                <th data-field="pagos_pendiente" data-sortable="true">Pagos Pendientes</th>
                <th data-field="meses" data-sortable="true">Meses</th>
              </tr>
            </thead>
            <tbody>
              <?php $this->report_model->get_moras_view()?>
            </tbody>
          </table>
        </div>
        
         <?php if(auth_user_type(0)):?>
         
        <div role="tabpanel" class="tab-pane" id="recibos">
          <div class="searcher-container clearfix" id="pagos-toolbar">
            <h4 class="search-criteria">Historial de pagos</span>
            <a target="_blank" href="<?php echo base_url('process/getreport/deudores') ?>" type="button" class="btn">Imprimir Reporte</a>
          </div>
          <table data-toggle="table" 
            class="innertable general-table" 
            data-sort-name="num" 
            data-sort-order="asc" 
            data-search="true" 
            data-show-refresh="true"
            data-show-columns="true" 
            data-show-export="true" 
            data-minimum-count-columns="2"
            data-toolbar="#pagos-toolbar"
            data-pagination="true" 
            data-id-field="payment" 
            data-page-size="500" 
            data-page-list="[100,200,500, 1000, 2000, 5000, 8000]" 
            data-show-footer="false">
            <thead>
              <tr>
                <th data-field="num" data-sortable="true">Num</th>
                <th data-field="payment" data-sortable="true" class="hide">Pago</th>
                <th data-field="contract" data-sortable="true">Cont</th>
                <th data-field="client" data-sortable="true">Cliente</th>
                <th data-field="service" data-sortable="true">Servicio</th>
                <th data-field="concept" data-sortable="true">Concepto</th>
                <th data-field="total" data-sortable="true">Total</th>
                <th data-field="fecha" data-sortable="true">Fecha</th>
                <th data-field="hours" data-sortable="true">Hora</th>
              </tr>
            </thead>
            <tbody>
              <?php $this->report_model->get_recibos(); ?>
            </tbody>
          </table>
        </div>

        <div role="tabpanel" class="tab-pane" id="historial">
          <div class="searcher-container clearfix" id="history-toolbar">
            <h4 class="search-criteria">Historial de moras</span>
            <a target="_blank" href="<?php echo base_url('process/getreport/deudores') ?>" type="button" class="btn">Imprimir Reporte</a>
          </div>
          <table data-toggle="table" class="innertable general-table" 
            data-sort-name="num" 
            data-sort-order="asc" 
            data-search="true" 
            data-show-refresh="true"
            data-toolbar="#history-toolbar"
            data-show-columns="true"
            data-show-export="true" 
            data-minimum-count-columns="2"
            data-pagination="true" 
            data-id-field="payment"
            data-page-size="20" 
            data-page-list="[10,20,50, All]" 
            data-show-footer="false">
            <thead>
              <tr>
                <th data-field="num" data-sortable="true">Num</th>
                <th data-field="payment" data-sortable="true">Contrato</th>
                <th data-field="client" data-sortable="true">Cliente</th>
                <th data-field="celphone" data-sortable="true">Celular</th>
                <th data-field="cuota" data-sortable="true">Cuota</th>
                <th data-field="mora">Mora</th>
                <th data-field="extra">Extra</th>
                <th data-field="total" >Total</th>
                <th data-field="fecha">Fecha Limite</th>
              </tr>
            </thead>
            <tbody>
              <?php $this->report_model->get_history(); ?>
            </tbody>
          </table>
        </div>
        <?php endif;?>
      </div>
    </div>

  </div>

  <!-- end of main tab-->
</div>
</div>