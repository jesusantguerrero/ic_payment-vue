<div class="modal fade" tabindex="-1" role="dialog" id="new-user-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Nuevo Usuario</h4>
      </div>
      <div class="modal-body">

        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="user-nickname">Nick o Correo</label>
                <input type="text" class="form-control" id="user-nickname" placeholder="jguerrero">
              </div>
              <div class="form-group">
                <label for="user-password">Contraseña</label>
                <input type="password" class="form-control" id="user-password" placeholder="contraseña">
              </div>
              <div class="form-group">
                <label for="user-password-confirm">confirmar contraseña</label>
                <input type="password" class="form-control" id="user-password-confirm" placeholder="contraseña">
              </div>
              <div class="form-group">
                <label for="user-type">Tipo de usuario</label>
                <select class="form-control" id="user-type">
                <option value="0">Administrador</option>
                <option value="1">Vendedor</option>
              </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="user-name">Nombres</label>
                <input type="text" class="form-control" id="user-name" placeholder="Jesus Ant.">
              </div>
              <div class="form-group">
                <label for="user-lastname">Apellidos</label>
                <input type="text" class="form-control" id="user-lastname" placeholder="Guerrero Alvarez">
              </div>
              <div class="form-group">
                <label for="user-dni">Cedula</label>
                <input type="text" class="form-control" id="user-dni" placeholder="ISC Services">
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Close</button>
        <button type="button" class="btn" id="btn-save-user">Save changes</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->