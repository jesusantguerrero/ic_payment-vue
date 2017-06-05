<div class="screen reports row">
  <div class="col-md-12">
    <!-- main tab -->
    <div>

      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#ingresos" aria-controls="home" role="tab" data-toggle="tab">Lista de Averías</a></li>
        <li role="presentation"><a href="#pagos" aria-controls="profile" role="tab" data-toggle="tab">Instalaciones</a></li>
        <li role="presentation"><a href="#balance" aria-controls="messages" role="tab" data-toggle="tab">Deudores</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content mylists">
        <div role="tabpanel" class="tab-pane active" id="ingresos">
          <div class="wide-chart">
            <canvas class="graphics chart" id="mychart"></canvas>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="pagos">
          <?php $this->report_model->get_installations(); ?>
        </div>
        <div role="tabpanel" class="tab-pane" id="balance">...</div>
      </div>

    </div>

    <!-- end of main tab-->
  </div>
</div>