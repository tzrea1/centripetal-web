import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login.js'
import scroll from './modules/scroll.js'
import user from './modules/user.js'
import getters from './getters.js'
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    login,
    scroll,
    user
  },
  getters
})
