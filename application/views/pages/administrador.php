<div class="screen clients row">
  <div class="left-navigation administrador col-md-2">
    <ul class="aside-nav">
      <li class="aside-buttons"><a href="#company-section"><i class="material-icons">description</i> Empresa</a></li>
      <li class="aside-buttons"><a href="#user-section"><i class="material-icons">person_pin</i> Usuarios</a></li>
      <li class="aside-buttons"><a href="#user-section"><i class="material-icons">person_pin</i> Caja Chica</a></li>
      <li class="aside-buttons"><a href="#settings-section"><i class="material-icons">settings</i> Ajustes</a></li>
    </ul>
  </div>

  <div class="main-content col-md-10">
    <div class="section-player">

      <!-- *******************************
      *     Sección de la compa;ia     *
      *                                *
    **********************************-->

      <div class="company-details" id="company-section">
        <?php 
          $empresa = $this->company_model->get_empresa();
          $settings = $this->settings_model->get_settings();
         ?>
        <h3> Detalles de la Empresa</h3>
        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="company-name">Nombre de la Empresa</label>
                <input type="text" class="form-control" id="company-name" value="<?php echo $empresa['nombre'] ?>">
              </div>
              <div class="form-group">
                <label for="company-phrase">Lema</label>
                <input type="text" class="form-control" id="company-phrase" value="<?php echo $empresa['lema'] ?>">
              </div>
              <div class="form-group">
                <label for="company-phone1">Telefono1</label>
                <input type="text" class="form-control" id="company-phone1" value="<?php echo $empresa['telefono1'] ?>">
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="company-name">Direccion</label>
                <input type="text" class="form-control" id="company-direction" value="<?php echo $empresa['direccion'] ?>">
              </div>
              <div class="form-group">
                <label for="company-name">Descripción</label>
                <input type="text" class="form-control" id="company-description" value="<?php echo $empresa['descripcion'] ?>">
              </div>
              <div class="form-group">
                <label for="company-name">Telefono2</label>
                <input type="text" class="form-control" id="company-phone2" value="<?php echo $empresa['telefonos'] ?>">
              </div>
              <div class="right">
                <input id="update-company-data" type="submit" value="Guardar Datos">
              </div>

            </div>
        </form>
        </div>
      </div>

    <!-- ******************************
      *     Sección de los usuarios   *
      *                               *
    ********************************-->

      <div class="company-details" id="user-section">
        <h3> Usuarios </h3>
        <div class="busquedas">
          <button class="tab-buttons" onclick="">Ver Todos</button>
          <button class="tab-buttons" onclick="">Administradores</button>
          <button class="tab-buttons" onclick="">Vendedores</button>
          <button class="tab-buttons" id="caller-user" data-toggle="modal" data-target="#new-user-modal">Agregar</button>
        </div>

        <table class="table t-users" id="t-users">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Nick</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cedula</th>
              <th>Tipo</th>
              <th></th>
              <th>Acción</th>
            </tr>
          </thead>
            <tbody> <?php $this->user_model->get_all_users() ?></tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Filas Por Pagina</td>
                <td>
                  <select name="perpage" id="per-page" class="per-page">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>  
                  </select>

                </td>
                <td><span class="min-limit">1</span>-<span class="max-limit-visible">5</span><span class="max-limit">5</span> 
                  de <span class="total-rows"><?php $this->user_model->count_users(); ?></span></td>
                <td><i class="material-icons previous-page">keyboard_arrow_left</i> <i class="material-icons next-page">keyboard_arrow_right</i></td>

              </tr>

            </tfoot>

        </table>
      </div>


    <!-- ******************************
      *     Sección de los usuarios   *
      *                               *
    ********************************-->
    <div class="company-details" id="settings-section">
        <?php $empresa = $this->company_model->get_empresa();
         ?>
        <h3> Ajustes del Programa</h3>
        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="company-name">Monto de la mora</label>
                <div class="input-group">
                  <div class="input-group-addon">RD$ </div>
                  <input type="number" class="form-control" id="settings-mora" value="<?php echo $settings['cargo_mora'] ?>">
                  <div class="input-group-addon">Pesos </div>
                </div>
              </div>
              <div class="form-group">
                <label for="company-phrase">Fecha de Corte</label>
                <div class="input-group">
                  <div class="input-group-addon">Dia </div>
                  <input type="number" class="form-control" id="settings-fecha-corte" value="<?php echo $settings['fecha_corte'] ?>">
                  <div class="input-group-addon">De Cada Mes </div>
                </div>
              </div>
              <div class="form-group">
                <label for="company-phone1">Apertura de Caja Chica</label>
                <div class="input-group">
                  <div class="input-group-addon">RD$ </div>
                  <input type="number" class="form-control" id="settings-apertura-caja" value="<?php echo $settings['apertura_caja'] ?>">
                  <div class="input-group-addon">Pesos </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="company-name">Penalizacion Por Cancelacion:</label>
                <div class="input-group">
                  <div class="input-group-addon">Porcentaje </div>
                  <input type="number" class="form-control" id="settings-penalizacion-cancelacion" value="<?php echo $settings['penalizacion_cancelacion'] ?>">
                  <div class="input-group-addon"> % </div>
                </div>
              </div>
              <div class="form-group">
                <label for="company-name">Meses Por defecto de un contrato:</label>
                <div class="input-group">
                  <div class="input-group-addon">Por </div>
                  <input type="number" class="form-control" id="settings-meses-por-defecto" value="<?php echo $settings['meses_por_defecto'] ?>">
                  <div class="input-group-addon">Meses </div>
                </div>
              </div>
              <div class="form-group">
                <label for="company-name">Telefono2</label>
                <input type="text" class="form-control" id="company-phone2" value="">
              </div>
              <div class="right">
                <input id="btn-update-settings" type="submit" value="Guardar Datos">
              </div>

            </div>
        </form>
        </div>
      </div>
    </div>

  </div>

</div>