import handler from './handlers'
export default class sections {
  constructor() {
    handler(this)
  }
  add() {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    })

    const steps = [{
        title: 'Nombre del sector'
      },
      'Codigo del Sector',
    ]

    swal.queue(steps).then(function (result) {
      swal.resetDefaults()
      self.save(result)
    });
  }

  save() {
    function save(result) {
      const self = this;
      const nombre = result[0];
      const codigoArea = result[1];

      const form = "nombre=" + nombre + "&codigo_area=" + codigoArea + "&tabla=secciones"

      heavyLoad(true);
      return new Promise(function (resolve) {
        return this.send('add', form)
        then((res) => {
          self.getAll()
          heavyLoad(false);
          displayMessage(res)
          return resolve()
        })
      })
    }
  }

  getIps() {
    const id = $("#select-sector").val();
    $('.print-table').attr('href', BASE_URL + 'process/getreport/secciones/' + id);

    if (id != null) {
      const form = "tabla=ips&id=" + id;
      this.send('getall', data)
        .then((res) => {
          sectionTable.refresh(Res)
        })
    }
  }

  getAll() {
    const self = this;
    const form = "tabla=secciones";

    heavyLoad(true);
    this.send('getall', form)
      .then((res) => {
        heavyLoad(false);
        self.fillSelect(res)
      })
  }

  updateIpState(IP) {
    const form = 'data=' + JSON.stringify(IP) + '&extra_info=' + JSON.stringify({
      module: 'ip'
    });
    this.send('axiosupdate', form)
      .then(function (res) {
        displayMessage(res.data.mensaje);
      })
  }

  send(endpoint, data) {
    return axios.post(`${BASE_URL}process/${endpoint}`, data)
  }

  fillSelect(content) {
    $("#select-sector").html(content);
  }

}
