<div class="screen clients row">
  <div class="left-navigation col-md-2">
    <ul class="aside-nav">
      <li class="aside-buttons">
        <a href="" data-toggle="modal" data-target="#new-client-modal"><i class="material-icons">supervisor_account</i> Nuevo Cliente</a>
      </li>
      <li class="aside-buttons">
        <a href=""  data-toggle="modal" data-target="#update-client-modal"><i class="material-icons">edit</i>Editar Cliente</a>
      </li>
      <li class="aside-buttons"><a href="" id="delete-client"><i class="material-icons">delete</i>Eliminar Cliente</a></li>
      <li class="aside-buttons"><a href=""><i class="material-icons">find_in_page</i>Ver Detalles</a></li>
      <li class="aside-buttons"><a href=""><i class="material-icons">description</i>  Nuevo Contrato</a></li>
    </ul>

  </div>
  <div class="main-content col-md-10">
  <div class="searcher-container">
    <input type="text" class="searcher" id="client-searcher">
  </div>
    

    <div class="busquedas">
      <button class="tab-buttons" href="">Ver Todos</button>
      <button class="tab-buttons" href="">Activos</button>
      <button class="tab-buttons" href="">Deudores</button>
    </div>

    <table class="table t-clients" id="t-clients">
      <thead>
        <tr>
          <th>No.</th>
          <th>ID #</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Cedula</th>
          <th>Celular</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <?php $this->client_model->get_all_clients(); ?>
      </tbody>
      <tfoot>
        <tr>
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
          <td><span class="min-limit">1</span>-<span class="max-limit">5</span> de <span class="total-rows"><?php $this->user_model->count_users(); ?></span></td>
          <td><i class="material-icons previous-page">keyboard_arrow_left</i> <i class="material-icons next-page">keyboard_arrow_right</i></td>

        </tr>

      </tfoot>
    </table>

  </div>


</div>