<template>
    <div role="tabpanel" class="tab-pane active fade in" id="cuadre-primario">
      <form action="" class="tabla-dinero">

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Tipo de Moneda</label>
          <div class="col-sm-4">
            <label for="staticEmail" class="col-sm-2 col-form-label">Cantidad</label>
          </div>
          <div class="col-sm-4">
            <label for="staticEmail" class="col-sm-2 col-form-label">Total</label>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">monedas RD$ 1</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="1" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total1" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">monedas RD$ 5</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="5" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total5" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">monedas RD$ 10</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="10" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total10" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">billetes RD$ 20</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="20" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total20" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">monedas RD$ 25</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="25" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total25" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">billetes RD$ 50</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="50" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total50" data-unit="2000" @keyup="changeTotal" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">billetes RD$ 100</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="100" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total100" data-unit="2000" @keyup="changeTotal" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">billetes RD$ 200</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="200" value="" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total200" data-unit="2000" @keyup="changeTotal" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">biletes RD$ 500</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="500" value="" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total500" data-unit="2000" @keyup="changeTotal" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">biletes RD$ 1000</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="1000" value="" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total1000" data-unit="2000" @keyup="changeTotal" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">billetes RD$ 2000</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" data-unit="2000" value="" @keyup="changeTotal">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model="conteo.total2000" disabled>
          </div>
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Total en efectivo</label>
          <div class="col-sm-4">
          </div>
          <div class="col-sm-4">
            <input type="number" class="form-control" id="total-efectivo-caja" v-bind:value="getTotal" disabled>
          </div>
        </div>

      </form>
  </div>
</template>

<script>
  export default {
    props: {
      conteo: {
        type: Object,
        required: true
      }
    }
  };
</script>

