<div class="screen clients row">
  <div class="left-navigation col-md-2 no-print">
    <div class="aside-nav-container">
      <div class="left-navigation__header">
         <h3 class="left-navigation__header-text"><?php echo ucfirst($title) ?></h3>  
      </div>
      <ul class="aside-nav">
        <li class="aside-buttons">
          <a href="" data-toggle="modal" data-target="#new-client-modal" id="btn-add-section"><i class="material-icons">add</i> Agregar Seccion</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="main-content col-md-10">
  <div class="concepto t-center print-only"> <h4>Reporte de Secciones</h4></div>
    
  <div class="searcher-container main-toolbar" id="section-toolbar">
      <div class="input-group search">
        <div class="input-group-addon"><i class="material-icons">search</i></div>
        <input type="text" class="form-control searcher"  placeholder="Busqueda de IP">
      </div>
      <div class="pull-right">
        <button onclick="print()" class="btn btn-primary icon print-table"><i class="material-icons">print</i></button>
      </div>
      <div class="pull-right">
        <select class="form-control btn btn-primary" id="select-sector">
          <?php $this->section_model->get_sections_dropdown(); ?>
        </select>
      </div>
      <div class="pull-right">
        <select id="section-filter" class="form-group filter btn btn-primary">
          <option value="ocupado disponible">Todos</option>
          <option value="ocupado">ocupadas</option>
          <option value="disponible">disponibles</option>
        </select>  
      </div>
    </div>
    
    <table data-toggle="table" 
     class="table table-hovered t-sections" id="t-sections" 
     data-sort-name="num" 
     data-toolbar="#section-toolbar"
     data-sort-order="asc"
     data-search="true" 
     data-minimum-count-columns="2" 
     data-pagination="true" 
     data-id-field="num" 
     data-page-size="250" 
     data-page-list="[10,20,50,100,250]"
     data-click-to-select="true"  
     data-single-select= "true" 
     data-show-footer="false">
      <thead>
        <tr>
          <th data-field="num" data-sortable="true">Num</th>
          <th data-field="checkbox"  data-checkbox="true" class= "hide"></th>
          <th data-field="sector" data-sortable="true">Sector</th>
          <th data-field="codigo" data-sortable="true">Codigo</th>
          <th data-field="ip" data-sortable="true">Direccion IP</th>
          <th data-field="estado" data-sortable="true">Estado</th>
          <th data-field="actions" data-sortable="true">Acciones</th>
        </tr>
      </thead>
      <tbody>
  
      </tbody>
    </table>
  </div>
</div>