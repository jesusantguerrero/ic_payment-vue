<template>
  <table class="table t-pagos" id="t-pagos" data-minimum-count-columns="2" data-show-pagination-switch="false" data-pagination="false"
    data-id-field="id" data-page-size="-1" data-page-list="[10,20,50,-1]" data-show-footer="false" data-striped="false" data-click-to-select="true"
    data-single-select="true">
    <thead>
      <tr>
        <th data-field="deshacer"></th>
        <th data-field="id" class="hide">ID Pago</th>
        <th data-field="checkbox" data-checkbox="true" class="hide"> </th>
        <th data-field="concepto">Concepto</th>
        <th data-field="cuota">Cuota</th>
        <th data-field="mora">Mora</th>
        <th data-field="extra">Extra</th>
        <th data-field="monto">Monto</th>
        <th data-field="fecha_pago">Fecha de Pago</th>
        <th data-field="estado" data-align="center">Estado</th>
        <th data-field="fecha_limite">Vence En</th>
        <th data-field="action">Recibo</th>
        <th data-field="id_contrato" class='hide'>ID Contrato</th>
        <th data-field="control">Control</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</template>
