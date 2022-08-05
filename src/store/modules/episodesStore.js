import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allEpisodes: [],
    pagesCount: 0,
    singleEpisode: {},
    episodesByCharacter: []
  },
  getters: {},
  mutations: {
    SET_EPISODES: (state, episodes) => state.allEpisodes = episodes,
    SET_EPISODES_PAGES: (state, count) => state.pagesCount = count,
    SET_SINGLE_EPISODE: (state, episode) => state.singleEpisode = episode,
    SET_EPISODES_BY_CHARACTER: (state, episodes) => {
      if (Array.isArray(episodes)) {
        episodes.forEach(el => state.episodesByCharacter.push(el))
      } else {
        state.episodesByCharacter.push(episodes)
      }
    },
    CLEAR_EPISODES_BY_CHARACTER: state => state.episodesByCharacter = []
  },
  actions: {
    async getEpisodes({commit}, params = null) {
      try {
        const res = await HTTP.get('episode', {params})
        commit('SET_EPISODES', res.data.results)
        commit('SET_EPISODES_PAGES', res.data.info.pages)
        commit('SET_ALL_COUNT', {
          text: 'Episodes',
          count: res.data.info.count
        }, {root: true})
      } catch (e) {
        console.log(e)
      }
    },
    async getSingleEpisode({commit}, episodeId) {
      try {
        commit('SET_SINGLE_EPISODE', {})
        const res = await HTTP.get(`episode/${episodeId}`)
        commit('SET_SINGLE_EPISODE', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getEpisodesByCharacter({commit}, episodes) {
      try {
        const res = await HTTP.get(`episode/${episodes}`)
        commit('SET_EPISODES_BY_CHARACTER', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}