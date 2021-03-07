import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'
import Candidates from './views/Candidates.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/candidates',
      name: 'candidates',
      component: Candidates
    }

  ]
})
