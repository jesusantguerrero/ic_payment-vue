import vars from './vars.js'
import clients from './clients/index.js'
import generals from './generals/index.js'
import services from './services/index.js'
import contracts from './contracts/index.js'
import payments from './payments/index.js'
import damages from './damages/index.js'
import installations from './installations/index.js'
import caja from './index.js'
import company from './company/index.js'
import settings from './settings/index.js'
import sections from './sections/index.js';
import extras from './extras/index.js';
import users from './users/index.js';
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
