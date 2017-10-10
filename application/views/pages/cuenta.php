<div class="screen clients row">
  <div class="left-navigation administrador col-md-2 hidden-xs">
    <ul class="aside-nav">
      <li class="aside-buttons"><a href="#acount-section"><i class="material-icons">description</i> Cuenta</a></li>
    </ul>
  </div>

  <div class="main-content col-md-10">
    <div class="section-player">

      <div class="company-details" id="acount-section">
        <?php 
          $user_data = get_user_data()
         ?>
        <h3> Detalles de la Cuenta</h3>
        <form action="">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Nombre de Usuario</label>
                <input type="text" class="form-control" id="acount-user" value="" v-model="user.nickname" disabled>
              </div>
               <div class="form-group">
                 <label>Contraseña actual</label>
                 <input id="acount-current-password" type="password" class="form-control" v-model="currentPassword" @keyup="confirmPassword">
              </div>
              <div class="form-group" :class="states" v-if="isChangePassword">
                <label>Nueva Contraseña</label>
                <input type="password" class="form-control" v-model="newPassword" @keyup="checkPassword">
              </div>
              <div class="form-group" :class="states" v-if="isChangePassword">
                <label for="company-phone1">Confirmar Nueva Contraseña</label>
                <input type="password" class="form-control" v-model="passwordConfirm" @keyup="checkPassword">
              </div>
              <h4 v-if="!isChangePassword" class="text-primary">Para cambiar la contraseña escriba su contraseña actual</h4>
            </div>

            <div class="col-md-6">
              <div class="form-group hide">
                <label>COD</label>
                <input type="text" class="form-control" id="acount-user-id" value="<?php echo $user_data['user_id']?>" disabled>
              </div>
              <div class="form-group">
                <label for="company-name">Email</label>
                <input type="email" class="form-control"  v-model="user.email">
              </div>
              <div class="form-group">
                <label for="company-name">Nombre</label>
                <input type="text" class="form-control" id="company-direction" v-model="user.fullname" disabled>
              </div>
              <div class="form-group">
                <label for="company-name">Tipo de Cuenta</label>
                <input type="text" class="form-control" id="company-description" v-model="user.role" disabled>
              </div>
              <div class="form-group">
                <label for="company-name">Cedula(sin guiones)</label>
                <input type="text" class="form-control" id="company-phone2" v-model="user.dni" disabled>
              </div>
              <div class="right">
                <input type="submit" value="Guardar Datos" @click.prevent="updateInfo">
              </div>

            </div>
        </form>
        </div>
      </div>
  </div>

</div>