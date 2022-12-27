import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Welcome.vue'),
      meta: {
        authRequired: true,
      }
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/login",
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  const { authRequired } = to.meta; 
  if (authRequired && !store.getters.isLoggedIn) {
    return next({ name: 'login' });
  }
  
  if (to.name == 'login' && store.getters.isLoggedIn) {
    return next({ name: 'home' });
  }

  return next();
});

export default router;
