import Home from '@/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      component: Home,
      meta: {
        title: 'Početna'
      }
    },

  ],
})

export default router
