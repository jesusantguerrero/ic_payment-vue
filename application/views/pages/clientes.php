<div class="screen clients row">
  <div class="left-navigation col-md-2">
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
  <div class="main-content col-md-10">
    <h2 class="subsection-title">Clientes</h2> 
    <div class="searcher-container">
      <input type="text" class="searcher" id="client-searcher" placeholder="Busque cliente por cedula, nombre, apellidos o id">
    </div>
    
    <table class="table innertable t-clients" id="t-clients" data-sort-name="id-contrato"
      data-sort-order="asc" 
      data-search="false" 
      data-show-refresh="false"
      data-show-columns="false"
      data-show-export="false"
      data-minimum-count-columns="2" 
      data-show-pagination-switch="false"
      data-pagination="true" data-id-field="id-contrato" 
      data-page-size="5" data-page-list="[5]" 
      data-show-footer="false"
      data-striped="true"
      data-click-to-select="true"
      data-single-select="true">
      <thead>
        <tr>
          <th data-field="orden">No.</th>
          <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
          <th data-field="id">ID #</th>
          <th data-field="nombres">Nombres</th>
          <th data-field="apellidos">Apellidos</th>
          <th data-field="cedula">Cedula</th>
          <th data-field="celular">Celular</th>
          <th data-field="estado">Estado</th>
        </tr>
      </thead>
      <tbody>
        <?php $this->client_model->get_all_clients(); ?>
      </tbody>
    </table>
  </div>
</div>