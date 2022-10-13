import HTTP from '../../../http-common'

export default {
  namespaced: true,
  state: {
    allCharacters: [],
    tenRandomCharacters: [],
    charactersCount: 0,
    pagesCount: 0,
    singleCharacter: {},
    liked: []
  },
  getters: {
    getEpisodesIdsByCharacter: state => {
      if (state.singleCharacter.episode)
        return state.singleCharacter.episode.reduce((acc, curr) => [...acc, curr.split('/').pop()], '')
    }
  },
  mutations: {
    SET_CHARACTERS: (state, characters) => {
      if (Array.isArray(characters)) {
        state.allCharacters = state.allCharacters.concat(characters)
        state.allCharacters.forEach(el => el.isLiked = false)
        if (state.liked.length) {
          state.allCharacters.forEach(el => {
            state.liked.forEach(likedEl => {
              if (el.id === likedEl.id) el.isLiked = true
            })
          })
        }
      } else {
        state.allCharacters.push(characters)
      }
    },
    CLEAR_CHARACTERS: state => state.allCharacters = [],
    SET_CHARACTERS_COUNT: (state, count) => state.charactersCount = count,
    SET_CHARACTERS_PAGES: (state, count) => state.pagesCount = count,
    SET_RANDOM_CHARACTERS: (state, randomCharacters) => state.tenRandomCharacters = randomCharacters,
    SET_SINGLE_CHARACTER: (state, character) => {
      state.singleCharacter = character
      if (state.liked.length) {
        state.liked.forEach(likedEl => {
          if (state.singleCharacter.id === likedEl.id) state.singleCharacter.isLiked = true
        })
      }
    },
    LIKE_CHARACTER: (state, character) => state.liked.push(character),
    DISLIKE_CHARACTER: (state, characterId) => {
      const index = state.liked.map(item => item.id).indexOf(characterId)
      if (index >= 0) state.liked.splice(index, 1)
    }
  },
  actions: {
    async getCharacters({ commit }, params = null) {
      try {
        const res = await HTTP.get('character', { params })
        if (params) commit('SET_CHARACTERS', res.data.results)
        commit('SET_CHARACTERS_COUNT', res.data.info.count)
        commit('SET_CHARACTERS_PAGES', res.data.info.pages)
        commit('SET_ALL_COUNT', {
          text: 'Characters',
          count: res.data.info.count
        }, { root: true })
      } catch (e) {
        console.log(e)
      }
    },
    async getRandomCharacters({ state, commit }) {
      try {
        commit('SET_RANDOM_CHARACTERS', [])
        let randomTenCharacters = []
        for (let i = 0; i < 10; i++) {
          let character = Math.floor(Math.random() * state.charactersCount) + 1
          randomTenCharacters.push(character)
        }
        randomTenCharacters = randomTenCharacters.toString()
        const res = await HTTP.get(`character/${ randomTenCharacters }`)
        commit('SET_RANDOM_CHARACTERS', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getSingleCharacter({ commit }, characterId) {
      try {
        const res = await HTTP.get(`character/${ characterId }`)
        commit('SET_SINGLE_CHARACTER', { ...res.data, isLiked: false })
      } catch (e) {
        console.log(e)
      }
    },
    async getCharactersByLocation({ commit }, characters) {
      try {
        const res = await HTTP.get(`character/${ characters }`)
        commit('SET_CHARACTERS', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getCharactersByEpisode({ commit }, characters) {
      try {
        const res = await HTTP.get(`character/${ characters }`)
        commit('SET_CHARACTERS', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}