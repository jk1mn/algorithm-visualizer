import {
  createWebHistory,
  createRouter,
  type RouteLocationNormalized,
  type NavigationGuardNext,
} from 'vue-router';
import Home from '@/views/Home.vue';
import algorithmRoutes from '@/router/algorithm-routes';

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/algorithms/:name',
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
