<?php $user_data = get_user_data() ?>
<div class="screen reports row">
  <div class="col-md-12">
    <!-- main tab -->
    <div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#gastos" aria-controls="profile" role="tab" data-toggle="tab">Gastos</a></li>
        <li role="presentation"><a href="#cierres" aria-controls="messages" role="tab" data-toggle="tab">Cierres</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content mylists">

        <div role="tabpanel" class="tab-pane active" id="gastos">
          <div class="searcher-container main-toolbar" id="gastos-toolbar">
            <div class="input-group search">
              <div class="input-group-addon"><i class="material-icons">search</i></div>
              <input type="text" title="siempre presione enter para visulizar el total" class="form-control searcher"  placeholder=" descripcion o autor" v-model="between.text" @keypress.enter="getReport">
            </div>
            <div class="input-group search-item">
              <div class="input-group-addon"><i class="material-icons">event</i></div>
              <input type="date" class="form-control caja-for-date" v-model="between.first_date" @change="getReport" placeholder="Fecha">
              </div>
            <div class="input-group search-item">
              <div class="input-group-addon"><i class="material-icons">event</i></div>
              <input type="date" class="form-control caja-for-date" v-model="between.second_date" @change="getReport" placeholder="Fecha">
            </div>
            <div class="pull-right">
              <a target="_blank" href="<?php echo base_url('process/getreport/gastos')?>" class="btn icon print-table"><i class="material-icons">print</i></a>
            </div>
          </div>
          <table data-toggle="table" id="gastos-table"
            class="innertable table general-table"
            data-sort-name="contract" 
            data-sort-order="asc" 
            data-search="true"
            data-minimum-count-columns="2"
            data-toolbar="#gastos-toolbar"
            data-pagination="true" 
            data-id-field="contract" 
            data-page-size="500"
            data-page-list="[100,200,500, 1000, 2000, 5000, 8000]"
            data-show-footer="false">
            <thead>
              <tr>
                <th data-field="id_gasto" data-sortable="true" data-searchable="false">#Gasto COD</th>
                <th data-field="fecha" data-sortable="true" data-searchable="false">Fecha</th>
                <th data-field="descripcion" data-sortable="true">Descripcion</th>
                <th data-field="monto" data-sortable="true" style="width: 170px" data-searchable="false">Monto</th>
                <th data-field="autor" data-sortable="true">Autor</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>
          <div class="mini-card total" v-cloack><h4> Total : {{total | currencyFormat}}</h4></div>
        </div>

        <div role="tabpanel" class="tab-pane" id="cierres">
          <div class="searcher-container main-toolbar" id="cierres-toolbar">
            <div class="input-group search">
              <div class="input-group-addon"><i class="material-icons">search</i></div>
              <input type="text" class="form-control searcher"  v-model="between.text" @keypress.enter.stop="getReport" placeholder="cliente">
            </div>
            <div class="input-group search-item">
              <div class="input-group-addon"><i class="material-icons">event</i></div>
              <input type="date" class="form-control caja-for-date" v-model="between.first_date" @change="getReport" placeholder="Fecha">
              </div>
            <div class="input-group search-item">
              <div class="input-group-addon"><i class="material-icons">event</i></div>
              <input type="date" class="form-control caja-for-date" v-model="between.second_date" @change="getReport" placeholder="Fecha">
            </div>
            <div class="pull-right">
              <a target="_blank" href="<?php echo base_url('process/getreport/cierres') ?>" class="btn icon print-table"><i class="material-icons">print</i></a>
            </div>
          </div>
          <table data-toggle="table"  id="cierres-table"
           class="table general-table" 
           data-sort-name="num"
           data-sort-order="asc" 
           data-search="true"
            data-show-export="true" 
            data-minimum-count-columns="2" 
            data-toolbar="#cierres-toolbar"
            data-pagination="true" 
            data-id-field="payment" 
            data-page-size="500" 
            data-page-list="[100,200,500, 1000, 2000, 5000, 8000]"
            data-show-footer="false">
            <thead>
              <tr>
                <th data-field="id" data-sortable="true">ID</th>
                <th data-field="fecha" data-sortable="true">Fecha</th>
                <th data-field="p_banco" data-sortable="true">P. Facturas</th>
                <th data-field="p_extras" data-sortable="true">P. Extras</th>
                <th data-field="p_efectivo" data-sortable="true">P. Efectivo</th>
                <th data-field="p_banco" data-sortable="true">P. Banco</th>
                <th data-field="p_ingresos" data-sortable="true">T. Ingresos</th>
                <th data-field="efectivo_caja" data-sortable="true">Efe En Caja</th>
                <th data-field="descuadre" data-sortable="true">Descuadre</th>
                <th data-field="gastos" data-sortable="true">T. Gastos</th>
                <th data-field="banco" data-sortable="true">Banco</th>
                <th data-field="autor" data-sortable="true">Autor</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <br>
          <h4 class="section-title">Totales</h4>
          <table class="table total-table" v-if ="hasTotals">
            <thead class="bg-white">
              <tr class="bg-white">
                <th data-field="p_banco" data-sortable="true">P. Facturas</th>
                <th data-field="p_extras" data-sortable="true">P. Extras</th>
                <th data-field="p_efectivo" data-sortable="true">P. Efectivo</th>
                <th data-field="p_banco" data-sortable="true">P. Banco</th>
                <th data-field="p_ingresos" data-sortable="true">T. Ingresos</th>
                <th data-field="efectivo_caja" data-sortable="true">Efe En Caja</th>
                <th data-field="descuadre" data-sortable="true">Descuadre</th>
                <th data-field="gastos" data-sortable="true">T. Gastos</th>
                <th data-field="banco" data-sortable="true">Banco</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="total in totals"> {{ total | currencyFormat }}  </td>
              </tr>
            </tbody>
          </table>
          <br>
          <div class="text-center">
            <a target="_blank" href="<?php echo base_url('app/imprimir/cierre') ?>" class="btn icon print-table"><i class="material-icons">print</i></a>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- end of main tab-->
</div>
</div>