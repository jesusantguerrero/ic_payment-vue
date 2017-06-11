<div class="screen clients row">
  <div class="left-navigation administrador col-md-2">
    <ul class="aside-nav">
      <li class="aside-buttons"><a href="#acount-section"><i class="material-icons">description</i> Cuenta</a></li>
    </ul>
  </div>

  <div class="main-content col-md-10">
    <div class="section-player">

      <!-- *******************************
      *     Sección de la compa;ia     *
      *                                *
    **********************************-->

      <div class="company-details" id="acount-section">
        <?php 
          $user_data = get_user_data()
         ?>
        <h3> Detalles de la Cuenta</h3>
        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="company-name">Nombre de Usuario</label>
                <input type="text" class="form-control" id="company-name" value="<?php echo $user_data['nickname'] ?>">
              </div>
              <div class="form-group">
                <label for="company-phrase">Contraseña</label>
                <input type="text" class="form-control" id="company-statement">
              </div>
              <div class="form-group">
                <label for="company-phone1">Confirmar contraseña</label>
                <input type="text" class="form-control" id="company-phone1">
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="company-name">Nombre</label>
                <input type="text" class="form-control" id="company-direction" value="<?php echo $user_data['fullname'] ?>" disabled>
              </div>
              <div class="form-group">
                <label for="company-name">Tipo de Cuenta</label>
                <input type="text" class="form-control" id="company-description" value="<?php echo $user_data['typestr']?>" disabled>
              </div>
              <div class="form-group">
                <label for="company-name">Cedula</label>
                <input type="text" class="form-control" id="company-phone2" value="<?php echo $user_data['dni'] ?>" disabled>
              </div>
              <div class="right">
                <input id="update-user-data" type="submit" value="Guardar Datos">
              </div>

            </div>
        </form>
        </div>
      </div>
  </div>

</div>