<div class="screen clients row">
  <?php 
    $client_data = get_client_data();
    $nombre_completo = $client_data['nombres']." ".$client_data['apellidos'];
    $iniciales =  $client_data['nombres'][0].$client_data['apellidos'][0];
    $active_window = "cliente";
    $active = "";
    $extras = $this->extra_model->has_extra(($client_data['id_cliente']));
    $client_row = $this->client_model->get_column(array('observaciones'),$client_data['id_cliente']);

    if(isset($_SESSION['active_window'])) $active_window = $_SESSION['active_window'];
  ?>
  <div class="main-content detalles col-md-12">

    <div class="row">
      <div class="col-xs-6 col-md-3 center-row aside-wide-left">
        <div class="page-header">
          <h3>Detalles del Cliente</h3>
        </div>

        <div class="client-profile">
          <span><?php echo $iniciales ?></span>
        </div>
        <h5>
          <?php echo $nombre_completo ?>
        </h5>
        <p class="detail-state"><i class="material-icons">timeline</i>
          <?php echo $client_data['estado'] ?>
        </p>
        <?php 
          if ($active_window == "pagos"):
            $controls_class = "visible";
          else:
            $controls_class = "";
          endif;
        ?>
        <div class="payment-controls <?php echo $controls_class ?>">
          <div class="input-group">
            <span class="input-group-addon" id="addon">Contrato </span>
            <select  class="form-control" id="select-contract">
            <?php $this->contract_model->get_contracts_dropdown($client_data['id_cliente']) ?>
          </select>
          </div>
          <div class="box" id="payment-detail-box">
            <div class="box-header with-border">
              <h3 class="box-title">Detalles de Pago</h3>
              <div class="box-tools pull-right">
                <!-- Collapse Button -->
                <button type="button" class="mybtn btn-box-tool" data-widget="collapse">
                  <i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
            <h6>Forma de pago</h6>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-small payment-mode">efectivo</button>
              <button type="button" class="btn btn-small payment-mode">banco</button>
            </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
          <button class="btn" id="btn-pay">Registrar Pago</button>
        </div>
        <div class="contract-controls hide">
          <button class="btn icon" id="btn-detail-cancel-contract" disabled><i class="material-icons" title="cancelar contrato" >delete</i></button>
          <button class="btn icon" id="btn-detail-suspend-contract" title="suspender contrato" disabled><i class="material-icons" >report_problem</i></button>
          <button class="btn icon" id="btn-call-reconnect" title="Reconectar" disabled><i class="material-icons" >fiber_smart_record</i></button>
          <button class="btn icon" id="btn-call-extra" title="extras" disabled><i class="material-icons" >more</i></button>
        </div>
      </div>
      <div class="col-md-9 wide-main-content">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist" id="main-tabs">
            <li role="presentation" <?php if ($active_window=="cliente" ):?>class="active"
              <?php endif; ?>><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Personales</a></li>
            <li role="presentation" <?php if ($active_window=="contratos" ):?>class="active"
              <?php endif; ?>><a href="#contracts" aria-controls="profile" role="tab" data-toggle="tab">Contratos</a></li>
            <li role="presentation" <?php if ($active_window=="pagos" ):?>class="active"
              <?php endif; ?>><a href="#payments" aria-controls="messages" role="tab" data-toggle="tab">Pagos</a></li>
            <li role="presentation" <?php if ($active_window=="abonos" ): ?>class="active"
              <?php endif; ?>><a href="#abonos" aria-controls="settings" role="tab" data-toggle="tab">Abonos</a></li>
            <li role="presentation" <?php if ($active_window=="observaciones" ): ?>class="active"
              <?php endif; ?>><a href="#observations" aria-controls="settings" role="tab" data-toggle="tab">Observaciones</a></li>
              <li role="presentation" <?php if ($active_window=="extras" ): ?>class="active"
              <?php endif; ?>><a href="#extras" aria-controls="settings" role="tab" data-toggle="tab">Extras 
              <?php if ($extras > 0): ?>
						    <span class="badge"><?php echo $extras ;?></span>
						  <?php endif; ?>
              </a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in <?php if ($active_window == "cliente"):?> active <?php endif; ?>" id="home">
              <form action="" class="watch-in-detail special">
                <div class="row">


                  <div class="col-md-6">
                    <div class="input-group col-md-4">
                      <span class="input-group-addon" id="addon">ID</span>
                      <input type="text" id="detail-client-id" class="form-control small-id" value="<?php echo $client_data['id_cliente'] ?>" disabled>
                    </div>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Nombre</span>
                      <input type="text" class="form-control" id="detail-client-name" value="<?php echo $nombre_completo; ?>" disabled>
                    </div>

                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Fecha de Registro</span>
                      <input type="text" class="form-control" value="<?php  echo $client_data['fecha_registro']?>" disabled>
                    </div>
                    <h4 class="placeholder"> ...</h4>
                    <h4>Dirección</h4>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Provincia</span>
                      <input type="text" class="form-control" value="<?php  echo $client_data['provincia']?>" disabled>


                    </div>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Sector</span>
                      <input class="form-control" value="<?php  echo $client_data['sector']?>" disabled="6">
                    </div>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Telefono</span>
                      <input type="tel" class="form-control" value="<?php  echo phone_format($client_data['telefono'])?>" disabled>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder-lg"> ...</h4>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Cedula</span>
                      <input type="text" class="form-control" value="<?php  echo dni_format($client_data['cedula'])?>" disabled>
                    </div>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Celular</span>
                      <input type="tel" class="form-control" value="<?php  echo phone_format($client_data['celular'])?>" disabled>
                    </div>
                    <h4 class="placeholder"> ...</h4>
                    <h4 class="placeholder"> ...</h4>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Calle</span>
                      <input type="text" class="form-control" value="<?php  echo $client_data['calle']?>" disabled>
                    </div>

                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Casa #</span>
                      <input type="text" class="form-control" value="<?php  echo $client_data['casa']?>" disabled>
                    </div>
                  </div>
                </div>
              </form>


            </div>


            <!---->
            <div role="tabpanel" class="tab-pane detail-panel fade in <?php if ($active_window == "contratos"):?> active <?php endif; ?>" id="contracts">
          

              <table class="table d-contratos innertable" id="d-contracts" data-sort-name="id-contrato" 
                data-sort-order="asc" 
                data-search="false" 
                data-show-refresh="false"
                data-show-columns="false"
                data-show-export="false"
                data-minimum-count-columns="2" 
                data-show-pagination-switch="false"
                data-pagination="true"
                data-id-field="id_contrato" 
                data-page-size="20" 
                data-page-list="[10,20,50,All]" 
                data-show-footer="false" 
                data-click-to-select="true"
                data-single-select="true">
                <thead>
                  <tr>
                    <th data-field="id_contrato">COD</th>
                    <th data-field="ip">IP</th>
                    <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
                    <th data-field="fecha">Fecha</th>
                    <th data-field="meses">(Meses)</th>
                    <th data-field="ultimo-pago">Ultimo Pago</th>
                    <th data-field="proximo-pago">Proximo Pago</th>
                    <th data-field="monto-pagado">Monto Pagado</th>
                    <th data-field="monto-total">Monto Total</th>
                    <th data-field="estado">Estado</th>
                    <th data-field="actions">Documentos</th>
                    <th data-field="id_cliente" class="hide">id cliente</th>
                    <th data-field="cedula" class="hide">cedula</th>
                  </tr>
                </thead>
                 <tbody>
                  <?php $this->contract_model->get_all_of_client($client_data['id_cliente']) ?> 
                </tbody>
              </table>

            </div>


            <!---->
            <div role="tabpanel" class="tab-pane detail-panel fade in <?php if ($active_window == "pagos"):?> active <?php endif; ?>" id="payments">
              
              <table class="table t-pagos" id="t-pagos"  
                data-minimum-count-columns="2" 
                data-show-pagination-switch="false"
                data-pagination="false" 
                data-id-field="id" 
                data-page-size="-1" 
                data-page-list="[10,20,50,-1]" 
                data-show-footer="false"
                data-striped="false"
                data-click-to-select="true"
                data-single-select="true">
                <thead>
                  <tr>
                    <th data-field="deshacer"></th>
                    <th data-field="id" class="hide">ID Pago</th>
                    <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
                    <th data-field="concepto">Concepto</th>
                    <th data-field="cuota">Cuota</th>
                    <th data-field="mora">Mora</th>
                    <th data-field="extra">Extra</th>
                    <th data-field="monto">Monto</th>
                    <th data-field="fecha_pago">Fecha de Pago</th>
                    <th data-field="estado" data-align="center">Estado</th>
                    <th data-field="fecha_limite">Vence En</th>
                    <th data-field="action">Recibo</th>
                    <th data-field="id_contrato" class='hide'>ID Contrato</th>
                    <th data-field="control">Control</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>

            <!---->
            <div role="tabpanel" class="tab-pane fade in <?php if ($active_window == "observaciones"):?> active <?php endif; ?>" id="abonos">

              <div class="form-group details-forms">
              
                <h5>Escribe los detalles de este abono</h5>

                
                <textarea name="" id="text-abono-detail" class="form-control" rows="5" required="required"></textarea>

                <h5>Control de abono de mes:</h5>

                <div class="input-group">
                  <div class="input-group-addon">RD$ </div>
                  <input type="number" class="form-control" id="input-abono" value="">
                  <div class="input-group-addon">Pesos</div>
                </div>


              </div>



              <div class="form-group">
                <div class="col-sm-2 col-sm-offset-10">
                  <button type="submit" class="btn btn-primary" id="btn-save-observations">Guardar</button>
                </div>
              </div>

            </div>

            <!---->
            <div role="tabpanel" class="tab-pane fade in <?php if ($active_window == "observaciones"):?> active <?php endif; ?>" id="observations">

              <div class="form-group details-form">
                <h5>Escribe las observaciones para este cliente</h5>
                <textarea name="" id="text-observations" class="form-control" rows="5" required="required" ><?php echo $client_row['observaciones'];?></textarea>
              </div>
              <div class="form-group">
                <div class="col-sm-2 col-sm-offset-10">
                  <button type="submit" class="btn btn-primary" id="btn-save-real-observations">Guardar</button>
                </div>
              </div>

            </div>

            <div role="tabpanel" class="tab-pane fade in <?php if ($active_window == "extras"):?> active <?php endif; ?>" id="extras">
              <table class="table t-extras" id="t-extras"  
              data-sort-order="asc" 
              data-search="false" 
              data-show-refresh="false"
              data-show-columns="false"
              data-show-export="false"
              data-minimum-count-columns="2" 
              data-show-pagination-switch="false"
              data-pagination="true"
              data-id-field="id_extra" 
              data-page-size="20" 
              data-page-list="[10,20,50,All]" 
              data-show-footer="false" 
              data-click-to-select="true"
              data-single-select="true">
              <thead>
                <tr>
                  <th data-field="controls"></th>
                  <th data-field="id_extra" class="hide">COD</th>
                  <th data-field="id_servicio" class="hide">SER</th>
                  <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
                  <th data-field="fecha">Fecha</th>
                  <th data-field="concepto">Concepto</th>
                  <th data-field="ultimo_pago">Ultimo Pago</th>
                  <th data-field="monto_pagado">Monto Pagado</th>
                  <th data-field="monto_total">Monto Total</th>
                  <th data-field="estado">Estado</th>
                </tr>
              </thead>
               <tbody>
                <?php echo $this->extra_model->get_all_of_client($client_data['id_cliente']) ?> 
              </tbody>
            </table>

            <form class="card" id="app-pago-extra" :class="{visible: visible}" novalidate>
              <div class="row">
                <h4 class="col-md-10">{{extra.concepto}}</h4>
                <div class="col-md-1 mb-1">
                  <button class="btn btn-gray lg" type="submit" @click.prevent.stop="goBack"><i class="material-icons">arrow_back</i></button>
                </div>
                <div class="col-md-1 mb-1">
                  <button class="btn btn-gray lg" type="submit" @click.prevent.stop="generatePayment"><i class="material-icons">add</i></button>
                </div>
              </div>
              <br>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="validationCustom01">Pago</label>
                  <select type="text" class="form-control" id="select-extra-payment"></select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="validationCustom02">Concepto</label>
                  <input type="text" class="form-control" id="validationCustom02" v-model="recibo.detalles_extra">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="validationCustom01">Detalle</label>
                  <input type="text" class="form-control">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="validationCustom02">Fecha</label>
                  <input type="date" class="form-control" id="validationCustom02" v-model="recibo.fecha_pago">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="validationCustom03">Monto Abonado</label>
                  <input type="number" class="form-control" id="validationCustom03" v-model="recibo.cuota">
                </div>
                <div class="col-md-3 mb-3">
                  <label for="validationCustom05">Modo Pago</label>
                  <select type="text" class="form-control" id="validationCustom05" v-model="recibo.tipo">
                      <option value="efectivo">Efectivo</option>
                      <option value="banco">Banco</option>
                  </select>
                  <br>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="">Recibo</label><br>
                  <p :class="{hide: hide_recibo}"><a  target="printframe" :href="url_recibo"><i class="material-icons">description</i></a>  {{recibo.estado}}</p>
                </div>
              </div>
              <div class="row" :class="firstControls">
                <div class="col-md-6 mb-3">

                </div>
                <div class="col-md-3 mb-3">
                  <button class="btn btn-primary lg" type="submit" @click.prevent.stop="deletePayment">Eliminar Pago</button>
                </div>
                <div class="col-md-3 mb-3">
                  <button class="btn btn-primary lg" type="submit" @click.prevent.stop="applyPayment">Aplicar Pago</button>
                </div>
              </div>
            </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</div>