import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allEpisodes: [],
    allEpisodesNumber: 0
  },
  getters: {},
  mutations: {
    SET_EPISODES: (state, episodes) => state.allEpisodes = episodes,
    SET_EPISODES_NUMBER: (state, episodesNumber) => state.allEpisodesNumber = episodesNumber
  },
  actions: {
    async getEpisodes({commit}) {
      try {
        const res = await HTTP.get('episode')
        commit('SET_EPISODES', res.data.results)
        commit('SET_EPISODES_NUMBER', res.data.info.count)
      } catch (e) {
        console.log(e)
      }
    }
  }
}