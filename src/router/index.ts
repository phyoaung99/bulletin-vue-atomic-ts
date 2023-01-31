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
      path: '/postcreate',
      name: 'postCreate',
      component: () => import('@/pages/posts/PostCreate.vue'),
      meta: {
        authRequired: true,
      }
    },
    {
      path: '/',
      name: 'postList',
      component: () => import('@/pages/posts/PostList.vue'),
    },
    {
      path: '/postupload',
      name: 'postUpload',
      component: () => import('@/pages/posts/PostUpload.vue'),
    },
    {
      path: '/postedit/:post_id',
      name: 'postEdit',
      component: () => import('@/pages/posts/PostEdit.vue'),
      meta: {
        authRequired: true,
      }
    },
    {
      path: '/user/create',
      name: 'userCreate',
      component: () => import('@/pages/user/userCreate.vue'),
      meta: {
        authRequired: true,
      }
      
    },
    {
      path: '/user/list',
      name: 'userList',
      component: () => import('@/pages/user/userList.vue'),
      meta: {
        authRequired: true,
      }
    },
    {
      path: '/user/profile',
      name: 'userProfile',
      component: () => import('@/pages/user/userProfile.vue'),
      meta: {
        authRequired: true,
      }
    },    
    {
      path: '/user/profile/edit',
      name: 'userEdit',
      component: () => import('@/pages/user/userEdit.vue'),
      meta: {
        authRequired: true,
      }
    },  
    {
      path: '/user/changePassword',
      name: 'changePassword',
      component: () => import('@/pages/user/changePassword.vue'),
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
    return next({ name: 'postList' });
  }

  return next();
});

export default router;
