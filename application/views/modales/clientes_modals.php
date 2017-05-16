<div class="modal fade" tabindex="-1" role="dialog" id="new-client-modal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Nuevo Cliente</h4>
      </div>
      <div class="modal-body">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#client-required" aria-controls="home" role="tab" data-toggle="tab">Datos Principales</a></li>
            <li role="presentation"><a href="#client-optional" aria-controls="profile" role="tab" data-toggle="tab">Opcionales</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="client-required">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Datos Personales</h4>
                    <div class="form-group">
                      <label for="client-name">Nombres</label>
                      <input type="text" class="form-control" id="client-name" tabindex="1">
                    </div>
                    <div class="form-group">
                      <label for="client-dni">Cedula</label>
                      <input type="text" class="form-control" id="client-dni" tabindex="3">
                    </div>
                    <h4>Dirección</h4>
                    <div class="form-group">
                      <label for="client-provincia">Provincia</label>
                      <input type="text" class="form-control password-confirm" id="client-provincia" list="provincias" tabindex="5">
                      <datalist id="provincias">
                        <option value="La Romana">
                        <option value="Santo Domingo">
                        <option value="La Altagracia">
                      </datalist>

                    </div>
                    <div class="form-group">
                      <label for="cient-sector">Sector</label>
                      <input class="form-control" id="client-sector" tabindex="6">
                    </div>
                    <div class="form-group">
                      <label for="client-telephone">Telefono</label>
                      <input type="tel" class="form-control" id="client-telephone" tabindex="8">
                    </div>
                  </div>

                  <div class="col-md-6">
                  <h4 class="placeholder">... </h4>
                    <div class="form-group">
                      <label for="client-lastname">Apellidos</label>
                      <input type="text" class="form-control" id="client-lastname" tabindex="2">
                    </div>
                    <div class="form-group">
                      <label for="client-phone">Celular</label>
                      <input type="text" class="form-control" id="client-phone" tabindex="4">
                    </div>
                    <h4 class="placeholder"> ...</h4>
                    <div class="form-group">
                      <label for="client-street">Calle</label>
                      <input type="text" class="form-control" id="client-street" tabindex="6">
                    </div>

                    <div class="form-group">
                      <label for="client-house">Casa #</label>
                      <input type="text" class="form-control" id="client-house" tabindex="7">
                    </div>
                  </div>
                </div>
              </form>

            </div>
            <div role="tabpanel" class="tab-pane" id="client-optional">
            <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Datos Personales +</h4>
                    <div class="form-group">
                      <label for="client-job">Lugar de Trabajo</label>
                      <input type="text" class="form-control" id="client-job">
                    </div>
                    <div class="form-group">
                      <label for="client-salary">Salario</label>
                      <input type="text" class="form-control password" id="client-salary">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder">...</h4>
                    <div class="form-group">
                      <label for="client-job-number">Telefono del trabajo</label>
                      <input type="tel" class="form-control" id="client-job-telephone">
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
        <button type="button" class="btn save" id="btn-save-client" tabindex="10">Guardar</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->


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
                <label for="e-password">Contraseña</label>
                <input type="password" class="form-control password" id="e-password" placeholder="contraseña">
              </div>
              <div class="form-group">
                <label for="e-password-confirm">confirmar contraseña</label>
                <input type="password" class="form-control password-confirm" id="e-password-confirm" placeholder="contraseña">
              </div>
              <div class="form-group">
                <label for="e-type">Tipo de usuario</label>
                <select class="form-control" id="e-type">
                <option value="0">Administrador</option>
                <option value="1">Vendedor</option>
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
                <label for="e-dni">Cedula</label>
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