<div class="screen clients row">
  <div class="left-navigation col-md-2">
    <ul class="aside-nav">
      <li class="aside-buttons"><a href="" data-toggle="modal" data-target="#search-client-modal"><i class="material-icons">description</i>  Nuevo Contrato</a></li>
      <li class="aside-buttons"><a href="" id="btn-update-contract"><i class="material-icons">edit</i>Editar Contrato</a></li>
      <li class="aside-buttons"><a href="" id="btn-cancel-contract"><i class="material-icons" >delete</i>Cancelar Contrato</a></li>
      <li class="aside-buttons"><a href="" id="btn-see-in-detail"><i class="material-icons" >find_in_page</i>Ver Detalles</a></li>
      <li class="aside-buttons"><a href="" id="btn-pay"><i class="material-icons" >monetization_on</i>Registrar Pago</a></li>
      <li class="aside-buttons"><a href="" id="btn-add-extra"><i class="material-icons" >more</i>Extras</a></li>
    </ul>

  </div>
  <div class="main-content col-md-10">
    <div class="searcher-container">
      <input type="text" class="searcher" id="contract-searcher">
    </div>

    <div class="busquedas">
      <button class="tab-buttons" href="">Activos</button>
      <button class="tab-buttons" href="">Morosos</button>
      <button class="tab-buttons" href="">Cancelados</button>
      <button class="tab-buttons" href="">Ver Todos</button>
    </div>

    <div class="table" id="t-contracts">
      <table class="table table-hovered t-contracts innertable">
        <thead>
          <tr>
            <th>Cod</th>
            <th>Cliente</th>
            <th>Fecha Inicio</th>
            <th>Servicio</th>
            <th>Meses</th>
            <th>Ultimo Pago</th>
            <th>Proximo Pago</th>
            <th>Monto Pagado</th>
            <th>Monto Total</th>
          </tr>
        </thead>
        <tbody>
          <?php $this->contract_view_model->get_contract_view('activo'); ?>
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
            <span
              class="total-rows">
              <?php $this->contract_view_model->count_contracts()?>
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