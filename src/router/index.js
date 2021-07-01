import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout/Layout.vue';
import Home from '../views/Home.vue';
import aa from '../views/aa.vue';
import bb from '../views/bb.vue';

Vue.use(VueRouter);

export const routes = [
  {path:"/",
    redirect: "/1"},
  {
    path: '/1',
    component: Layout,
    name: '1',
    meta: { title: '1', category: '1', parent: '-1' },
    children: [
      {
        path: 'home',
        component: Home,
        name: 'home',
        meta: { title: 'home1', category: 'home1', parent: '1' },
      },
      {
        path: 'aa',
        component: aa,
        name: 'aa',
        meta: { title: 'aa', category: 'aa', parent: '1' },
      },
    ],
  },
  {
    path: '/2',
    component: Layout,
    name: '2',
    meta: { title: '2', category: '2', parent: '-1' },
    children: [
      {
        path: 'bb',
        component: bb,
        name: 'bb',
        meta: { title: 'bb', category: 'bb', parent: '2' },
      },
    ],
  },
  {
    // login
    path: '/login',
    name: 'login',
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
