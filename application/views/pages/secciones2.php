<div class="screen clients row">
  <div class="left-navigation col-md-2">
    <div class="aside-nav-container">
      <div class="left-navigation__header">
         <h3 class="left-navigation__header-text"><?php echo ucfirst($title) ?></h3>  
      </div>
      <ul class="aside-nav">
        <li class="aside-buttons">
          <a href="" data-toggle="modal" data-target="#new-client-modal"><i class="material-icons">add</i> Agregar Seccion</a>
        </li>
        <li class="aside-buttons">
          <a href="" id="update-client" data-toggle="modal" data-target="#update-client-modal"><i class="material-icons">edit</i>Editar Cliente</a>
        </li>
        <li class=""><a href="" id="delete-client"><i class="material-icons">add</i>Eliminar Cliente</a></li>
        <li class="aside-buttons"><a href="" id="get-details"><i class="material-icons">find_in_page</i>Ver Detalles</a></li>
        <li class="aside-buttons"><a href="" id="client-new-contract"><i class="material-icons">description</i>  Nuevo Contrato</a></li>
      </ul>
    </div>

  </div>
  <div class="main-content col-md-10">
    <h2 class="subsection-title">Clientes</h2> 
    <div class="searcher-container main-toolbar" id="section-toolbar">
      <div class="input-group search">
        <div class="input-group-addon"><i class="material-icons">search</i></div>
        <input type="text" class="form-control searcher"  placeholder="Busque cliente por cedula, nombre, apellidos o id">
      </div>
      <div class="pull-right">
        <a target="_blank" href="<?php echo base_url('process/getreport/clientes') ?>" class="btn icon print-table"><i class="material-icons">print</i></a>
      </div>
      <div class="pull-right">
        <select class="form-control btn btn-dafault" id="select-sector">
          <?php $this->section_model->get_sections_dropdown(); ?>
        </select>
      </div>
      <div class="pull-right">
        <select id="section-filter" class="form-group filter btn btn-dafault">
          <option value="['ocupado','disponible']">Todos</option>
          <option value="ocupado">ocupadas</option>
          <option value="disponible">disponibles</option>
        </select>  
      </div>
    </div>
    
    <table data-toggle="table" 
     class="table table-hovered t-sections innertable" id="t-sections" 
     data-sort-name="num" 
     data-toolbar="#section-toolbar"
     data-sort-order="asc"
     data-search="true" 
     data-minimum-count-columns="2" 
     data-pagination="true" 
     data-id-field="num" 
     data-page-size="50" 
     data-page-list="[10,20,50,100,250]" 
     data-show-footer="false">
      <thead>
        <tr>
          <th data-field="num" data-sortable="true">Num</th>
          <th data-field="checkbox"  data-checkbox="true" class= "hide"></th>
          <th data-field="sector" data-sortable="true">Sector</th>
          <th data-field="codigo" data-sortable="true">Codigo</th>
          <th data-field="ip" data-sortable="true">Direccion IP</th>
          <th data-field="estado" data-sortable="true">Estado</th>
        </tr>
      </thead>
      <tbody>
  
      </tbody>
    </table>
  </div>
</div>