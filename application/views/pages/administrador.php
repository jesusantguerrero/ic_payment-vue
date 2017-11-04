<div class="screen clients row">
  <div class="left-navigation administrador col-md-2">
    <ul class="aside-nav">
      <li class="aside-buttons"><a href="#company-section"><i class="material-icons">description</i> Empresa</a></li>
      <li class="aside-buttons"><a href="#user-section"><i class="material-icons">person_pin</i> Usuarios</a></li>
      <li class="aside-buttons"><a href="#caja-section"><i class="material-icons">move_to_inbox</i> Caja Chica</a></li>
      <li class="aside-buttons"><a href="#settings-section"><i class="material-icons">settings</i> Ajustes</a></li>
      <li class="aside-buttons"><a href="#message-settings-section"><i class="material-icons">phonelink_setup</i> Ajustes de Mensajes</a></li>
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
        <h3 class="section-title"> Detalles de la Empresa</h3>
        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="company-name">Nombre de la Empresa</label>
                <input type="text" class="form-control" id="company-name" value="<?php echo $empresa['nombre'] ?>">
              </div>
              <div class="form-group">
                <label for="company-phrase">Lema</label>
                <input type="text" class="form-control" id="company-statement" value="<?php echo $empresa['lema'] ?>">
              </div>
              <div class="form-group">
                <label for="company-phone1">Telefono1</label>
                <input type="tel" class="form-control" id="company-phone1" value="<?php echo $empresa['telefono1'] ?>">
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
                <input type="tel" class="form-control" id="company-phone2" value="<?php echo $empresa['telefonos'] ?>">
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
        <h3 class="section-title"> Usuarios </h3>

        <div class="searcher-container main-toolbar" id="user-toolbar">
          <div class="input-group search">
            <div class="input-group-addon"><i class="material-icons">search</i></div>
            <input type="text" class="form-control searcher"  placeholder=" descripcion">
          </div>
          <div class="pull-right">
            <button class="btn btn-primary icon"><i class="material-icons"> </i></button>
          </div>
          <div class="pull-right">
           <button class="btn btn-primary icon" id="caller-user" data-toggle="modal" data-target="#new-user-modal">Agregar <i class="material-icons">add</i></button>
          </div>
        </div>

        <table class="table t-users" id="t-users" 
          data-sort-name="order" 
          data-minimum-count-columns="2" 
          data-show-pagination-switch="false"
          data-search="true"
          data-toolbar="#user-toolbar"
          data-pagination="true" 
          data-unique-id="id" 
          data-page-size="5" 
          data-page-list="[5]" 
          data-show-footer="false"
          data-striped= "false">
          <thead>
            <tr>
              <th data-field="order">No.</th>
              <th data-field="id" class="hide">ID</th>
              <th data-field="nick">Usuario</th>
              <th data-field="nombres">Nombres</th>
              <th data-field="apellidos">Apellidos</th>
              <th data-field="cedula">Cedula</th>
              <th data-field="tipo">Tipo</th>
              <th data-field="button">Estado</th>
              <th data-field="tipo_codigo" class="hide">Tipo</th>
              <th data-field="acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <?php $this->user_model->get_all_users() ?>
          </tbody>
        </table>
      </div>

    <!-- ******************************
      *     Sección de los usuarios   *
      *                               *
    ********************************-->

      <div class="company-details" id="caja-section">
        <h3 class="section-title"> Caja Chica </h3>

        <div class="searcher-container main-toolbar" id="caja-toolbar">
          <div class="input-group search">
            <div class="input-group-addon"><i class="material-icons">search</i></div>
            <input type="text" class="form-control searcher"  placeholder=" descripcion">
          </div>
          <div class="input-group search">
            <div class="input-group-addon"><i class="material-icons">person_pin</i></div>
            <select name="" class="form-control" id="caja-user">
              <?php $this->user_model->get_users_list(); ?>
            </select>
          </div>
          <div class="input-group search">
            <div class="input-group-addon"><i class="material-icons">event</i></div>
            <input type="date" class="form-control caja-for-date" id="caja-date" placeholder="Fecha">
          </div>
          <div class="pull-right">
            <button class="btn btn-primary icon" data-toggle="modal" data-target="#retire-money-modal"><i class="material-icons">remove</i></button>
          </div>
          <div class="pull-right">
            <button class="btn btn-primary icon" data-toggle="modal" data-target="#add-money-modal"><i class="material-icons mi__single">add</i></button>
          </div>
        </div>

        <table class="table t-users" id="caja" 
          data-sort-name="order" 
          data-minimum-count-columns="2" 
          data-show-pagination-switch="false"
          data-search="true"
          data-toolbar="#caja-toolbar"
          data-pagination="true" 
          data-search= "true"
          data-unique-id="id" 
          data-page-size="5" 
          data-page-list="[5,10,50, 100]" 
          data-show-footer="false"
          data-striped= "false">
          <thead>
            <tr>
              <th data-field="id" class="hide">COD</th>
              <th data-field="fecha">Fecha</th>
              <th data-field="descripcion">Descripcion</th>
              <th data-field="ingreso">Ingreso</th>
              <th data-field="salida">Salida</th>
              <th data-field="saldo">Saldo de Caja</th>
              <th data-field="autor">Hecha Por</th>
            </tr>
          </thead>
          <tbody>
           <?php $this->caja_chica_model->get_rows(); ?>
          </tbody>
        </table>
      </div>

  <!-- ******************************
      *     Ajustes de progamas       *
      *                               *
    ********************************-->
  <div class="company-details" id="settings-section">
  <?php $empresa = $this->company_model->get_empresa();
          ?>
  <h3 class="section-title"> Ajustes del Programa</h3>
  <form action="">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="company-name">Monto de la mora</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">&percnt;</i></div>
            <input type="number" class="form-control" id="settings-mora" value="<?php echo $settings['cargo_mora'] ?>">
          </div>
        </div>
        <div class="form-group">
          <label for="company-phrase">Fecha de Corte</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">event</i> </div>
            <input type="number" class="form-control" id="settings-fecha-corte" value="<?php echo $settings['fecha_corte'] ?>">
          </div>
        </div>
        <div class="form-group">
          <label for="company-phone1">Monto de Reconexion</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">attach_money</i></div>
            <input type="number" class="form-control" id="settings-reconexion" value="<?php echo $settings['reconexion'] ?>">
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="company-name">Penalizacion Por Cancelacion:</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">&percnt;</i></div>
            <input type="number" class="form-control" id="settings-penalizacion-cancelacion" value="<?php echo $settings['penalizacion_cancelacion'] ?>">
          </div>
        </div>
        <div class="form-group">
          <label for="company-name">Meses Por defecto de un contrato:</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">event_note</i></div>
            <input type="number" class="form-control" id="settings-meses-por-defecto" value="<?php echo $settings['meses_por_defecto'] ?>">
          </div>
        </div>
        <div class="form-group">
          <label for="company-name"> Split Day </label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">event</i></div>
            <input type="number" class="form-control" id="settings-split-day" value="<?php echo $settings['split_day'] ?>">
          </div>
        </div>
        <div class="right">
          <input id="btn-update-settings" type="submit" value="Guardar Datos">
        </div>

      </div>
  </form>
  </div>

