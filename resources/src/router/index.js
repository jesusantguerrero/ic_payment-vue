import Vue from 'vue';
import Router from 'vue-router';
import acountService from './../modules/cuenta/service/AcountService';

const AcountSection = () => import(/* webpackChunkName: "cuenta" */ './../modules/cuenta/AcountSection');
const AdminSection = () => import(/* webpackChunkName: "administrador" */'./../modules/administrador/AdminSection');
const CashDeskSection = () => import(/* webpackChunkName: "cierre */ './../modules/cierre/CashDeskSection');
const ContractSection = () => import(/* webpackChunkName: "contratos" */ './../modules/contratos/ContractSection');
const ClientSection = () => import(/* webpackChunkName: "cliente" */ './../modules/clientes/ClientSection');
const DetailsSection = () => import(/* webpackChunkName: "detalles" */ './../modules/detalles/DetailsSection');
const ExtraSection = () => import(/* webpackChunkName = "extras" */ './../modules/extras/ExtraSection');
const GraphicReportSection = () => import(/* webpackChunkName: "reportes" */ './../modules/reportes/GraphicReportSection');
const HomeSection = () => import(/* webpackChunkName: "home" */ './../modules/home/HomeSection');
const NewContractSection = () => import(/* webpackChunkName: "nuevo_contrato" */ './../modules/nuevo_contrato/NewContractSection');
const RouterSection = () => import(/* webpackChunkName: "secciones" */ './../modules/secciones/RouterSection');
const ReportSection = () => import(/* webpackChunkName: "informes" */ './../modules/informes/ReportSection');
const ServiceSection = () => import(/* webpackChunkFileName: "servicios" */ './../modules/servicios/ServiceSection');
const TicketSection = () => import(/* webpackChunkName: "averias" */ './../modules/averias/TicketSection');

Vue.use(Router);
const url = window.location.origin;
const base = (url.includes('localhost')) ? '/icpayment' : '';

const router = new Router({
  mode: 'history',
  base: `${base}/app/admin`,
  routes: [
    {
      path: '/',
      name: 'HomeSection',
      component: HomeSection
    },
    {
      path: '/home',
      name: 'FallHomeSection',
      component: HomeSection
    },
    {
      path: '/clientes',
      name: 'ClientSection',
      component: ClientSection,
    },
    {
      path: '/contratos',
      name: 'ContractSection',
      component: ContractSection
    },
    {
      path: '/extras',
      name: 'ExtraSection',
      component: ExtraSection
    },
    {
      path: '/servicios',
      name: 'ServiceSection',
      component: ServiceSection
    },
    {
      path: '/secciones',
      name: 'RouterSection',
      component: RouterSection
    },
    {
      path: '/reportes',
      name: 'GraphicReportSection',
      component: GraphicReportSection,
      meta: { requiresAdmin: true }
    },
    {
      path: '/nuevo_contrato',
      name: 'NewContractSection',
      component: NewContractSection
    },
    {
      path: '/detalles/:clientId/:activeWindow?',
      props: true,
      component: DetailsSection
    },
    {
      path: '/cierre',
      name: 'CashDeskSection',
      component: CashDeskSection
    },
    //
    {
      path: '/administrador',
      name: 'AdminSection',
      component: AdminSection,
      meta: { requiresAdmin: true }
    },
    {
      path: '/cuenta',
      name: 'AcountSection',
      component: AcountSection
    },
    {
      path: '/averias',
      name: 'TicketSection',
      component: TicketSection
    },
    {
      path: '/informes',
      name: 'ReportSection',
      component: ReportSection,
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    acountService.getUser().then((user) => {
      if (user && (Number(user.type) !== 0)) {
        next({
          path: '/home',
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
