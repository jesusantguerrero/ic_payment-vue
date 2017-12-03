import Clients from './clients';
import Generals from './generals';
import Services from './services';
import Contracts from './contracts';
import Payments from './payments';
import Company from './company';
import Settings from './settings';
import Sections from './sections';
import Users from './users';
import Notifications from './notificaciones';
import detailsHandler from './details/handlers';

const cGenerals = new Generals();

function initComponents() {
  switch (currentPage) {
    case 'home': {
      const cClients = new Clients();
    }
      break;
    case 'administrador': {
      const cCompany = new Company();
      const cSettings = new Settings();
      const cUsers = new Users();
    }
      break;
    case 'clientes': {
      const cClients = new Clients();
    }
      break;
    case 'servicios': {
      const cServices = new Services();
    }
      break;
    case 'notificaciones': {
      const cNotifications = new Notifications();
    }
      break;
    case 'secciones': {
      const cSections = new Sections();
    }
      break;
    case 'nuevo_contrato': {
      const nContracts = new Contracts();
    }
      break;
    case 'detalles': {
      const dClients = new Clients();
      const dPayments = new Payments();
      const dContracts = new Contracts();
      detailsHandler(dClients, dContracts, dPayments);
    }
      break;
    case 'contratos': {
      const cContracts = new Contracts();
      const cClients = new Clients();
      break;
    }
    default:
      break;
  }
}

$(() => {
  initComponents();
});
