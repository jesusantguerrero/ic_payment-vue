import Vue from 'vue';
import Router from 'vue-router';
import acountService from './../modules/cuenta/service/AcountService';

import AcountSection from './../modules/cuenta/AcountSection.vue';
import AdminSection from './../modules/administrador/adminSection.vue';
import CashDeskSection from './../modules/cierre/CashDeskSection.vue';
import ContractSection from './../modules/contratos/ContractSection.vue';
import ClientSection from './../modules/clientes/ClientSection.vue';
import DetailsSection from './../modules/detalles/DetailsSection.vue';
import ExtraSection from './../modules/extras/ExtraSection.vue';
import GraphicReportSection from './../modules/reportes/GraphicReportSection.vue';
import HomeSection from './../modules/home/homeSection.vue';
import NewContractSection from './../modules/nuevo_contrato/NewContractSection.vue';
import RouterSection from './../modules/secciones/RouterSection.vue';
import ReportSection from './../modules/informes/ReportSection.vue';
import ServiceSection from './../modules/servicios/ServiceSection.vue';
import TicketSection from './../modules/averias/TicketSection.vue';

Vue.use(Router);
const url = window.location.origin;
const base = (url.includes('localhost')) ? '/ic_payment' : '';

const router = new Router({
  mode: 'history',
  base: `${base}/app/admin`,
  routes: [
    {
      path: '/',
      name: 'HomeSection',
      component: HomeSection,
      props: true
    },
    {
      path: '/home',
      name: 'FallHomeSection',
      component: HomeSection,
      props: true
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
