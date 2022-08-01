import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allCharacters: [],
    allCharactersNumber: 0,
    tenRandomCharacters: []
  },
  getters: {},
  mutations: {
    SET_CHARACTERS: (state, characters) => state.allCharacters = characters,
    SET_CHARACTERS_NUMBER: (state, charactersNumber) => state.allCharactersNumber = charactersNumber,
    SET_RANDOM_CHARACTERS: (state, randomCharacters) => state.tenRandomCharacters = randomCharacters
  },
  actions: {
    async getCharacters({commit}) {
      try {
        const res = await HTTP.get('character')
        commit('SET_CHARACTERS', res.data.results)
        commit('SET_CHARACTERS_NUMBER', res.data.info.count)
      } catch (e) {
        console.log(e)
      }
    },
    async getTenRandomCharacters({commit, state}) {
      try {
        let randomTenCharacters = []
        while (randomTenCharacters.length < 10) {
          let character = Math.floor(Math.random() * state.allCharactersNumber) + 1
          if (randomTenCharacters.indexOf(character) === -1)
            randomTenCharacters.push(character)
        }
        randomTenCharacters = randomTenCharacters.toString()
        console.log(randomTenCharacters)
        const res = await HTTP.get('character/' + randomTenCharacters)
        commit('SET_RANDOM_CHARACTERS', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}