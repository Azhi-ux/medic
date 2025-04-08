import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
        }
      ]
    }
  ]
})

export default router