<div class="modal fade" tabindex="-1" role="dialog" id="advanced-payment">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Opciones De Pago Avanzadas</h4>
      </div>
      <div class="modal-body">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#detalles-de-pago" aria-controls="required" role="tab" data-toggle="tab">Detalles de pago</a></li>
            <li role="presentation"><a href="#descuentos" aria-controls="direction" role="tab" data-toggle="tab">Descuentos</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active" id="detalles-de-pago">


            </div>
            <div role="tabpanel" class="tab-pane fade in" id="descuentos">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="payment-discount-amount">Monto de Descuento</label>
                      <input type="number" class="form-control payment-sumandos" id="payment-discount-amount" tabindex="5">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="u-client-street">Razon de descuento</label>
                       <textarea  class="form-control "cols="30" rows="5"  id="payment-discount-reason"></textarea>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal" tabindex="9">Cancelar</button>
        <button type="button" class="btn save" id="btn-apply-discount" tabindex="10">Aplicar Pago</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
