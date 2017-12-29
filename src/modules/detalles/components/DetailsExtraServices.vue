<template>
  <div class="wrapper">
    <table class="table t-extras" id="t-extras" data-sort-order="asc" data-search="false" data-show-refresh="false" data-show-columns="false"
      data-show-export="false" data-minimum-count-columns="2" data-show-pagination-switch="false" data-pagination="true" data-id-field="id_extra"
      data-page-size="20" data-page-list="[10,20,50,All]" data-show-footer="false" data-click-to-select="true" data-single-select="true">
      <thead>
        <tr>
          <th data-field="controls"></th>
          <th data-field="id_extra" class="hide">COD</th>
          <th data-field="id_servicio" class="hide">SER</th>
          <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
          <th data-field="fecha">Fecha</th>
          <th data-field="concepto">Concepto</th>
          <th data-field="ultimo_pago">Ultimo Pago</th>
          <th data-field="monto_pagado">Monto Pagado</th>
          <th data-field="deuda">Monto Pendiente</th>
          <th data-field="monto_total">Monto Total</th>
          <th data-field="estado">Estado</th>
        </tr>
      </thead>
      <tbody>
        <?php echo $this->extra_model->get_all_of_client($client_data['id_cliente']) ?>
      </tbody>
    </table>

    <form class="card" id="app-pago-extra" :class="{visible: visible}" novalidate>
      <div class="row">
        <h4 class="col-md-10">{{extra.concepto}}</h4>
        <div class="col-md-1 mb-1">
          <button class="btn btn-gray lg" type="submit" @click.prevent.stop="goBack">
            <i class="material-icons">arrow_back</i>
          </button>
        </div>
        <div class="col-md-1 mb-1">
          <button class="btn btn-gray lg" type="submit" @click.prevent.stop="generatePayment">
            <i class="material-icons">add</i>
          </button>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validationCustom01">Pago</label>
          <select type="text" class="form-control" id="select-extra-payment"></select>
        </div>
        <div class="col-md-6 mb-3">
          <label for="validationCustom02">Concepto</label>
          <input type="text" class="form-control" id="validationCustom02" v-model="recibo.detalles_extra">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validationCustom01">Detalle</label>
          <input type="text" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
          <label for="validationCustom02">Fecha</label>
          <input type="date" class="form-control" id="validationCustom02" v-model="recibo.fecha_pago">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="validationCustom03">Monto Abonado</label>
          <input type="number" class="form-control" id="validationCustom03" v-model="recibo.cuota">
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationCustom05">Modo Pago</label>
          <select type="text" class="form-control" id="validationCustom05" v-model="recibo.tipo">
            <option value="efectivo">Efectivo</option>
            <option value="banco">Banco</option>
          </select>
          <br>
        </div>
        <div class="col-md-3 mb-3">
          <label for="">Recibo</label>
          <br>
          <p :class="{hide: hide_recibo}">
            <a target="printframe" :href="url_recibo">
              <i class="material-icons">description</i>
            </a> {{recibo.estado}}</p>
        </div>
      </div>
      <div class="row" :class="firstControls">
        <div class="col-md-6 mb-3">

        </div>
        <div class="col-md-3 mb-3">
          <button class="btn btn-primary lg" type="submit" @click.prevent.stop="deletePayment">Eliminar Pago</button>
        </div>
        <div class="col-md-3 mb-3" v-if="!isPagado">
          <button class="btn btn-primary lg" type="submit" @click.prevent.stop="applyPayment">Aplicar Pago</button>
        </div>
        <div class="col-md-3 mb-3" v-if="isPagado">
          <button class="btn btn-success lg" type="submit" @click.prevent.stop="editPayment">Cambiar</button>
        </div>
      </div>
    </form>
  </div>
</template>
