import Generals from './generals';
import Contracts from './contracts';
import Payments from './payments';
import Notifications from './notificaciones';
import detailsHandler from './details/handlers';

const cGenerals = new Generals();

function initComponents() {
  switch (currentPage) {
    case 'notificaciones': {
      const cNotifications = new Notifications();
    }
      break;
    case 'detalles': {
      // const dPayments = new Payments();
      // const dContracts = new Contracts();
      // detailsHandler(dClients, dContracts, dPayments);
    }
      break;
    default:
      break;
  }
}

$(() => {
  initComponents();
});
