import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/', component: Home },
    { path: '/home',
      component: Home,
      children: [
        { path: '/', name: 'Welcome', component: Welcome }
      ]
    },
    { path: '*', name: 404, component: NotFound }
  ]
})
export default router
