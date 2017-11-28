import Clients from './clients';
import Generals from './generals';
import Services from './services';
import Contracts from './contracts';
import Payments from './payments';
import Caja from './caja';
import Company from './company';
import Settings from './settings';
import Sections from './sections';
import Users from './users';
import Notifications from './notificaciones';
import detailsHandler from './details/handlers';

const cClients = new Clients();
const cGenerals = new Generals();
const cServices = new Services();
const cContracts = new Contracts();
const cPayments = new Payments();
const cCaja = new Caja();
const cCompany = new Company();
const cSettings = new Settings();
const cSections = new Sections();
const cUsers = new Users();
const cNotifications = new Notifications();


function initComponents() {
  cCaja();
  cGenerals();

  switch (currentPage) {
    case 'home':
      cClients();
      break;
    case 'administrador':
      cCompany();
      cUsers();
      cSettings();
      break;
    case 'clientes':
      cClients();
      break;
    case 'servicios':
      cServices();
      break;
    case 'notificaciones':
      cNotifications();
      break;
    case 'secciones':
      cSections();
      break;
    case 'nuevo_contrato':
      cContracts();
      break;
    case 'detalles':
      detailsHandler(cClients(), cContracts(), cPayments());
      break;
    case 'contratos':
      cContracts();
      cClients();
      break;
    default:
      break;
  }
}

$(() => {
  initComponents();
});
