<template>
  <div class="main-content detalles col-md-12">
    <div class="row">
      <div class="col-xs-6 col-md-3 center-row aside-wide-left">
        <div class="page-header">
          <h3>Detalles del Cliente</h3>
        </div>

        <div class="client-profile">
          <span> //JG </span>
        </div>
        <h5> // client name </h5>
        <p class="detail-state">
          <i class="material-icons">timeline</i> // state</p>

        <div class="payment-controls <?php echo $controls_class ?>">
          <div class="input-group">
            <span class="input-group-addon" id="addon">Contrato </span>
            <!-- <select  class="form-control" id="select-contract"> // contracts </select> -->
          </div>
          <div class="box" id="payment-detail-box">
            <div class="box-header with-border">
              <h3 class="box-title">Detalles de Pago</h3>
              <div class="box-tools pull-right">
                <!-- Collapse Button -->
                <button type="button" class="mybtn btn-box-tool" data-widget="collapse">
                  <i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <h6>Forma de pago</h6>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-small payment-mode">efectivo</button>
                <button type="button" class="btn btn-small payment-mode">banco</button>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
          <button class="btn" id="btn-pay">Registrar Pago</button>
        </div>
        <div class="contract-controls hide">
          <button class="btn icon" id="btn-detail-cancel-contract" disabled>
            <i class="material-icons" title="cancelar contrato">delete</i>
          </button>
          <button class="btn icon" id="btn-detail-suspend-contract" title="suspender contrato" disabled>
            <i class="material-icons">report_problem</i>
          </button>
          <button class="btn icon" id="btn-call-reconnect" title="Reconectar" disabled>
            <i class="material-icons">fiber_smart_record</i>
          </button>
          <button class="btn icon" id="btn-call-extra" title="extras" disabled>
            <i class="material-icons">more</i>
          </button>
        </div>
      </div>
      <div class="col-md-9 wide-main-content">
        <div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist" id="main-tabs">
            <li role="presentation">
              <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Personales</a>
            </li>
            <li role="presentation">
              <a href="#contracts" aria-controls="profile" role="tab" data-toggle="tab">Contratos</a>
            </li>
            <li role="presentation">
              <a href="#payments" aria-controls="messages" role="tab" data-toggle="tab">Pagos</a>
            </li>
            <li role="presentation">
              <a href="#abonos" aria-controls="settings" role="tab" data-toggle="tab">Abonos</a>
            </li>
            <li role="presentation">
              <a href="#observations" aria-controls="settings" role="tab" data-toggle="tab">Observaciones</a>
            </li>
            <li role="presentation">
              <a href="#extras" aria-controls="settings" role="tab" data-toggle="tab">Extras
                <span class="badge"> 2</span>
              </a>
            </li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in" id="home">

            </div>


            <!---->
            <div role="tabpanel" class="tab-pane detail-panel fade in" id="contracts">

            </div>


            <!---->
            <div role="tabpanel" class="tab-pane detail-panel fade in" id="payments">

            </div>

            <!---->
            <div role="tabpanel" class="tab-pane fade in" id="abonos">

            </div>

            <!---->
            <div role="tabpanel" class="tab-pane fade in" id="observations">

            </div>

            <div role="tabpanel" class="tab-pane fade in" id="extras">

            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {

  }

</script>
