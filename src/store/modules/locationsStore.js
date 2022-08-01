import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allLocations: [],
    allLocationsNumber: 0
  },
  getters: {},
  mutations: {
    SET_LOCATIONS: (state, locations) => state.allLocations = locations,
    SET_LOCATIONS_NUMBER: (state, locationsNumber) => state.allLocationsNumber = locationsNumber
  },
  actions: {
    async getLocations({commit}) {
      try {
        const res = await HTTP.get('location')
        commit('SET_LOCATIONS', res.data.results)
        commit('SET_LOCATIONS_NUMBER', res.data.info.count)
      } catch (e) {
        console.log(e)
      }
    }
  }
}