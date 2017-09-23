<div class="screen clients row">
  <div class="left-navigation col-md-2">
    <div class="aside-nav-container">
      <div class="left-navigation__header">
         <h3 class="left-navigation__header-text"><?php echo ucfirst($title) ?></h3>  
      </div>
      <ul class="aside-nav">
        <li class="aside-buttons">
          <a href="" data-toggle="modal" data-target="#new-client-modal"><i class="material-icons">supervisor_account</i> Nuevo Cliente</a>
        </li>
        <li class="aside-buttons">
          <a href="" id="update-client" data-toggle="modal" data-target="#update-client-modal"><i class="material-icons">edit</i>Editar Cliente</a>
        </li>
        <li class="aside-buttons"><a href="" id="delete-client"><i class="material-icons">delete</i>Eliminar Cliente</a></li>
        <li class="aside-buttons"><a href="" id="get-details"><i class="material-icons">find_in_page</i>Ver Detalles</a></li>
        <li class="aside-buttons"><a href="" id="client-new-contract"><i class="material-icons">description</i>  Nuevo Contrato</a></li>
      </ul>
    </div>

  </div>
  <div class="main-content col-md-10">
    <h2 class="subsection-title">Clientes</h2> 
    <div class="searcher-container main-toolbar" id="clients-toolbar">
      <div class="input-group search">
        <div class="input-group-addon"><i class="material-icons">search</i></div>
        <input type="text" class="form-control searcher"  placeholder="Busque cliente por cedula, nombre, apellidos o id">
      </div>
      <div class="pull-right">
        <a target="_blank" href="<?php echo base_url('process/getreport/clientes') ?>" class="btn icon print-table"><i class="material-icons">print</i></a>
      </div>
      <div class="pull-right">
        <select id="client-filter" class="form-group filter btn btn-dafault">
          <option value="todo">Todos</option>
          <option value="activo">Activos</option>
          <option value="no activo">No Activos</option>
          <option value="suspendido">Suspendidos</option>
          <option value="en corte">En corte</option>
          <option value="mora">Morosos</option>
        </select>  
      </div>
    </div>
    
    <table class="table t-clients" id="t-clients" 
      data-sort-order="asc" 
      data-search="true" 
      data-toolbar="#clients-toolbar"
      data-show-refresh="false"
      data-show-columns="false"
      data-show-export="false"
      data-minimum-count-columns="2" 
      data-show-pagination-switch="false"
      data-pagination="true" 
      data-id-field="id" 
      data-page-size="50" 
      data-page-list="[10,20,50,100,200]" 
      data-show-footer="false"
      data-click-to-select="true"
      data-single-select="true"
      data-striped="false",
      data-fixed="true">
      <thead>
      
        <tr>
          <th data-field="orden" data-sortable="true">No.</th>
          <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
          <th data-field="id" class="hide">ID #</th>
          <th data-field="nombres" data-sortable="true">Nombres</th>
          <th data-field="apellidos" data-sortable="true">Apellidos</th>
          <th data-field="cedula">Cedula</th>
          <th data-field="celular">Celular</th>
          <th data-field="estado" data-sortable="true">Estado</th>
          <th data-field="estadoreal" class="hide">Estado</th>
          <th data-field="nombre_completo" class="hide">Nombre Completo</th>
 
        </tr>
      </thead>
      <tbody>
        <?php $this->client_model->get_all_clients(); ?>
      </tbody>
    </table>
  </div>
</div>