<div class="screen clients row">
  <div class="left-navigation col-md-2">
    <div class="left-navigation__header">
       <h3 class="left-navigation__header-text"><?php echo ucfirst($title) ?></h3>  
    </div>
    <ul class="aside-nav">
      <li class="aside-buttons">
        <a href="" data-toggle="modal" data-target="#new-client-modal"><i class="material-icons">supervisor_account</i> Nuevo Cliente</a>
      </li>
      <li class="aside-buttons">
        <a href="" id="update-client" data-toggle="modal" data-target="#update-client-modal"><i class="material-icons">edit</i>Editar Cliente</a>
      </li>
      <li class="aside-buttons"><a href="" id="delete-client"><i class="material-icons">delete</i>Eliminar Cliente</a></li>
      <li class="aside-buttons"><a href="" id="get-details"><i class="material-icons">find_in_page</i>Ver Detalles</a></li>
      <li class="aside-buttons"><a href="" id="client-new-contract"><i class="material-icons">description</i>  Nuevo Contrato</a></li>
    </ul>

  </div>
  <div class="main-content col-md-10">
  <h2 class="subsection-title">Clientes</h2> 
    <div class="searcher-container">
      <input type="text" class="searcher" id="client-searcher" placeholder="Busque cliente por cedula, nombre, apellidos o id">
    </div>
    
    <div class="table" id="t-clients">
      <table class="table t-clients innertable">
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
      </table>
      <div class="table-foot">
        <div class="pagination-labels">
          <div>
            <select name="perpage" id="per-page" class="per-page">
            <option value="5">5</option>
            <option value="10">10</option>  
          </select>
          </div>
          <div><span class="min-limit">1</span>-<span class="max-limit-visible">5</span><span class="max-limit">5</span> de
            <span class="total-rows">
              <?php $this->client_model->count_clients()?>
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