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
          <div class="mini-card total"><h4> Total : {{total | currencyFormat}}</h4></div>
        </div>

        <div role="tabpanel" class="tab-pane" id="cierres">
          <div class="searcher-container main-toolbar" id="recibos-toolbar">
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
              <a target="_blank" href="<?php echo base_url('process/getreport/recibos') ?>" class="btn icon print-table"><i class="material-icons">print</i></a>
            </div>
          </div>
          <table data-toggle="table"  id="receipts-table"
           class="innertable table general-table" 
           data-sort-name="num"
           data-sort-order="asc" 
           data-search="true"
            data-show-export="true" 
            data-minimum-count-columns="2" 
            data-toolbar="#recibos-toolbar"
            data-pagination="true" 
            data-id-field="payment" 
            data-page-size="500" 
            data-page-list="[100,200,500, 1000, 2000, 5000, 8000]"
            data-show-footer="false">
            <thead>
              <tr>
                <th data-field="num" data-sortable="true">Num</th>
                <th data-field="payment" data-sortable="true" class="hide">Pago</th>
                <th data-field="contract" data-sortable="true">Cont</th>
                <th data-field="client" data-sortable="true">Cliente</th>
                <th data-field="service" data-sortable="true">Servicio</th>
                <th data-field="concept" data-sortable="true">Concepto</th>
                <th data-field="total" data-sortable="true">Total</th>
                <th data-field="fecha" data-sortable="true">Fecha</th>
                <th data-field="hours" data-sortable="true">Hora</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <div class="mini-card total"><h4> Total : {{total | currencyFormat}}</h4></div>
        </div>
      </div>
    </div>

  </div>

  <!-- end of main tab-->
</div>
</div>