import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/planning/dayView.vue'),
      },
      {
        path: 'week',
        component: () => import('src/pages/planning/weekView.vue'),
      },
      {
        path: 'month',
        component: () => import('src/pages/planning/monthView.vue'),
      },
      {
        path: 'year',
        component: () => import('src/pages/planning/yearView.vue'),
      },
      {
        path: 'weekTimeline',
        component: () => import('src/pages/planning/weekTimelineView.vue'),
      },
      {
        path: 'test',
        component: () => import('src/pages/planning/events/formEvent.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