</div>
  <!-- ******************************
      *     Ajustes de programas       *
      *                               *
    ********************************-->
    
    <div class="company-details" id="message-settings-section">
  <h3 class="section-title"> Ajustes de Mensajes</h3>
  <form action="">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="company-name">Correo Electronico</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">email</i></div>
            <input type="email" class="form-control" v-model="config.email">
          </div>
        </div>
        <div class="form-group">
          <label for="company-phrase">Codigo Pais</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">settings_phone</i> </div>
            <select name="" class="form-control" v-model="config.country_id">
              <option value="1">RD (+1)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="company-phone1">ID Telefono</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">phone</i></div>
            <input type="number" class="form-control" v-model="config.device_id">
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="company-name">Contraseña</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">lock_outline</i></div>
            <input type="password" class="form-control" v-model="config.password" >
          </div>
        </div>
        <div class="form-group">
          <label for="company-name">Margen Entre Mensajes</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">access_time</i></div>
            <input type="number" class="form-control" v-model="config.start_at">
          </div>
        </div>
        <div class="form-group">
          <label for="company-name">Tiempo de Expiracion</label>
          <div class="input-group">
            <div class="input-group-addon"><i class="material-icons">access_time</i></div>
            <input type="number" class="form-control" v-model="config.expires_at" >
          </div>
        </div>
        <div class="right">
          <input  type="submit" value="Revisar" @click.prevent.stop="saveSettings">
        </div>

      </div>
  </form>
  </div>
</div>

</div>

</div>