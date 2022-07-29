import HTTP from "../../../http-common";

export default {
  namespaced: true,
  state: {
    characters: [],
  },
  getters: {},
  mutations: {
    SET_CHARACTERS: (state, characters) => state.characters = characters,
  },
  actions: {
    async getCharacters({commit}) {
      try {
        const res = await HTTP.get('character');
        commit('SET_CHARACTERS', res.data.results)
      } catch (e) {
        console.log(e)
      }
    }
  },
}