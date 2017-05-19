<!--*********************************************************************
*
*                                New Service Modal
*
**************************************************************************-->

<div class="modal fade" tabindex="-1" role="dialog" id="new-service-modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Agregar Servicio</h4>
      </div>
      <div class="modal-body">

        <form action="">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="user-nickname">Nombre del Servicio</label>
                <input type="text" class="form-control" id="service-name"  >
              </div>
              <div class="form-group">
                <label for="user-password">Descripción</label>
                <textarea  class="form-control "cols="30" rows="5"  id="service-description" >
               </textarea>
              </div>
          
              <div class="form-group">
                <label for="user-password-confirm">Mensualidad</label>
                <input type="number" class="form-control " id="service-monthly-payment" >
              </div>
              <div class="form-group">
                <label for="user-type">Tipo de Servicio</label>
                <select class="form-control" id="service-type">
                <option value="internet">Internet</option>
                <option value="reparacion">Reparación</option>
              </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn save" id="btn-save-service">Guardar</button>
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

<div class="modal fade" tabindex="-1" role="dialog" id="update-service-modal">
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