<!--*********************************************************************
*
*                                New Averia
*
**************************************************************************-->

<div class="modal fade" tabindex="-1" role="dialog" id="new-averia-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Agregar Averia</h4>
      </div>
      <div class="modal-body">

        <form action="">
          <div class="row">
            <div class="col-md-12">
            <input type="text" class="form-control hidden" id="averias-client-id">
            <div class="form-group">
                <label for="user-nickname">Cedula</label>
                <input type="text" class="form-control" id="a-client-dni">
              </div>
              <div class="form-group">
                <label for="user-nickname">Cliente</label>
                <input type="text" class="form-control" id="a-client" disabled>
              </div>
              <div class="form-group">
                <label for="service-description">Descripción</label>
                <textarea  class="form-control "cols="30" rows="5"  id="a-description" >
               </textarea>
              </div>              
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn save" id="btn-save-averia">Guardar</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->


<!--*********************************************************************
*
*                                 Retire Money
*
**************************************************************************-->

<div class="modal fade" tabindex="-1" role="dialog" id="retire-money-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Registrar Retiro De Caja</h4>
      </div>
      <div class="modal-body">

        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="e-nickname">Cantidad</label>
                <input type="number" class="form-control" id="caja-r-amount">
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="income-description">Descripción</label>
                <textarea  class="form-control "cols="30" rows="5"  id="caja-r-description" >
               </textarea>
              </div>

            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn save" id="btn-retire-money">Actualizar</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->