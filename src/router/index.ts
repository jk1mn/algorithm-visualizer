import type { RouterOptions } from 'vite-ssg';
import type { RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/algorithms/:name',
    name: 'algorithm',
    component: () => import('@/views/Algorithm.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/404.vue'),
  },
];

export const options = (): RouterOptions => ({
  base: import.meta.env.BASE_URL,
  routes,
});

export default options();
