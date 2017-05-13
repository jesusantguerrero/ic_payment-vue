<div class="screen clients row">
  <div class="left-navigation administrador col-md-2">
    <ul class="aside-nav">
      <li class="aside-buttons"><a href="#company-section"><i class="material-icons">description</i> Empresa</a></li>
      <li class="aside-buttons"><a href="#user-section"><i class="material-icons">person_pin</i> Usuarios</a></li>
      <li class="aside-buttons"><a href="#constants"><i class="material-icons">delete</i> Constantes</a></li>
    </ul>
  </div>

  <div class="main-content col-md-10">
    <div class="section-player">

    <!-- *******************************
      *     Sección de la compa;ia     *
      *                                *
    **********************************-->

    <div class="company-details" id="company-section">
      <h3> Detalles de la Empresa</h3>
      <form action="">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="company-name">Nombre de la Empresa</label>
              <input type="text" class="form-control" id="company-name" placeholder="ISC Services">
            </div>
            <div class="form-group">
              <label for="company-phrase">Lema</label>
              <input type="text" class="form-control" id="company-phrase" placeholder="ISC Services">
            </div>
            <div class="form-group">
              <label for="company-phone1">Telefono1</label>
              <input type="text" class="form-control" id="company-phone1" placeholder="ISC Services">
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="company-name">Direccion</label>
              <input type="text" class="form-control" id="company-name" placeholder="ISC Services">
            </div>
            <div class="form-group">
              <label for="company-name">Descripción</label>
              <input type="text" class="form-control" id="company-name" placeholder="ISC Services">
            </div>
            <div class="form-group">
              <label for="company-name">Telefono2</label>
              <input type="text" class="form-control" id="company-name" placeholder="ISC Services">
            </div>
            <div class="right">
              <input type="submit" value="Guardar Datos">
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

    <table class="table t-users">
      <tr>
        <th></th>
        <th>ID</th>
        <th>Nick</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Cedula</th>
        <th>Tipo</th>
        <th></th>
        <th>Acción</th>
      </tr>
      <tr>
      <tbody class="t-users-body">
       <?php $this->user_model->get_all_users() ?>
      </tbody>

    </table>
      </div>
    </div>
    
    </div>
   
  </div>