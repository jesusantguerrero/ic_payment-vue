<?php $user_data = get_user_data() ?>

<ul class="dropdown-menu" aria-labelledby="dLabel">
  <li><a href="<?php echo base_url('app/admin/cuenta')?>"><b><?php echo $user_data['fullname'] ?></b></a></li>
  <li><a href="<?php echo base_url('app/admin/cuenta')?>"><?php echo $user_data['typestr'] ?></a></li>
  <?php if($user_data['type'] == 0): ?>
  <li><a href="<?php echo base_url('app/admin/administrador')?>">
      <i class="material-icons">settings</i>Configuración</a>
  </li>
  <?php endif; ?>
  <li><a href="<?php echo base_url('app/logout')?>">
      <i class="material-icons">power_settings_new</i> Cerrar Sesión</a>
  </li>
</ul>