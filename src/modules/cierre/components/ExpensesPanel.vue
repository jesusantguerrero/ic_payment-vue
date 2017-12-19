<template>
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
                <button class="btn btn-secondary icon" type="button" @click="addGasto"><i class="material-icons">add</i></button>
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
            <li class="list-group-item" :key="gasto.id_gasto" v-for="gasto in gastos">{{ gasto.descripcion }}<span class="money">RD$ {{gasto.monto}}</span>
              <button class="btn list-action borrar-gasto" :data-id="gasto.id_gasto" @click.prevent="deleteGasto">
                <i class="material-icons" :data-id="gasto.id_gasto">delete</i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import utils from './../../sharedComponents/utils';

  const gasto = {
    fecha: '',
    descripcion: '',
    monto: '',
  };

  const gastos = [{
    fecha: utils.now(),
    descripcion: 'hola',
    monto: 2000,
    id_gasto: 1
  }];

  export default {
    data() {
      return {
        gasto,
        gastos
      };
    },

    methods: {

      addGasto() {
        this.gasto.fecha = utils.now();
        this.$http.post('caja/add_gasto', this.getDataform(this.gasto))
          .then((res) => {
            this.showMessage(res.data.message);
            this.fillGastos(res.data.gastos, 'normal');
            this.setGastoTotal(data.total_gastos);
          });
        send.catch((err) => {
          this.$toasted.error(err);
        });
      },

      fillGastos(gastosServidor, mode) {
        if (mode === 'group') {
          if (gastosServidor != null || gastosServidor.length > 0) {
            this.gastos = gastosServidor;
          } else {
            this.gastos = [];
          }
        } else {
          this.gastos.push(JSON.parse(gastosServidor)[0]);
        }
      },

      setGastoTotal(totalGastos) {
        this.data_cierre.total_gastos = totalGastos;
      },

      getGasto() {
        const form = { idGasto: this.gasto };
        this.$http.get('caja/get_gasto', getDataForm(form))
          .then((res) => {
            this.fillGastos(res.data);
          });
      },

      deleteGasto(e) {
        let caller = e.target;
        if (caller.localname === 'i') {
          caller = caller.parentElement;
        }
        const id = caller.attributes['data-id'].value;
        swal({
          title: 'Está Seguro?',
          text: 'Seguro de que quiere eliminar este gasto?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(() => {
          const form = {
            id,
            fecha: utils.now()
          };

          this.$http.post('caja/delete_gasto', this.getDataForm(form))
            .then((res) => {
              $this.showMessage(res.data.menssage);
              this.fillGastos(data.gastos, 'group');
              this.setGastoTotal(data.total_gastos);
            })
            .catch((err) => {
              this.$toasted.error(err);
            });
        });
      },

      getGastos() {
        this.$http.post('caja/get_gastos', this.getDataForm({ fecha: utils.now() }))
          .then((res) => {
            this.showMessage(res.data.message);
            this.fillGastos(res.data.gastos, 'group');
            this.setGastoTotal(res.data.total_gastos);
          })
          .catch((err) => {
            this.$toasted.error(err);
          });
      },
    }
  };
</script>

