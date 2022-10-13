import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allLocations: [],
    pagesCount: 0,
    singleLocation: {},
    likedLocations: []
  },
  getters: {
    getCharactersIdsByLocation: state => {
      if (state.singleLocation.residents)
        return state.singleLocation.residents.reduce((acc, curr) => [...acc, curr.split('/').pop()], '')
    }
  },
  mutations: {
    SET_LOCATIONS: (state, locations) => {
      if (Array.isArray(locations)) {
        state.allLocations = state.allLocations.concat(locations)
        state.allLocations.forEach(el => el.isLiked = false)
        if (state.likedLocations.length) {
          state.allLocations.forEach(el => {
            state.likedLocations.forEach(likedEl => {
              if (el.id === likedEl.id) el.isLiked = true
            })
          })
        }
      } else {
        state.allLocations.push(locations)
      }
    },
    CLEAR_LOCATIONS: state => state.allLocations = [],
    SET_LOCATIONS_PAGES: (state, count) => state.pagesCount = count,
    SET_SINGLE_LOCATION: (state, location) => {
      state.singleLocation = location
      if (state.likedLocations.length) {
        state.likedLocations.forEach(likedEl => {
          if (state.singleLocation.id === likedEl.id) state.singleLocation.isLiked = true
        })
      }
    },
    LIKE_LOCATION: (state, location) => state.likedLocations.push(location),
    DISLIKE_LOCATION: (state, locationId) => {
      const index = state.likedLocations.map(item => item.id).indexOf(locationId)
      if (index >= 0) state.likedLocations.splice(index, 1)
    }
  },
  actions: {
    async getLocations({ commit }, params = null) {
      try {
        const res = await HTTP.get('location', { params })
        if (params) commit('SET_LOCATIONS', res.data.results)
        commit('SET_LOCATIONS_PAGES', res.data.info.pages)
        commit('SET_ALL_COUNT', {
          text: 'Locations',
          count: res.data.info.count
        }, { root: true })
      } catch (e) {
        console.log(e)
      }
    },
    async getSingleLocation({ commit }, locationId) {
      try {
        const res = await HTTP.get(`location/${ locationId }`)
        commit('SET_SINGLE_LOCATION', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}