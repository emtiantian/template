import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout/Layout.vue';
import home from '../views/Home.vue';
import page from '../views/Page.vue';
import user from '../views/user.vue'
import {isLogin} from "@/utils/userUtils.js"

Vue.use(VueRouter);

export const routes = [
  {path:"/",
    redirect: "/home"},
  {
    path: '/home',
    component: Layout,
    meta: { title: 'home', category: 'home', parent: '-1' },

    children: [
      {
        path: '',
        component: home,
        name: 'home',
        meta: { title: 'home', category: 'home' },
      },
    ],
  },
  {
    path: '/page',
    component: Layout,
    meta: { title: 'page', category: 'page', parent: '-1' },

    children: [
      {
        path: '',
        component: page,
        name: 'page',
        meta: { title: 'page', category: 'page' },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: 'user', category: 'user', parent: '-1' },
    children: [
      {
        path: '',
        component: user,
        name: 'user',
        meta: { title: '人员管理', category: 'user'  },
      },
    ],
  },
  {
    // login
    path: '/login',
    name: 'login',
    hidden:true,
    meta: { title: 'login', category: 'login', parent: '-1' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// 登录拦截
router.beforeEach((to, from, next) => {
  //
  if(to.path.indexOf("login")>-1){
    next()
  }else{
    if(isLogin()){
      next()
    }else{
      next({path:"/login"})
    }
  }
})

export default router;
