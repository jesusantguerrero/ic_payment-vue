<div class="screen clients row">
  <?php 

  ?>

  <div class="main-content detalles col-md-12">

    <div class="row">
      <div class="col-xs-6 col-md-3 center-row  no-print">
        <div class="page-header">
          <h3>Cobertura y Secciones</h3>
        </div>

        <div class="client-profile">
          <span><i class="material-icons">signal_wifi_4_bar</i></span>
        </div>

        <div class="payment-controls visible">
          <div class="input-group">
            <span class="input-group-addon" id="addon">Seccion </span>
            <select class="form-control" id="select-sector">
              <?php $this->section_model->get_sections_dropdown(); ?>
            </select>
          </div>
          <br><br>
          <button class="btn" id="btn-add-section">Agregar Seccion</button>
        </div>
      </div>
      <div class="col-md-9">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist" id="main-tabs">
            <li role="presentation" class="active">
              <a href="#payments" aria-controls="messages" role="tab" data-toggle="tab">IP's De Seccion</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">

            <!---->
            <div role="tabpanel" class="tab-pane detail-panel fade in  active" id="payments">
              <div class="concepto t-center print-only"> <h4>Reporte de Secciones</h4></div>

              <div id="toolbar">
                <button id="btn-print-sections" class="btn btn-primary pull-right">Imprimir</button>
                <select id="filter-sections" class="btn btn-primary pull-right">
                  <option value="['ocupado','disponible']">Todos</option>
                  <option value="ocupado">ocupadas</option>
                  <option value="disponible">disponibles</option>
                </select>
              </div>

              <table data-toggle="table" 
              class="t-sections innertable" 
              id="t-sections" 
              data-sort-name="num" 
              data-toolbar="#toolbar"
              data-sort-order="asc"
              data-search="true" 
              data-minimum-count-columns="2" 
              data-pagination="true" 
              data-id-field="num" 
              data-page-size="250" 
              data-page-list="[10,20,50,100,250]" 
              data-click-to-select="true"  
              data-single-select= "true"
              data-show-footer="false"
              data-response-handler="responseHandler">
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

        </div>

      </div>
    </div>
  </div>

</div>