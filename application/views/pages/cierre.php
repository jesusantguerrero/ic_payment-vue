<div class="container-fluid cierre2" id="app-cierre">
	<?php $user_data = get_user_data(); ?>
	<div class="row welcome-screen">
		<div class="col-md-8 col-xs-12 main-card">
			<div class="tab-content-cierre">
				<!-- Nav tabs -->
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#cuadre-primario" aria-controls="cuadre-primario" role="tab" data-toggle="tab">Cuadre Primario</a></li>
					<li role="presentation"><a href="#registro-gastos" aria-controls="registro-gastos" role="tab" data-toggle="tab">Registro de Gastos</a></li>
					<li role="presentation"><a href="#cuadre-final" aria-controls="cuadre-final" role="tab" data-toggle="tab">Cuadre Final</a></li>
				</ul>

				<!-- Tab panes -->
				<div class="tab-content">
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

					<!--Direction pane-->
					<div role="tabpanel" class="tab-pane fade in" id="registro-gastos">
						<form action="">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="cient-sector">Descripcion</label>
										<input class="form-control" v-model="gasto.descripcion" tabindex="6">
									</div>
								</div>


								<div class="col-md-6">
									<div class="form-group">
										<label for="client-street">Monto</label>
										<div class="input-group normal-height">
											<input type="number" class="form-control" v-model="gasto.monto" tabindex="6">
											<span class="input-group-btn">
						  					<button class="btn btn-secondary" type="button" @click="addGasto"><i class="material-icons">add</i></button>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<h4 class="col-md-12 col-lg-12">Gastos</h4>
								<br>
							</div>
							<div class="row">
								<div class="col-md-12">
									<ul class="list-group lista-gastos">
										<li class="list-group-item" v-for="gasto in gastos">{{gasto.descripcion}}<span class="money">RD$ {{gasto.monto}}</span>
											<button class="btn list-action borrar-gasto" :data-id="gasto.id_gasto" @click.prevent="deleteGasto">
												<i class="material-icons" :data-id="gasto.id_gasto">delete</i>
											</button>
										</li>
									</ul>
								</div>
							</div>
						</form>

					</div>
					<!--end of direction pane-->

					<div role="tabpanel" class="tab-pane fade in" id="cuadre-final">
						<form action="">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label for="client-job">Ingresos Totales</label>
										<input type="number" class="form-control" v-model="data_cierre.total_ingresos" disabled>
									</div>
									<div class="form-group">
										<label for="client-salary">Gastos Totales</label>
										<input type="number" class="form-control password" v-model="data_cierre.total_gastos" disabled>
									</div>
									<div class="form-group">
										<label for="client-job-number">Ganacia(Banco)</label>
										<input type="number" class="form-control" v-model="data_cierre.banco" disabled>
									</div>
								</div>

								<div class="col-md-6 t-center">
									<h5>Fecha: <span id="fecha-cierre will-load">{{fecha}}</span></h5>
									<h5>Autor <span id="autor-cierre"><?php echo $user_data['fullname']?></span></h5>
									<button class="btn" @click.prevent="cerrarCaja">Cerrar Caja</button>

								</div>
							</div>
						</form>
					</div>

				</div>

			</div>
		</div>


		<div class="col-md-4 col-xs-12 details-card">
			<div class="layout-container">
				<div class="day-income-layer">
					<h3 class="card-title" data-toggle="modal" data-target="#notification-view">Ingresos en Efectivo</h3>
					<div class="list-repair centered-container">
				

						<a target="_blank" href="<?php echo base_url('process/getreport/payment/today') ?>">
							<h2 class="current-saldo will-load"> RD$ {{ data_cierre.pagos_efectivo}}</h2>
						</a>
						<br>
						<h4 data-toggle="modal" data-target="#caja-mayor-modal" class="special-caller"><i class="material-icons">lock_open</i>Dinero Real en Caja</h4>
						<h2 class="current-saldo my-caja will-load"> RD$ {{ suma }} </h2>
					</div>
				</div>
				<div class="pagos-layer">

				</div>
				<div class="averias-layer">

				</div>
				<div class="deudores-layer">

				</div>
			</div>
		</div>

	</div>
	<div class="row home-options-container">
		<div class="col-md-8 hidden-xs shortcuts-container">
			<div class="col-md-4 shortcut" id="caller-new-client" data-toggle="modal" data-target="#new-client-modal">
				<p class="section-title">Pagos de factura</h4>
					<p class="will-load">RD$ {{data_cierre.pagos_facturas}}</p>
			</div>
			<div class="col-md-4 shortcut" data-toggle="modal" data-target="#search-client-modal">
				<p class="section-title">Pagos Extras</p>
				<p class="will-load">RD$ {{data_cierre.pagos_extras}}</p>
			</div>
			<div class="col-md-4 shortcut" data-toggle="modal" data-target="#search-client-modal">
				<p class="section-title">Pagos Via Banco</h4>
					<p class="will-load">RD$ {{ data_cierre.pagos_banco}}</p>
			</div>
			<div class="col-md-4 shortcut" id="caller-new-client" data-toggle="modal" data-target="#add-extra-modal">
				<p class="section-title">Total Ingresos</p>
				<p class="will-load">RD$ {{ data_cierre.total_ingresos}}</p>
			</div>
		</div>
		<div class="col-md-4 clock-card">
			<h3 class="card-title t-center">Diferencia</h3>
			<h4 class="t-center will-load"> RD$ {{ data_cierre.total_descuadre}}</h4>
		</div>

	</div>

</div>


<script>
	$(function () {
		// $(".welcome-screen").animate({height:""})
		$(".tab-content-cierre").css({
			height: "100%",
			overflow: "auto"
		})
	})
</script>