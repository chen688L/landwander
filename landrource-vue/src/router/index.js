import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import login from '@/pages/login'
import register from '@/pages/Register'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/Main',
    name: 'Main',
    meta: {
      isAuth: true
    },
    component: Main
  },
  {
    path: '/register',
    name: 'Register',
    component: register
  },
 
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router