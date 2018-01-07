export default (Vue) => {
  Vue.component(
    'HomeSection',
    () => import(/* webpackChunkName: "home" */ './../home/HomeSection')
  );

  Vue.component(
    'AdminSection',
    () => import(/* webpackChunkName: "administrador" */'./../administrador/AdminSection')
  );

  Vue.component(
    'AcountSection',
    () => import(/* webpackChunkName: "cuenta" */ './../cuenta/AcountSection')
  );

  Vue.component(
    'CashDeskSection',
    () => import(/* webpackChunkName: "cierre */ './../cierre/CashDeskSection')
  );

  Vue.component(
    'ClientSection',
    () => import(/* webpackChunkName: "cliente" */ './../clientes/ClientSection')
  );

  Vue.component(
    'ExtraSection',
    () => import(/* webpackChunkName = "extras" */ './../extras/ExtraSection')
  );

  Vue.component(
    'RouterSection',
    () => import(/* webpackChunkName: "secciones" */ './../secciones/RouterSection')
  );

  Vue.component(
    'ServiceSection',
    () => import(/* webpackChunkFileName: "servicios" */ './../servicios/ServiceSection')
  );

  Vue.component(
    'ContractSection',
    () => import(/* webpackChunkName: "contratos" */ './../contratos/ContractSection')
  );

  Vue.component(
    'NewContractSection',
    () => import(/* webpackChunkName: "nuevo_contrato" */ './../nuevo_contrato/NewContractSection')
  );

  Vue.component(
    'DetailsSection',
    () => import(/* webpackChunkName: "detalles" */ './../detalles/DetailsSection')
  );

  Vue.component(
    'GraphicReportSection',
    () => import(/* webpackChunkName: "reportes" */ './../reportes/GraphicReportSection')
  );

  Vue.component(
    'TicketSection',
    () => import(/* webpackChunkName: "averias" */ './../averias/TicketSection')
  );
};
