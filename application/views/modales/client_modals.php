<div class="modal fade" tabindex="-1" role="dialog" id="new-client-modal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Nuevo Cliente</h4>
      </div>
      <div class="modal-body">
        <div>
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#client-required" aria-controls="client-required" role="tab" data-toggle="tab">Datos Principales</a></li>
            <li role="presentation"><a href="#client-direction" aria-controls="client-direction" role="tab" data-toggle="tab">Direccion</a></li>
            <li role="presentation"><a href="#client-optional" aria-controls="client-optional" role="tab" data-toggle="tab">Opcionales</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active fade in" id="client-required">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Datos Personales</h4>
                    <div class="form-group">
                      <label for="client-name">Nombres</label>
                      <input type="text" class="form-control" id="client-name" tabindex="1">
                    </div>
                    <div class="form-group">
                      <label for="client-dni">Cedula(sin guiones)</label>
                      <input type="text" class="form-control" id="client-dni" tabindex="3" role="cedula">
                    </div>
                    <div class="form-group">
                      <label for="client-telephone">Telefono</label>
                      <input type="tel" class="form-control" id="client-telephone" tabindex="8">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder">... </h4>
                    <div class="form-group">
                      <label for="client-lastname">Apellidos</label>
                      <input type="text" class="form-control" id="client-lastname" tabindex="2">
                    </div>
                    <div class="form-group">
                      <label for="client-phone">Celular</label>
                      <input type="tel" class="form-control" id="client-phone" tabindex="4">
                    </div>

                  </div>
                </div>
              </form>
            </div>

            <!--Direction pane-->
            <div role="tabpanel" class="tab-pane fade in" id="client-direction">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Dirección</h4>
                    <div class="form-group">
                      <label for="client-provincia">Provincia</label>
                      <input type="text" class="form-control password-confirm" id="client-provincia" list="provincias" tabindex="5">
                      <datalist id="provincias">
                        <option value="La Romana">
                          <option value="Santo Domingo">
                            <option value="La Altagracia">
                      </datalist>

                    </div>
                    <div class="form-group">
                      <label for="cient-sector">Sector</label>
                      <input class="form-control" id="client-sector" tabindex="6">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder"> ...</h4>
                    <div class="form-group">
                      <label for="client-street">Calle</label>
                      <input type="text" class="form-control" id="client-street" tabindex="6">
                    </div>

                    <div class="form-group">
                      <label for="client-house">Casa #</label>
                      <input type="text" class="form-control" id="client-house" tabindex="7">
                    </div>
                  </div>
                  <div class="col-md-12">
                  <div class="form-group">
                    <label for="u-client-house">Detalle de Direccion</label>
                    <textarea name="" class="form-control" id="client-direction-details" tabindex="8" cols="30" rows="5"></textarea>
                  </div>
                </div>
                </div>
              </form>

            </div>
            <!--end of direction pane-->

            <div role="tabpanel" class="tab-pane fade in" id="client-optional">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Datos Personales +</h4>
                    <div class="form-group">
                      <label for="client-job">Lugar de Trabajo</label>
                      <input type="text" class="form-control" id="client-job">
                    </div>
                    <div class="form-group">
                      <label for="client-salary">Salario</label>
                      <input type="number" class="form-control password" id="client-salary" value="0">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder">...</h4>
                    <div class="form-group">
                      <label for="client-job-number">Telefono del trabajo</label>
                      <input type="tel" class="form-control" id="client-job-telephone">
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal" tabindex="9">Cancelar</button>
        <button type="button" class="btn save" id="btn-save-client" tabindex="10">Guardar</button>
      </div>

    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->


<!--*************************************************************************
*
*                                 Update Client Modal
*
**************************************************************************-->

