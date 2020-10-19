import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);//安装    内部实现:Vue.component('router-link',routerLink),

import {setCookie,getCookie,delCookie} from '../utils/utils';


import routes from './router.config'

let router = new VueRouter(routes);


// 全局路由守卫
router.beforeEach((to, from, next) => {

    const nextRoute = ['home', 'banner', 'fodder', 'taoxi', 'cases', 'otherCookie', 'shop', 'intro', 'team', 'cookie', 'contactUs', 'city', 'links','copeRight', 'erCode', 'icp'] // 需要登录的页面
    let isLogin = getCookie('username')  // 判断是否登录，本地存储有用户数据则视为已经登录
    // 未登录状态；当路由到 nextRoute 指定页时，跳转至 UserLogIn
    if (nextRoute.indexOf(to.name) >= 0) { // 检测是否登录的页面
      if (!isLogin) { // 如果未登录（本地存储无用户数据），并且要跳到登录页面
        if (from.name === 'login') {
          next('/')
          return
        }
  　　　　// 登录后，跳到到当前页面
        router.push({
          name: 'login',
          params: {redirect: to.fullPath}  
        //   params: {redirect: to.fullPath} 
         
        })
      }
    }
    // 已登录状态；当路由到 UserLogIn 时，跳转至 Home
    if (to.name === 'login') {
      if (isLogin) {
        next('/home')
        return
      }
    }
    next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
  })
export default router