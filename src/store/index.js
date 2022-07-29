import Vue from 'vue'
import Vuex from 'vuex'
import charactersStore from "@/store/modules/charactersStore";
import episodesStore from "@/store/modules/episodesStore";
import locationsStore from "@/store/modules/locationsStore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    charactersStore,
    episodesStore,
    locationsStore
  }
})
