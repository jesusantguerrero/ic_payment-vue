<div class="screen clients row" id="extra-section">
  <div class="left-navigation">
     <div class="aside-nav-container">
        <div class="left-navigation__header">
          <h3 class="left-navigation__header-text">
            <?php echo ucfirst($title) ?>
          </h3>
        </div>
        <ul class="aside-nav">
          <li class="aside-buttons"><a href="" id="btn-pay-view"><i class="material-icons" >monetization_on</i>Registrar Pago</a></li>
        </ul>
      </div>
  </div>
  <div class="main-content col-md-10">
    <h2 class="subsection-title">Contratos</h2>
    <div class="searcher-container main-toolbar" id="extras-toolbar">
    <div class="input-group search">
      <div class="input-group-addon"><i class="material-icons">search</i></div>
      <input type="text" class="form-control searcher"  placeholder="Buscar cliente">
    </div>
    <div class="pull-right">
        <a href="#" title="vista en detalle" class="btn icon print-table"><i class="material-icons">remove_red_eye</i></a>
      </div>
    <div class="pull-right">
      <select id="client-filter" class="form-group filter btn btn-primary">
        <option value="activo">Activos</option>
        <option value="saldado">Saldados</option>
        <option value="activo saldado">Todos</option>
      </select>  
    </div>
  </div>

    <table class="table" id="extra-table-full"  
      data-sort-order="asc" 
      data-toolbar="#extras-toolbar"
      data-search="true" 
      data-show-refresh="false"
      data-show-columns="false"
      data-show-export="false"
      data-minimum-count-columns="2" 
      data-show-pagination-switch="false"
      data-pagination="true"
      data-id-field="id_extra" 
      data-page-size= "50"  
      data-page-list= "[10,20,50,100,200 ,300, 400, 500, 1000]" 
      data-show-footer="false" 
      data-click-to-select="true"
      data-single-select="true">
      
      <thead>
        <tr>
          <th data-field="controls"></th>
          <th data-field="id_extra" class="hide">COD</th>
          <th data-field="id_servicio" class="hide">SER</th>
          <th data-field="cliente">Cliente</th>
          <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
          <th data-field="fecha">Fecha</th>
          <th data-field="concepto">Concepto</th>
          <th data-field="ultimo_pago">Ultimo Pago</th>
          <th data-field="monto_pagado">Monto Pagado</th>
          <th data-field="deuda">Pendiente</th>
          <th data-field="monto_total">Monto Total</th>
          <th data-field="estado">Estado</th>
        </tr>
      </thead>
       <tbody>
       <?php echo $this->extra_model->get_all();?> 
      </tbody>
    </table>
  </div>


</div>