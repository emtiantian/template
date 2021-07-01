import Vue from 'vue';
import elementUI from 'element-ui';
import App from './App.vue';
import store from './store';
import router from './router';
import '@/styles/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import './icons'; // icon

Vue.config.productionTip = false;
Vue.use(elementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
