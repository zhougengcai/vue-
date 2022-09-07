import Vue from 'vue'
import Vuex from 'vuex'

import {state,getters,mutations } from "./mutations"
import actions from "./actions"
import cate from "./mudules/cate"
import specs from "./mudules/specs"
import banner from "./mudules/banner"
import goods from "./mudules/goods"
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  
  modules: {
    cate,specs,banner,goods
  }
})
