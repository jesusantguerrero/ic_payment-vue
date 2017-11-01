<?php $user_data = get_user_data() ?>
<div class="screen reports row">
  <div class="col-md-12">
    <!-- main tab -->
    <div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#averias" aria-controls="home" role="tab" data-toggle="tab">Lista de Averías</a></li>
        <li role="presentation"><a href="#pagos" aria-controls="profile" role="tab" data-toggle="tab">Instalaciones</a></li>
        <li role="presentation"><a href="#retiros" aria-controls="profile" role="tab" data-toggle="tab">Retiros</a></li>
        <li role="presentation"><a href="#balance" aria-controls="messages" role="tab" data-toggle="tab">Deudores</a></li>
        <?php if(auth_user_type(0)):?>
        <li role="presentation"><a href="#recibos" aria-controls="messages" role="tab" data-toggle="tab">Pagos</a></li>
        <li role="presentation"><a href="#historial" aria-controls="messages" role="tab" data-toggle="tab">Historico de Moras</a></li>
        <?php endif;?>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content mylists">
        <div role="tabpanel" class="tab-pane active" id="averias">
          <div id="averias-list-view">
            <div class="searcher-container main-toolbar" :class="{hide:hide}">
              <div class="input-group search">
                <div class="input-group-addon"><i class="material-icons">search</i></div>
                <input type="text" class="form-control searcher" v-model="dataSearch.text" @keyup="search" placeholder="Busque averia por cliente">
              </div>
              <div class="pull-right">
                <a target="_blank" href="#" class="btn icon"><i class="material-icons">build</i><span class="total-rows"></span></a>
              </div>
              <div class="pull-right">
                <a target="_blank" href="<?php echo base_url('process/getreport/averias')?>" class="btn icon print-table"><i class="material-icons">print</i></a>
              </div>
              <div class="pull-right">
                <select id="averias-view-mode" class="form-group filter btn btn-primary" v-model="dataSearch.state">
                  <option value="por reparar">Por Reparar</option>
                  <option value="reparado">Reparados</option>
                  <option value="todos">Todos</option>
                </select>
              </div>
            </div>

            <div class="averia-item-list" :class="{hide:hide}" id="averias-list">
              <?php $this->averia_model->get() ?>
            </div>
          </div>

          <div id="ticket-view" class="invisible" :class="{hide: classes.hide}">
            <div class="ticket-screen">
              <div class="searcher-container main-toolbar">
                <h4 class="col-md-9">{{ticket.cliente}}</h4>
                <div class="pull-right">
                  <button class="btn btn-transparent lg" type="submit" @click.prevent.stop="quit"><i class="material-icons">arrow_back</i></button>
                </div>
                <div class="pull-right">
                  <button class="btn btn-transparent lg" type="submit" @click.prevent.stop="print"><i class="material-icons">print</i></button>
                </div>
                <div class="pull-right">
                  <button class="btn btn-transparent lg" type="submit" @click.prevent.stop="enterEditMode"><i class="material-icons">edit</i></button>
                </div>
              </div>
              <div class="screen-body">
                <div class="row">
                  <div class="col-md-9 col-xs-8">
                    <div class="text-contrast">{{ticket.direccion}}</div>
                    <div class="text-contrast">{{ticket.codigo}}</div>
                    <br>
                    <div class="description" v-if="!mode.edit">{{ticket.descripcion}}</div>
                    <div class="ticket-editor" v-if="mode.edit">
                      <textarea id="" cols="30" rows="5" class="form-control" v-model="ticket.descripcion"></textarea>
                      <button class="btn btn-remark" @click="closeEditMode">Cancelar</button>
                      <button class="btn" @click="updateDescription" >Guardar</button>
                  </div>
                  </div>
                  <div class="col-md-3 col-xs-4 more">
                    <p v-if="!mode.edit"><i class='material-icons'>person_pin</i>Tecnico: {{ ticket.tecnico}}</p>
                    <div class="input-group" v-if="mode.edit">
                      <span class="input-group-addon"><i class='material-icons'>person_pin</i></span>
                      <input type="text" class="form-control" placeholder="Tecnico Asignado" v-model="ticket.tecnico">
                    </div>
                    <p v-if="!mode.edit"><i class='material-icons'>check</i>{{ticket.estado}}</p>
                    <div class="input-group" v-if="mode.edit">
                      <span class="input-group-addon"><i class='material-icons'>check</i></span>
                      <select class="form-control" v-model="ticket.estado" @change="updateState">
                        <option value="por reparar">Por Reparar</option>
                        <option value="reparado">Reparado</option>
                      </select>
                    </div>
                    <p><i class='material-icons'>event</i>Reporte: {{ticket.fecha}}</p>
                    <p><i class='material-icons'>event</i>Reparacion: {{ticket.fecha_reparacion}}</p>
                  </div>
                </div>
              </div>
              <div class="screen-comment-list">
                <h4>Reportes</h4>
                <div class="new-comment">
                  <textarea id="" cols="30" rows="5" class="form-control" 
                    v-model="new_comment"
                    placeholder="Haga click aqui para escribir un nuevo Reporte"
                    @focus="startComment"
                    >
                  </textarea>

                  <button class="btn btn-remark" @click="closeCommentMode" v-if="mode.newComment">Cancelar</button>
                  <button class="btn" @click="addComment" v-if="mode.newComment">Agregar</button>
                </div>
                <div class='comment-item' v-for="comment in comments">
                  <div class='top-row' :data-id="comment.id_reporte">
                    <div class='info'><span class='client-name'>{{comment.empleado}}</span></div>
                    <i class='material-icons comment-control' @click="_deleteComment">delete</i>
                  </div>
                  <div class='description'>
                    <div class='text'>{{comment.descripcion}}</div>
                  </div>
                  <div class='status-bar'>
                    <span><i class='material-icons'>event</i>{{comment.fecha}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane" id="pagos">
          <div class="searcher-container clearfix">
            <h4 class="search-criteria">Instalaciones de Hoy </span> (
              <?php echo $this->report_model->count_installations(); ?> )</h4>
            <a target="_blank" href="<?php echo base_url('process/getreport/installations') ?>" type="button" class="btn">Imprimir Reporte</a>
            <select name="" id="installations-view-mode">
            <option value="por instalar">Por Instalar</option>
            <option value="instalado">Instalados</option>
            <option value="todos">Todos</option>
          </select>
          </div>
          <div class="instalation-controls">

          </div>
          <div class="averia-item-list" id="installations-list">

            <?php $this->report_model->get_installations_list();?>
          </div>
        </div>

        <div role="tabpanel" class="tab-pane" id="retiros">
          <div class="searcher-container main-toolbar" id="retiros-toolbar">
            <div class="input-group search">
              <div class="input-group-addon"><i class="material-icons">search</i></div>
              <input type="text" class="form-control searcher"  placeholder="cliente">
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
              <a target="_blank" href="<?php echo base_url('process/getreport/retiros')?>" class="btn icon print-table"><i class="material-icons">print</i></a>
            </div>
          </div>
          <table data-toggle="table" id="cancelation-table"
            class="innertable table general-table"
            data-sort-name="contract" 
            data-sort-order="asc" 
            data-search="true"
            data-minimum-count-columns="2"
            data-toolbar="#retiros-toolbar"
            data-pagination="true" 
            data-id-field="contract" 
            data-page-size="500"
            data-page-list="[100,200,500, 1000, 2000, 5000, 8000]"
            data-show-footer="false">
            <thead>
              <tr>
                <th data-field="contract" data-sortable="true">Cont</th>
                <th data-field="client" data-sortable="true">Cliente</th>
                <th data-field="direction" data-sortable="true">Direccion</th>
                <th data-field="phone" data-sortable="true" style="width: 170px">Celular</th>
                <th data-field="retirement" data-sortable="true">Retiro</th>
                <th data-field="reason" data-sortable="true">Motivo</th>
                <th data-field="ip" data-sortable="true">IP</th>
                <th data-field="documents" data-sortable="true">Doc</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>
        </div>

        <div role="tabpanel" class="tab-pane" id="balance">
          <div class="searcher-container clearfix" id="moras-toolbar">
            <h4 class="search-criteria">Clientes en fecha de corte </span> (
              <?php echo $this->report_model->count_moras_view(); ?> )</h4>
            <a target="_blank" href="<?php echo base_url('process/getreport/deudores') ?>" type="button" class="btn">Imprimir Reporte</a>
          </div>
          <table data-toggle="table" class="innertable table general-table" data-sort-name="cliente" data-sort-order="asc" data-search="true"
            data-show-refresh="false" data-show-columns="false" data-show-export="false" data-minimum-count-columns="2" data-toolbar="#moras-toolbar"
            data-pagination="true" data-id-field="contrato" data-page-size="50" data-page-list="[10,20,50, 100,200,500]" data-show-footer="false">
            <thead>
              <tr>
                <th data-field="contrato" data-sortable="true">Contrato</th>
                <th data-field="cliente" data-sortable="true">Cliente</th>
                <th data-field="celular" data-sortable="true">Celular</th>
                <th data-field="cuota" data-sortable="true">Cuota</th>
                <th data-field="mora" data-sortable="true">Mora</th>
                <th data-field="extra" data-sortable="true">Extra</th>
                <th data-field="total" data-sortable="true">Total</th>
                <th data-field="pagos_pendiente" data-sortable="true">Pagos Pendientes</th>
                <th data-field="meses" data-sortable="true">Meses</th>
              </tr>
            </thead>
            <tbody>
              <?php $this->report_model->get_moras_view()?>
            </tbody>
          </table>
        </div>

        <?php if(auth_user_type(0)):?>
        <div role="tabpanel" class="tab-pane" id="recibos">
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

        <div role="tabpanel" class="tab-pane" id="historial">
          <div class="searcher-container clearfix" id="history-toolbar">
            <h4 class="search-criteria">Historial de moras</span>
              <a target="_blank" href="<?php echo base_url('process/getreport/deudores') ?>" type="button" class="btn">Imprimir Reporte</a>
          </div>
          <table data-toggle="table" class="innertable table general-table" data-sort-name="num" data-sort-order="asc" data-search="true"
            data-show-refresh="true" data-toolbar="#history-toolbar" data-show-columns="true" data-show-export="true" data-minimum-count-columns="2"
            data-pagination="true" data-id-field="payment" data-page-size="20" data-page-list="[10,20,50, All]" data-show-footer="false">
            <thead>
              <tr>
                <th data-field="num" data-sortable="true">Num</th>
                <th data-field="payment" data-sortable="true">Contrato</th>
                <th data-field="client" data-sortable="true">Cliente</th>
                <th data-field="celphone" data-sortable="true">Celular</th>
                <th data-field="cuota" data-sortable="true">Cuota</th>
                <th data-field="mora">Mora</th>
                <th data-field="extra">Extra</th>
                <th data-field="total">Total</th>
                <th data-field="fecha">Fecha Limite</th>
              </tr>
            </thead>
            <tbody>
              <?php $this->report_model->get_history(); ?>
            </tbody>
          </table>
        </div>
        <?php endif;?>
      </div>
    </div>

  </div>

  <!-- end of main tab-->
</div>
</div>