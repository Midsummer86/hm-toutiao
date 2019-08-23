import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/lg' },
    { path: '/lg', name: 'login', component: Login }
  ]
})
export default router
