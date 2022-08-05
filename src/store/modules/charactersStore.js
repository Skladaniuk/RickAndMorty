import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allCharacters: [],
    tenRandomCharacters: [],
    charactersCount: 0,
    pagesCount: 0,
    singleCharacter: {},
    charactersByLocation: [],
    charactersByEpisode: []
  },
  getters: {},
  mutations: {
    SET_CHARACTERS: (state, characters) => state.allCharacters = characters,
    SET_CHARACTERS_COUNT: (state, count) => state.charactersCount = count,
    SET_CHARACTERS_PAGES: (state, count) => state.pagesCount = count,
    SET_RANDOM_CHARACTERS: (state, randomCharacters) => state.tenRandomCharacters = randomCharacters,
    SET_SINGLE_CHARACTER: (state, character) => state.singleCharacter = character,
    SET_CHARACTERS_BY_LOCATION: (state, characters) => {
      if (Array.isArray(characters)) {
        characters.forEach(el => state.charactersByLocation.push(el))
      } else {
        state.charactersByLocation.push(characters)
      }
    },
    CLEAR_CHARACTERS_BY_LOCATION: state => state.charactersByLocation = [],
    SET_CHARACTERS_BY_EPISODE: (state, characters) => {
      if (Array.isArray(characters)) {
        characters.forEach(el => state.charactersByEpisode.push(el))
      } else {
        state.charactersByEpisode.push(characters)
      }
    },
    CLEAR_CHARACTERS_BY_EPISODE: state => state.charactersByEpisode = []
  },
  actions: {
    async getCharacters({commit}, params = null) {
      try {
        const res = await HTTP.get('character', {params})
        commit('SET_CHARACTERS', res.data.results)
        commit('SET_CHARACTERS_COUNT', res.data.info.count)
        commit('SET_CHARACTERS_PAGES', res.data.info.pages)
        commit('SET_ALL_COUNT', {
          text: 'Characters',
          count: res.data.info.count
        }, {root: true})
      } catch (e) {
        console.log(e)
      }
    },
    async getTenRandomCharacters({state, commit}) {
      try {
        commit('SET_RANDOM_CHARACTERS', [])
        let randomTenCharacters = []
        for (let i = 0; i < 10; i++) {
          let character = Math.floor(Math.random() * state.charactersCount) + 1
          randomTenCharacters.push(character)
        }
        randomTenCharacters = randomTenCharacters.toString()
        const res = await HTTP.get(`character/${randomTenCharacters}`)
        commit('SET_RANDOM_CHARACTERS', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getSingleCharacter({commit}, characterId) {
      try {
        commit('SET_SINGLE_CHARACTER', {})
        const res = await HTTP.get(`character/${characterId}`)
        commit('SET_SINGLE_CHARACTER', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getCharactersByLocation({commit}, characters) {
      try {
        const res = await HTTP.get(`character/${characters}`)
        commit('SET_CHARACTERS_BY_LOCATION', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getCharactersByEpisode({commit}, characters) {
      try {
        const res = await HTTP.get(`character/${characters}`)
        commit('SET_CHARACTERS_BY_EPISODE', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}