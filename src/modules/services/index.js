import vars from './vars.js'
import clients from './clients'
import generals from './generals'
import services from './services'
import contracts from './contracts'
import payments from './payments'
import caja from './caja'
import company from './company'
import settings from './settings'
import sections from './sections';
import users from './users';
import detailsHandler from './details/handlers';


function initComponents() {
  const Caja = new Caja();
  const General = new Generals();

  switch (currentPage) {
    case "home":
      new clients();
      break;
    case "administrador":
      new company()
      new users();
      new settings();
      new caja();
      break;
    case "clientes":
      new clients();
      break;
    case "servicios":
      ServicesHandler();
      break;
    case "nuevo_contrato":
      new contracts();
      break;
    case "detalles":
      const Payments = new payments;
      const Contracts = new contracts;
      const Clients = new clients();
      detailsHandler(Clients, Contracts, Payments);
      break;
    case "contratos":
      new contracts()
      new clients();
      break;
    case "secciones":
      new sections();
      break;
  }
}

$(function () {
  initComponents()
});
