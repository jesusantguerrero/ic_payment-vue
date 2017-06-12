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
  <div class="table-container">
    <div id="toolbar">
      <button id="remove" class="btn btn-danger" disabled>
        <i class="glyphicon glyphicon-remove"></i> Delete
      </button>
    </div>

     <table data-toggle="table" id="t-contracts" class="t-contracts innertable"
               data-sort-name="cod"
               data-sort-order="asc"
               data-toolbar="#toolbar"
               data-search="true"
               data-show-refresh="true"
               data-show-toggle="true"
               data-show-columns="true"
               data-show-export="true"
               data-minimum-count-columns="2"
               data-show-pagination-switch="true"
               data-pagination="true"
               data-page-size= "5"
               data-id-field="payment"
               data-page-list="[5]"
               data-show-footer="false">
              <thead>
                  <tr>
                      <th data-field="cod"  data-sortable="true">Cod</th>
                      <th data-field="cliente"  data-sortable="true">Cliente</th>
                      <th data-field="fecha" data-sortable="true">Fecha Inicio</th>
                      <th data-field="servicio" data-sortable="true">Servicio</th>
                      <th data-field="meses"  data-sortable="true">Meses</th>
                      <th data-field="ultimo_pago"  data-sortable="true">Ultimo Pago</th>
                      <th data-field="proximo_pago"  data-sortable="true">Proximo Pago</th>
                      <th data-field="monto_pagado"  data-sortable="true">Monto Pagado</th>
                      <th data-field="monto_total"  data-sortable="true">Monto Total</th>
                  </tr>
              </thead>
              <tbody>
                 <?php $this->contract_view_model->get_contract_view('activo'); ?>
              </tbody>
            </table>
  </div>
   
  </div>


</div>