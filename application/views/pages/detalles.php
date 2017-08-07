<div class="screen clients row">
  <?php 
    $client_data = get_client_data();
    $nombre_completo = $client_data['nombres']." ".$client_data['apellidos'];
    $iniciales =  $client_data['nombres'][0].$client_data['apellidos'][0];
    $active_window = "cliente";
    $active = "";
    $abono_box_class = "";
    $client_row = $this->client_model->get_column(array('observaciones','abonos'),$client_data['id_cliente']);

    if(isset($_SESSION['active_window'])) $active_window = $_SESSION['active_window'];
  
    if($client_row['abonos'] > 0) $abono_box_class = "have-abono";
                
  
  ?>
  <div class="main-content col-md-12">

    <div class="row">
      <div class="col-xs-6 col-md-3 center-row">
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
          <div class="abono-box <?php echo $abono_box_class ?>">
            <h5>Este cliente ha abonado</h5>
            <div class="input-group abono-value" >
              <span class="input-group-addon" id="addon">Abono! </span>
              <input type="text" name="" id="in-abono-view" class="form-control" value="<?php echo 'RD$ '.CurrencyFormat($client_row['abonos']) ?>" disabled/>
            </div>
            <a href="<?php echo base_url('process/get_abono_receipt/').$client_data['id_cliente'] ?>" target="_blank" class="btn abono-box__receipt">Comprobante de abono</a>
          </div>
          <button class="btn" id="btn-pay">Registrar Pago</button>
        </div>
      </div>
      <div class="col-md-9">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist" id="main-tabs">
            <li role="presentation" <?php if ($active_window=="cliente" ):?>class="active"
              <?php endif; ?>><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Personales</a></li>
            <li role="presentation" <?php if ($active_window=="contratos" ):?>class="active"
              <?php endif; ?>><a href="#contracts" aria-controls="profile" role="tab" data-toggle="tab">Contratos</a></li>
            <li role="presentation" <?php if ($active_window=="pagos" ):?>class="active"
              <?php endif; ?>><a href="#payments" aria-controls="messages" role="tab" data-toggle="tab">Pagos</a></li>
            <li role="presentation" <?php if ($active_window=="observaciones" ): ?>class="active"
              <?php endif; ?>><a href="#observations" aria-controls="settings" role="tab" data-toggle="tab">Observaciones</a></li>
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
                      <input type="text" class="form-control" value="<?php echo $nombre_completo; ?>" disabled>
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
                      <input type="tel" class="form-control" value="<?php  echo $client_data['telefono']?>" disabled>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder"> ...</h4>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Cedula</span>
                      <input type="text" class="form-control" value="<?php  echo $client_data['cedula']?>" disabled>
                    </div>
                    <div class="input-group">
                      <span class="input-group-addon" id="addon">Celular</span>
                      <input type="text" class="form-control" value="<?php  echo $client_data['celular']?>" disabled>
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
                data-pagination="true" data-id-field="id-contrato" 
                data-page-size="5" data-page-list="[5]" 
                data-show-footer="false" 
                data-click-to-select="true"
                data-single-select="true">
                <thead>
                  <tr>
                    <th data-field="id-contrato">COD</th>
                    <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
                    <th data-field="fecha">Fecha</th>
                    <th data-field="meses">(meses)</th>
                    <th data-field="ultimo-pago">Ultimo Pago</th>
                    <th data-field="proximo-pago">Proximo Pago</th>
                    <th data-field="monto-pagado">Monto Pagado</th>
                    <th data-field="monto-total">Monto Total</th>
                    <th data-field="estado">estado</th>
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
                data-sort-name="id" 
                data-minimum-count-columns="2" 
                data-show-pagination-switch="false"
                data-pagination="true" 
                data-id-field="id" 
                data-page-size="5" 
                data-page-list="[5]" 
                data-show-footer="false"
                data-striped="true"
                data-click-to-select="true"
                data-single-select="true">
                <thead>
                  <tr>
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
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>

            <!---->
            <div role="tabpanel" class="tab-pane fade in <?php if ($active_window == "observaciones"):?> active <?php endif; ?>" id="observations">

              <div class="form-group">
              
                <h5>Escribe tus observaciones para este cliente</h5>

                
                <textarea name="" id="text-observations" class="form-control" rows="5" required="required" ><?php echo $client_row['observaciones'];?></textarea>

                <h5>Control de abono de mes:</h5>

                <div class="input-group">
                  <div class="input-group-addon">RD$ </div>
                  <input type="number" class="form-control" id="input-abono" value="<?php echo $client_row['abonos'] ?>">
                  <div class="input-group-addon">Pesos</div>
                </div>


              </div>



              <div class="form-group">
                <div class="col-sm-2 col-sm-offset-10">
                  <button type="submit" class="btn btn-primary" id="btn-save-observations">Guardar</button>
                </div>
              </div>

            </div>


          </div>

        </div>

      </div>
    </div>



  </div>
</div>