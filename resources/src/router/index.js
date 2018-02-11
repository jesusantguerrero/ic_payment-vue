import Vue from 'vue';
import Router from 'vue-router';

// const AcountSection = () => import(/* webpackChunkName: "cuenta" */ './../modules/cuenta/AcountSection');
// const AdminSection = () => import(/* webpackChunkName: "administrador" */'./../modules/administrador/AdminSection');
// const CashDeskSection = () => import(/* webpackChunkName: "cierre */ './../modules/cierre/CashDeskSection');
// const ContractSection = () => import(/* webpackChunkName: "contratos" */ './../modules/contratos/ContractSection');
const ClientSection = () => import(/* webpackChunkName: "cliente" */ './../modules/clientes/ClientSection');
// const DetailsSection = () => import(/* webpackChunkName: "detalles" */ './../modules/detalles/DetailsSection');
// const ExtraSection = () => import(/* webpackChunkName = "extras" */ './../modules/extras/ExtraSection');
// const GraphicReportSection = () => import(/* webpackChunkName: "reportes" */ './../modules/reportes/GraphicReportSection');
const HomeSection = () => import(/* webpackChunkName: "home" */ './../modules/home/HomeSection');
// const NewContractSection = () => import(/* webpackChunkName: "nuevo_contrato" */ './../modules/nuevo_contrato/NewContractSection');
// const RouterSection = () => import(/* webpackChunkName: "secciones" */ './../modules/secciones/RouterSection');
// const ReportSection = () => import(/* webpackChunkName: "informes" */ './../modules/informes/ReportSection');
// const ServiceSection = () => import(/* webpackChunkFileName: "servicios" */ './../modules/servicios/ServiceSection');
// const TicketSection = () => import(/* webpackChunkName: "averias" */ './../modules/averias/TicketSection');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeSection',
      component: HomeSection
    }, {
      path: '/clientes',
      name: 'ClientSection',
      component: ClientSection
    }
  ]
});
