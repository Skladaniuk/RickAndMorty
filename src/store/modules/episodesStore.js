import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allEpisodes: [],
    pagesCount: 0,
    singleEpisode: {},
    likedEpisodes: []
  },
  getters: {
    getCharactersIdsByEpisode: state => {
      if (state.singleEpisode.characters)
        return state.singleEpisode.characters.reduce((acc, curr) => [...acc, curr.split('/').pop()], '')
    }
  },
  mutations: {
    SET_EPISODES: (state, episodes) => {
      if (Array.isArray(episodes)) {
        state.allEpisodes = state.allEpisodes.concat(episodes)
        state.allEpisodes.forEach(el => el.isLiked = false)
        if (state.likedEpisodes.length) {
          state.allEpisodes.forEach(el => {
            state.likedEpisodes.forEach(likedEl => {
              if (el.id === likedEl.id) el.isLiked = true
            })
          })
        }
      } else {
        state.allEpisodes.push(episodes)
      }
    },
    CLEAR_EPISODES: state => state.allEpisodes = [],
    SET_EPISODES_PAGES: (state, count) => state.pagesCount = count,
    SET_SINGLE_EPISODE: (state, episode) => {
      state.singleEpisode = episode
      if (state.likedEpisodes.length) {
        state.likedEpisodes.forEach(likedEl => {
          if (state.singleEpisode.id === likedEl.id) state.singleEpisode.isLiked = true
        })
      }
    },
    LIKE_EPISODE: (state, episode) => state.likedEpisodes.push(episode),
    DISLIKE_EPISODE: (state, episodeId) => {
      const index = state.likedEpisodes.map(item => item.id).indexOf(episodeId)
      if (index >= 0) state.likedEpisodes.splice(index, 1)
    }
  },
  actions: {
    async getEpisodes({ commit }, params = null) {
      try {
        const res = await HTTP.get('episode', { params })
        if (params) commit('SET_EPISODES', res.data.results)
        commit('SET_EPISODES_PAGES', res.data.info.pages)
        commit('SET_ALL_COUNT', {
          text: 'Episodes',
          count: res.data.info.count
        }, { root: true })
      } catch (e) {
        console.log(e)
      }
    },
    async getSingleEpisode({ commit }, episodeId) {
      try {
        const res = await HTTP.get(`episode/${ episodeId }`)
        commit('SET_SINGLE_EPISODE', { ...res.data, isLiked: false })
      } catch (e) {
        console.log(e)
      }
    },
    async getEpisodesByCharacter({ commit }, episodes) {
      try {
        const res = await HTTP.get(`episode/${ episodes }`)
        commit('SET_EPISODES', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}