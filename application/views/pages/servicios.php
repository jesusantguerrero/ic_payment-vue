<div class="screen clients row">
  <div class="left-navigation">
    <div class="aside-nav-container">
      <div class="left-navigation__header">
         <h3 class="left-navigation__header-text"><?php echo ucfirst($title) ?></h3>  
      </div>
      <ul class="aside-nav">
        <li class="aside-buttons">
          <a href="" data-toggle="modal" data-target="#new-service-modal"><i class="material-icons">add</i>  Nuevo Servicio</a>
        </li>
        <li class="aside-buttons"><a href="" id="edit-service"><i class="material-icons">edit</i>Editar Servico</a></li>
        <li class="aside-buttons"><a href="" id="delete-service"><i class="material-icons">delete</i>Eliminar Servicio</a></li>
        <li class="aside-buttons"><a href=""><i class="material-icons">find_in_page</i>Ver Detalles</a></li>
      </ul>
    </div>
  </div>
  <div class="main-content col-md-10">
  <h2 class="subsection-title">Servicios</h2> 
      <div class="searcher-container main-toolbar" id="toolbar">
        <div class="input-group search">
          <div class="input-group-addon"><i class="material-icons">search</i></div>
          <input type="text" class="form-control searcher"  placeholder="Buscar servicio">
        </div>
        <div class="pull-right">
          <select id="client-filter" class="form-group filter btn btn-dafault">
            <option value="todo">Todos</option>
            <option value="internet">Internet</option>
            <option value="reparacion">Reparacion</option>
          </select>  
        </div>
      </div>

      <table class="table t-services" id="t-services" 
        data-sort-name="orden"
        data-sort-order="asc" 
        data-search="true"
        data-toolbar="#toolbar" 
        data-show-refresh="false"
        data-show-columns="false"
        data-show-export="false"
        data-minimum-count-columns="2" 
        data-show-pagination-switch="false"
        data-pagination="true" 
        data-id-field="id" 
        data-page-size="20"
        data-page-list="[10, 20, 50, All]" 
        data-show-footer="false"
        data-striped="true"
        data-click-to-select="true"
        data-single-select="true">
        <thead>
          <tr>
            <th data-field="orden" data-sortable="true">No. </th>
            <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
            <th data-field="id" class="hide">ID #</th>
            <th data-field="nombre">Nombre</th>
            <th data-field="descripcion">Descripción</th>
            <th data-field="mensualidad">Mensualidad</th>
            <th data-field="tipo" data-sortable="true">Tipo</th>
          </tr>
        </thead>
        <tbody>
          <?php $this->service_model->get_all_services(); ?>
        </tbody>
      </table>

  </div>


</div>