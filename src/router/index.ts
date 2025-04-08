import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/MainLayout.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue')
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: 'culture',
          name: 'culture',
          component: () => import('../views/culture/Culture.vue')
        },
        {
          path: 'community',
          name: 'community',
          component: () => import('../views/community/Community.vue')
        },
        {
          path: 'herbs',
          name: 'herbs',
          component: () => import('../views/herbs/HerbsGallery.vue')
        },
        {
          path: 'prescriptions',
          name: 'prescriptions',
          component: () => import('../views/prescriptions/Prescriptions.vue')
        },
        {
          path: 'events',
          name: 'events',
          component: () => import('../views/events/Events.vue')
        },
        {
          path: 'masters',
          name: 'masters',
          component: () => import('../views/masters/Masters.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/user/Profile.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('../views/user/Favorites.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'learning-history',
          name: 'learning-history',
          component: () => import('../views/user/LearningHistory.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login')
  } else {
    next()
  }
})

export default router