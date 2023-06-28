import type { RouterOptions } from 'vite-ssg';
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import Home from '@/views/Home.vue';
import algorithmRoutes from '@/router/algorithm-routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/algorithms/:name',
    name: 'algorithm',
    component: () => import('@/views/Algorithm.vue'),
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (algorithmRoutes.find((alg) => alg.id === to.params.name)) next();
      else next('/not-found');
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
  },
];

export const options = (): RouterOptions => ({
  base: import.meta.env.BASE_URL,
  routes,
});

export default options();
