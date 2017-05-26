<?php $user_data = get_user_data() ?>

<div class="user-info-tip">
<ul class="current-user">
  <li><a href=""><b><?php echo $user_data['fullname'] ?></b></a></li>
  <li><a href=""><?php echo $user_data['typestr'] ?></a></li>
</ul>
<ul>
  <li><a href="<?php echo base_url('app/admin/administrador')?>">
      <i class="material-icons">settings</i>Configuración</a>
  </li>
  <li><a href="<?php echo base_url('app/logout')?>">
      <i class="material-icons">power_settings_new</i> Cerrar Sesión</a>
  </li>
</ul>

</div>