<!--*********************************************************************
*
*                                 Update User Modal
*
**************************************************************************-->

<div class="modal fade" tabindex="-1" role="dialog" id="update-user-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Editar Usuario</h4>
      </div>
      <div class="modal-body">

        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="e-nickname">Nick o Correo</label>
                <input type="text" class="form-control" id="e-nickname" disabled>
              </div>
              <div class="form-group">
                <label for="e-type">Tipo de usuario</label>
                <select class="form-control" id="e-type">
                <option value="">-- Seleccione el Tipo de cuenta --</option>
                <option value="1">Secretaria(o)</option>
                <option value="0">Administrador</option>
              </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="e-name">Nombres</label>
                <input type="text" class="form-control" id="e-name" placeholder="Jesus Ant.">
              </div>
              <div class="form-group">
                <label for="e-lastname">Apellidos</label>
                <input type="text" class="form-control" id="e-lastname" placeholder="Guerrero Alvarez">
              </div>
              <div class="form-group">
                <label for="e-dni">Cedula(sin guiones)</label>
                <input type="text" class="form-control" id="e-dni" placeholder="ISC Services">
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn save" id="btn-update-user">Actualizar</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

