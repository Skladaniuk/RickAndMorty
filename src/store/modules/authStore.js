import axios from 'axios'

export default {
  namespaced: true,
  state: {
    allUsers: [],
    currentUser: {},
    serverResponse: {}
  },
  getters: {
    findUser: state => user => state.allUsers.find(el => el.email === user.email && el.password === user.password),
    checkIfRegistered: state => user => state.allUsers.some(el => el.email === user.email),
    isLogged: state => !!Object.keys(state.currentUser).length
  },
  mutations: {
    ADD_USER: (state, user) => state.allUsers.push(user),
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    EDIT_USER: (state, { user, newPass, avatar }) => {
      state.allUsers.forEach((el, i) => {
        if (el.email === user.email) {
          state.allUsers[i] = user
          if (newPass) {
            state.allUsers[i].password = newPass
          }
          if (avatar) {
            state.allUsers[i].avatar = avatar
          }
        }
      })
    },
    LOG_OUT: (state, store) => {
      state.currentUser = {}
      store.charactersStore.liked = []
      store.episodesStore.likedEpisodes = []
      store.locationsStore.likedLocations = []
    },
    SET_RESPONSE_MESSAGE: (state, message) => state.serverResponse = message
  }
  ,
  actions: {
    async registerTheUser({commit}, data) {
      try {
        await axios.post('http://localhost:8081/api/register', data)
        await this.$router.push({ name: 'LoginPage' })
      } catch (error) {
        commit('SET_RESPONSE_MESSAGE', error.response)
      }
    },
    async loginTheUser({commit}, data) {
      try {
        const res = await axios.post('http://localhost:8081/api/login', data)
        commit('SET_CURRENT_USER', res.data.response)
        await this.$router.push({ name: 'OverviewPage' })
      } catch (error) {
        commit('SET_RESPONSE_MESSAGE', error.response)
      }
    }
  }
}