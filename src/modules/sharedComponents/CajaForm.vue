<template>
  <div class="modal fade" tabindex="-1" role="dialog" id="add-money-modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Hacer Ingreso</h4>
        </div>
        <div class="modal-body">

          <form action="">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="e-nickname">Cantidad</label>
                  <input type="number" class="form-control" id="caja-a-amount">
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="income-description">Descripción</label>
                  <textarea class="form-control " cols="30" rows="5" id="caja-a-description"></textarea>
                </div>

              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn save" id="btn-add-money">Actualizar</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>

</template>

<script>
  export default {

  }
</script>