<div class="modal fade" tabindex="-1" role="dialog" id="update-client-modal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Editar Cliente</h4>
      </div>
      <div class="modal-body">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#u-client-required" aria-controls="required" role="tab" data-toggle="tab">Datos Principales</a></li>
            <li role="presentation"><a href="#u-client-direction" aria-controls="direction" role="tab" data-toggle="tab">Direccion</a></li>
            <li role="presentation"><a href="#u-client-optional" aria-controls="optional" role="tab" data-toggle="tab">Opcionales</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active" id="u-client-required">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Datos Personales</h4>
                    <div class="form-group">
                      <label for="u-client-name">Nombres</label>
                      <input type="text" class="form-control" id="u-client-name" tabindex="1">
                    </div>
                    <div class="form-group">
                      <label for="u-client-dni">Cedula(sin guiones)</label>
                      <input type="text" class="form-control" id="u-client-dni" tabindex="3">
                    </div>
                    <div class="form-group">
                      <label for="u-client-telephone">Telefono</label>
                      <input type="tel" class="form-control" id="u-client-telephone" tabindex="8">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder">... </h4>
                    <div class="form-group">
                      <label for="u-client-lastname">Apellidos</label>
                      <input type="text" class="form-control" id="u-client-lastname" tabindex="2">
                    </div>
                    <div class="form-group">
                      <label for="u-client-phone">Celular</label>
                      <input type="tel" class="form-control" id="u-client-phone" tabindex="4">
                    </div>
                  </div>
                </div>
              </form>

            </div>
            <div role="tabpanel" class="tab-pane fade in" id="u-client-direction">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Dirección</h4>
                    <div class="form-group">
                      <label for="u-client-provincia">Provincia</label>
                      <input type="text" class="form-control password-confirm" id="u-client-provincia" list="provincias" tabindex="5">
                      <datalist id="provincias">
                        <option value="La Romana">
                          <option value="Santo Domingo">
                            <option value="La Altagracia">
                      </datalist>

                    </div>
                    <div class="form-group">
                      <label for="cient-sector">Sector</label>
                      <input class="form-control" id="u-client-sector" tabindex="6">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder"> ...</h4>
                    <div class="form-group">
                      <label for="u-client-street">Calle</label>
                      <input type="text" class="form-control" id="u-client-street" tabindex="6">
                    </div>

                    <div class="form-group">
                      <label for="u-client-house">Casa #</label>
                      <input type="text" class="form-control" id="u-client-house" tabindex="7">
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="u-client-house">Detalle de Direccion</label>
                    <textarea name="" class="form-control" id="u-client-direction-details" tabindex="8" cols="30" rows="5"></textarea>
                  </div>
                </div>
              </form>

            </div>
            <div role="tabpanel" class="tab-pane fade in" id="u-client-optional">
              <form action="">
                <div class="row">
                  <div class="col-md-6">
                    <h4>Datos Personales +</h4>
                    <div class="form-group">
                      <label for="u-client-job">Lugar de Trabajo</label>
                      <input type="text" class="form-control" id="u-client-job">
                    </div>
                    <div class="form-group">
                      <label for="u-client-salary">Salario</label>
                      <input type="number" class="form-control password" id="u-client-salary">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h4 class="placeholder">...</h4>
                    <div class="form-group">
                      <label for="u-client-job-number">Telefono del trabajo</label>
                      <input type="tel" class="form-control" id="u-client-job-telephone">
                    </div>
                  </div>
                </div>
              </form>

            </div>

          </div>

        </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal" tabindex="9">Cancelar</button>
        <button type="button" class="btn save" id="btn-update-client" tabindex="10">Actualizar</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<!--*********************************************************************
*
*                                 Search Client Modal
*
**************************************************************************-->

<div class="modal fade" tabindex="-1" role="dialog" id="search-client-modal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"> Nuevo Contrato</h4>
      </div>
      <div class="modal-body">
        <div>

          <div class="searcher-container main-toolbar" id="clients-toolbar" style="margin-bottom: 0">
            <div class="input-group search" style="width: 100%; margin-bottom: 5px">
              <div class="input-group-addon"><i class="material-icons">search</i></div>
              <input type="text" class="form-control searcher" id="client-searcher-newcontract" placeholder="Busque cliente por cedula, nombre, apellidos o id">
            </div>
          </div>

          <table class="table t-clients" id="t-clients" data-sort-name="id-contrato" data-sort-order="asc" data-search="false" data-show-refresh="false"
            data-show-columns="false" data-show-export="false" data-minimum-count-columns="2" data-show-pagination-switch="false"
            data-pagination="true" data-id-field="id-contrato" data-page-size="5" data-page-list="[5]" data-show-footer="false"
            data-striped="true" data-click-to-select="true" data-single-select="true">
            <thead>
              <tr>
                <th data-field="orden">No.</th>
                <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
                <th data-field="id" class="hide">ID #</th>
                <th data-field="nombres">Nombres</th>
                <th data-field="apellidos">Apellidos</th>
                <th data-field="cedula">Cedula</th>
                <th data-field="celular">Celular</th>
                <th data-field="estado">Estado</th>
                <th data-field="estadoreal" class="hide" data-sortable="true" data-searchable="true">Estado</th>
                <th data-field="nombre_completo" class="hide">Nombre Completo</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal" tabindex="9">Cancelar</button>
        <a href="#" class="btn save" id="go-new-contract" tabindex="10">Nuevo Contrato</a>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->


<!--*********************************************************************
*
*                                 Notifications Modal
*
**************************************************************************-->

<div class="modal fade contrast" tabindex="-1" role="dialog" id="notification-view">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"> Que Deseas Ver?</h4>
      </div>
      <div class="modal-body">
        <div>
          <h4>Proximos Pagos</h4>
          <button class="btn remark" id="btn-see-pagos">Ver Pagos</button>
          <h4>Deudores</h4>
          <button class="btn remark" id="btn-see-deudores">Ver Deudores</button>
          <h4>Caja Chica</h4>
          <button class="btn remark" id="btn-see-averias">ver Caja</button>
          <h4>Ganancias del dia</h4>
          <button class="btn remark" id="btn-see-day-incomes">ver Pagos</button>
        </div>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->