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
      <input type="text" class="form-control searcher"  placeholder="Buscar cliente" v-model="search.text" @keypress.enter.stop="getData">
    </div>
    <div class="pull-right">
        <a href="#" title="vista en detalle" class="btn icon print-table"><i class="material-icons">remove_red_eye</i></a>
      </div>
    <div class="pull-right">
      <select  class="form-group filter btn btn-primary" v-model="search.state" @change="getData">
        <option value="activo">Activos</option>
        <option value="saldado">Saldados</option>
        <option value="">Todos</option>
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
      </tbody>
    </table>
    <div class="mini-card total">
    <h5> Vendido : {{totales.total_vendido | currencyFormat}}</h4>
    <h5 class="text-success"> Pagado : {{totales.pagado | currencyFormat}}    </h4>
    <h5> -------------------- </h4>
    <h5 class="text-danger"> Pendiente : {{totales.pendiente | currencyFormat}}</h4>
    </div>
  </div>


</div>