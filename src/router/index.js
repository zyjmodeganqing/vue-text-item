import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'layout',
    redirect: 'index',
    component: layout,
    children: [{
      path: 'index',
      component: (resolve) => require(['@/views/index'], resolve),
      name: 'Index',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
