import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexPersistedState } from 'vue-persistedstate'

import charactersStore from '@/store/modules/charactersStore'
import episodesStore from '@/store/modules/episodesStore'
import locationsStore from '@/store/modules/locationsStore'
import authStore from '@/store/modules/authStore'
import snackbarStore from '@/store/modules/snackbarStore'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createVuexPersistedState({
      key: 'rick-and-morty',
      storage: window.localStorage
    })
  ],
  state: {
    allCount: []
  },
  getters: {},
  mutations: {
    SET_ALL_COUNT: (state, count) => {
      if (state.allCount.length < 3) {
        state.allCount.push(count)
      }
    }
  },
  actions: {},
  modules: {
    charactersStore,
    episodesStore,
    locationsStore,
    authStore,
    snackbarStore
  }
})
