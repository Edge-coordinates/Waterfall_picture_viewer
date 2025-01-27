import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'about/', component: () => import('pages/AboutPage.vue') }
    ]
  },
  {
    path: '/test/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/test/IndexPage.vue') },
      { path: 'a/', component: () => import('src/pages/test/APage.vue') },
      { path: 'initLanguage/', component: () => import('src/pages/test/initLanguage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
