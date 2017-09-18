<div class="screen clients row">
  <div class="left-navigation">
     <div class="aside-nav-container">
        <div class="left-navigation__header">
          <h3 class="left-navigation__header-text">
            <?php echo ucfirst($title) ?>
          </h3>
        </div>
        <ul class="aside-nav">
          <li class="aside-buttons"><a href="" data-toggle="modal" data-target="#search-client-modal"><i class="material-icons">description</i>  Nuevo Contrato</a></li>
          <li class="aside-buttons"><a href="" id="btn-update-contract"><i class="material-icons">edit</i>Editar Contrato</a></li>
          <li class="aside-buttons"><a href="" id="btn-cancel-contract"><i class="material-icons" >delete</i>Cancelar Contrato</a></li>
          <li class="aside-buttons"><a href="" id="btn-suspend-contract"><i class="material-icons" >report_problem</i>Suspender</a></li>
          <li class="aside-buttons"><a href="" target="_black" id="btn-see-contract"><i class="material-icons" >description</i>Imprimir Contrato</a></li>
          <li class="aside-buttons"><a href="" id="btn-pay-view"><i class="material-icons" >monetization_on</i>Registrar Pago</a></li>
          <li class="aside-buttons"><a href="" id="btn-add-extra"><i class="material-icons" >more</i>Extras</a></li>
        </ul>
      </div>
  </div>
  <div class="main-content col-md-10">
    <h2 class="subsection-title">Contratos</h2>
    <div class="searcher-container main-toolbar" id="toolbar">
    <div class="input-group search">
      <div class="input-group-addon"><i class="material-icons">search</i></div>
      <input type="text" class="form-control searcher"  placeholder="Buscar contrato">
    </div>
    <div class="pull-right">
      <select id="client-filter" class="form-group filter btn btn-dafault">
        <option value="activos">Activos</option>
      </select>  
    </div>
  </div>

    <table class="table table-hovered t-contracts" id="t-contracts" 
      data-sort-name= "id"  
      data-minimum-count-columns= "2"  
      data-search="true"
      data-toolbar="#toolbar"
      data-pagination="true"  
      data-id-field= "id"  
      data-page-size= "50"  
      data-page-list= "[10,20,50,100,200 ,300, 400, 500, 1000]"  
      data-show-footer= false  
      data-click-to-select="true"  
      data-single-select= "true" 
      data-stripped= "false">
      <thead>
        <tr>
          <th data-field= "id"  data-sortable= true  data-title-tooltip= "codigo" >Cod</th>
          <th data-field="checkbox"  data-checkbox="true" class= "hide"></th>
          <th data-title-tooltip= "codigo corto de ip"  data-field= "ip">IP</th>
          <th data-field= "cliente"  data-title-tooltip= "Nombre del cliente">Cliente</th>
          <th data-field= "fecha_inicio"  data-title-tooltip= "Fecha de inicio del contrato">Fecha Inicio</th>
          <th data-field= "servicio"  data-title-tooltip= "servicio">Servicio</th>
          <th data-field= "meses"  data-title-tooltip= "Duracion en meses del contrato">Meses</th>
          <th data-field= "fecha_inicio"  data-title-tooltip= "Fecha del ultimo pago">Ultimo Pago</th>
          <th data-field= "proximo_pago"  data-title-tooltip= "Fecha del Proximo Pago">Proximo Pago</th>
          <th data-field= "monto_pagado"  data-title-tooltip= "Monto pagado del contrato">Monto Pagado</th>
          <th data-field= "monto_total"  data-title-tooltip= "Monto Total">Monto Total</th>
          <th data-field= "id_cliente"  class= "hide">ID Cliente</th>
          <th data-field= "cedula"  class= "hide">Cedula</th>
        </tr>
        
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>


</div>