<div class="screen clients row">
  <?php 
    $client_data = get_client_data();
    $nombre_completo = $client_data['nombres']." ".$client_data['apellidos'];
    $iniciales =  $client_data['nombres'][0].$client_data['apellidos'][0];
    $active_window = "cliente";
    $active = "";
    if(isset($_SESSION['active_window'])){
      $active_window = $_SESSION['active_window'];
    }
  
  ?>
  <div class="main-content col-md-12">

    <div class="row">
      <div class="col-xs-6 col-md-3">
        <div class="page-header">
          <h3>Detalles del Cliente <br><small><?php echo $nombre_completo ?></small></h3>
        </div>

        <div class="client-profile">
          <span><?php echo $iniciales ?></span>
        </div>
        <p class="detail-state"><i class="material-icons">timeline</i>
          <?php echo $client_data['estado'] ?>
        </p>

      </div>
      <div class="col-md-9">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist" id="main-tabs">
            <li role="presentation" <?php if ($active_window == "cliente"):?>class="active" <?php endif; ?>><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Personales</a></li>
            <li role="presentation" <?php if ($active_window == "contratos"):?>class="active" <?php endif; ?>><a href="#contracts" aria-controls="profile" role="tab" data-toggle="tab">Contratos</a></li>
            <li role="presentation" <?php if ($active_window == "pagos"):?>class="active" <?php endif; ?>><a href="#payments" aria-controls="messages" role="tab" data-toggle="tab">Pagos</a></li>
            <li role="presentation" <?php if ($active_window == "observaciones"): ?>class="active" <?php endif; ?>><a href="#observations" aria-controls="settings" role="tab" data-toggle="tab">Observaciones</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in <?php if ($active_window == "cliente"):?> active <?php endif; ?>" id="home">
              <form action="" class="watch-in-detail special">
                <div class="row">


                  <div class="col-md-6">
                    <div class="input-group col-md-4">
                      <span class="input-group-addon" id="addon">ID</span>
                      <input type="text" class="form-control small-id" value="<?php echo $client_data['id_cliente'] ?>" disabled>
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

              <table class="table d-contratos wide-table" id="d-contracts">
                <thead>
                  <tr>
                    <th>ID #</th>
                    <th>Fecha</th>
                    <th>(meses)</th>
                    <th>Ultimo Pago</th>
                    <th>Proximo Pago</th>
                    <th>Monto Pagado</th>
                    <th>Monto Total</th>
                    <th>estado</th>
                  </tr>
                </thead>
                <tbody>
                  <?php $this->contract_model->get_all_of_client($client_data['id_cliente']) ?>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                  </tr>

                </tfoot>
              </table>

            </div>


            <!---->
            <div role="tabpanel" class="tab-pane detail-panel fade in <?php if ($active_window == "pagos"):?> active <?php endif; ?>" id="payments">
              <div class="row">
                <div class="col-md-3">
                  <div class="input-group">
                    <span class="input-group-addon" id="addon">Contrato </span>
                    <select name="select-contract form-control" id="select-contract">
                      <?php $this->contract_model->get_contracts_dropdown($client_data['id_cliente']) ?>
                    </select>
                  </div>
                </div>
                <div class="col-md-7 col-md-offset-1"><button class="btn" id="btn-pay">Registrar Pago </button></div>
              </div>
              
              <table class="table t-pagos" id="t-pagos">
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Cuota</th>
                    <th>Mora</th>
                    <th>Monto</th>
                    <th>Fecha de Pago</th>
                    <th>Estado</th>
                    <th>Vence En</th>
                    <th>Recibo</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                  <tr>
                  <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                  </tr>

                </tfoot>
              </table>
            </div>

            <!---->
            <div role="tabpanel" class="tab-pane fade in <?php if ($active_window == "observaciones"):?> active <?php endif; ?>" id="observations">...</div>
          </div>

        </div>

      </div>
    </div>
     


  </div>


</div>