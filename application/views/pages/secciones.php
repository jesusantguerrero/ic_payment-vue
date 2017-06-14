<div class="screen clients row">
  <?php 

  ?>

  <div class="main-content col-md-12">

    <div class="row">
      <div class="col-xs-6 col-md-3 center-row">
        <div class="page-header">
          <h3>Cobertura y Secciones</h3>
        </div>

        <div class="client-profile">
          <span><i class="material-icons">signal_wifi_4_bar</i></span>
        </div>

        <div class="payment-controls visible">
          <div class="input-group">
            <span class="input-group-addon" id="addon">Seccion </span>
            <select class="form-control" id="select-contract">
           
          </select>
          </div>
          <div class="abono-box visible">
            <h5>Este cliente ha abonado</h5>
            <div class="input-group abono-value">
              <span class="input-group-addon" id="addon">Abono! </span>
              <input type="text" name="" id="in-abono-view" class="form-control" value=""
                disabled/>
            </div>
          </div>
          <button class="btn" id="btn-add-section">Agregar Seccion</button>
        </div>
      </div>
      <div class="col-md-9">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist" id="main-tabs">
            <li role="presentation" class="active">
              <a href="#payments" aria-controls="messages" role="tab" data-toggle="tab">IP's De Seccion</a></li>
            <li role="presentation">
              <a href="#observations" aria-controls="settings" role="tab" data-toggle="tab">Descripcion</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">

            <!---->
            <div role="tabpanel" class="tab-pane detail-panel fade in  active" id="payments">
              <div class="table" id="t-pagos">
                <table class="table t-pagos">
                  <thead>
                    <tr>
                      <th>Concepto</th>
                      <th>Cuota</th>
                      <th>Mora</th>
                      <th>Extra</th>
                      <th>Monto</th>
                      <th>Fecha de Pago</th>
                      <th>Estado</th>
                      <th>Vence En</th>
                      <th>Recibo</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div class="table-foot">
                  <div class="pagination-labels">
                    <div>
                      <select name="perpage" id="per-page" class="per-page">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>  
                  </select>
                    </div>
                    <div><span class="min-limit">1</span>-<span class="max-limit-visible">5</span><span class="max-limit">5</span>                      de
                      <span class="total-rows">
                    
                      </span>
                    </div>
                    <div> Registros</div>
                  </div>

                  <div class="pagination-controllers">
                    <div><i class="material-icons previous-page">keyboard_arrow_left</i> <i class="material-icons next-page">keyboard_arrow_right</i></div>
                  </div>
                </div>
              </div>
            </div>

            <!---->
            <div role="tabpanel" class="tab-pane fade in" id="observations">

              <div class="form-group">

                <h5>Escribe tus observaciones para este cliente</h5>


                <textarea name="" id="text-observations" class="form-control" rows="5" required="required">
                </textarea>
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