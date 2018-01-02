<template>
  <table class="table d-contratos innertable" id="d-contracts" data-sort-name="id-contrato" data-sort-order="asc" data-search="false"
    data-show-refresh="false" data-show-columns="false" data-show-export="false" data-minimum-count-columns="2" data-show-pagination-switch="false"
    data-pagination="true" data-id-field="id_contrato" data-page-size="20" data-page-list="[10,20,50,All]" data-show-footer="false"
    data-click-to-select="true" data-single-select="true">
    <thead>
      <tr>
        <th data-field="id_contrato">COD</th>
        <th data-field="ip">IP</th>
        <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
        <th data-field="fecha">Fecha</th>
        <th data-field="meses">(Meses)</th>
        <th data-field="ultimo-pago">Ultimo Pago</th>
        <th data-field="proximo-pago">Proximo Pago</th>
        <th data-field="monto-pagado">Monto Pagado</th>
        <th data-field="monto-total">Monto Total</th>
        <th data-field="estado">Estado</th>
        <th data-field="actions">Documentos</th>
        <th data-field="id_cliente" class="hide">id cliente</th>
        <th data-field="cedula" class="hide">cedula</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</template>

