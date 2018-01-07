export default class TicketStore {
  constructor() {
    this.ticket = {
      id_averia: '',
      id_cliente: '',
      cliente: '',
      direccion: '',
      descripcion: '',
      celular: '',
      fecha: '',
      estado: '',
      fecha_reparacion: '',
      tecnico: '',
      codigo: '',
    };
    this.comments = [];
    this.detailMode = false;
  }

  setTicket(ticket) {
    this.ticket = ticket;
  }

  emptyTicket() {
    this.ticket = {
      id_averia: '',
      id_cliente: '',
      cliente: '',
      direccion: '',
      descripcion: '',
      celular: '',
      fecha: '',
      estado: '',
      fecha_reparacion: '',
      tecnico: '',
      codigo: '',
    };
  }

  setComments(comments) {
    this.comments = comments;
  }

  setDetailMode(mode) {
    this.detailMode = mode;
  }
}
