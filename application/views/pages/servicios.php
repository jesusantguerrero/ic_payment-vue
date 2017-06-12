<div class="screen clients row">
  <div class="left-navigation col-md-2">
    <ul class="aside-nav">
      <li class="aside-buttons">
        <a href="" data-toggle="modal" data-target="#new-service-modal"><i class="material-icons">add</i>  Nuevo Servicio</a>
      </li>
      <li class="aside-buttons"><a href="" id="edit-service"><i class="material-icons">edit</i>Editar Servico</a></li>
      <li class="aside-buttons"><a href="" id="delete-service"><i class="material-icons">delete</i>Eliminar Servicio</a></li>
      <li class="aside-buttons"><a href=""><i class="material-icons">find_in_page</i>Ver Detalles</a></li>
    </ul>

  </div>
  <div class="main-content col-md-10">
  <h2 class="subsection-title">Servicios <small>:Administracion de servicios y reparaciones</small></h2> 
    <div class="searcher-container">
      <input type="text" class="searcher" id="client-searcher">
    </div>

    <div class="table" id="t-services">
      <table class="table t-services innertable">
        <thead>
          <tr>
            <th>No. </th>
            <th>ID #</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Mensualidad</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          <?php $this->service_model->get_all_services(); ?>
        </tbody>
      </table>
      <div class="table-foot">
        <div class="pagination-labels">
          <div>
            <select name="perpage" id="per-page" class="per-page">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>  
          </select>
          </div>
          <div><span class="min-limit">1</span>-<span class="max-limit-visible">5</span><span class="max-limit">5</span> de
            <span class="total-rows">
              <?php echo $this->service_model->count_services(); ?>
              </span>
          </div>
          <div> Registros</div>
        </div>

        <div class="pagination-controllers">
          <div><i class="material-icons previous-page">keyboard_arrow_left</i> <i class="material-icons next-page">keyboard_arrow_right</i></div>
        </div>
      </div>
    </div>

  </div>


</div>