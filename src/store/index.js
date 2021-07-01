import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';

import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,

  },
  getters,
  state: {
    userInfo: null,
    showCollapse: true,
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_ShowCollapse(state, data) {
      state.showCollapse = data;
    },
  },
});
