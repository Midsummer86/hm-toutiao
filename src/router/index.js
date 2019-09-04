import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import store from '@/store'
import Images from '@/views/images'
import Component from '@/views/component'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: 'home', component: Home },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/component', name: 'com', component: Component },
        { path: '/images', name: 'images', component: Images },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/setting', name: 'setting', component: Setting },
        { path: '/fans', name: 'fans', component: Fans }
      ]
    },
    { path: '*', name: 404, component: NotFound }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
