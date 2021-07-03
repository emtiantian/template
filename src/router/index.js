import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout/Layout.vue';
import home from '../views/Home.vue';
import page from '../views/Page.vue';
import user from '../views/user.vue'
import bus from '../views/bus.vue'

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
        meta: { title: 'user', category: 'user'  },
      },
    ],
  },
  {
    path: '/bus',
    component: Layout,
    meta: { title: 'bus', category: 'bus', parent: '-1' },
    children: [
      {
        path: '',
        component: bus,
        name: 'bus',
        meta: { title: 'bus', category: 'bus' },
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

export default router;
