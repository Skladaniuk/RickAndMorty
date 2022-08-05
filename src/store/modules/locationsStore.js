import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allLocations: [],
    pagesCount: 0,
    singleLocation: {}
  },
  getters: {},
  mutations: {
    SET_LOCATIONS: (state, locations) => state.allLocations = locations,
    SET_LOCATIONS_PAGES: (state, count) => state.pagesCount = count,
    SET_SINGLE_LOCATION: (state, location) => state.singleLocation = location
  },
  actions: {
    async getLocations({commit}, params = null) {
      try {
        const res = await HTTP.get('location', {params})
        commit('SET_LOCATIONS', res.data.results)
        commit('SET_LOCATIONS_PAGES', res.data.info.pages)
        commit('SET_ALL_COUNT', {
          text: 'Locations',
          count: res.data.info.count
        }, {root: true})
      } catch (e) {
        console.log(e)
      }
    },
    async getSingleLocation({commit}, locationId) {
      try {
        commit('SET_SINGLE_LOCATION', {})
        const res = await HTTP.get(`location/${locationId}`)
        commit('SET_SINGLE_LOCATION', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}