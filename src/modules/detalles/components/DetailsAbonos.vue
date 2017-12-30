<template>
  <div class="wrapper">
    <div class="form-group details-forms">

      <h5>Escribe los detalles de este abono</h5>


      <textarea name="" id="text-abono-detail" class="form-control" rows="5" required="required"></textarea>

      <h5>Control de abono de mes:</h5>

      <div class="input-group">
        <div class="input-group-addon">RD$ </div>
        <input type="number" class="form-control" id="input-abono" value="">
        <div class="input-group-addon">Pesos</div>
      </div>


    </div>



    <div class="form-group">
      <div class="col-sm-2 col-sm-offset-10">
        <button type="submit" class="btn btn-primary" id="btn-save-observations">Guardar</button>
      </div>
    </div>
  </div>
</template>
