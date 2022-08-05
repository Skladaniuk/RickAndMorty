<template>
  <div>
    <v-card class="list-item-card">
      <v-list-item three-line class="list-item-wrap">
        
        <v-list-item-content class="content">
          <v-list-item-title class="text-h5 mb-1 item-name">{{singleEpisode.name}}</v-list-item-title>
          <div class="item-info">
            <v-list-item-subtitle>Air Date:</v-list-item-subtitle>
            <span>{{singleEpisode.air_date}}</span>
          </div>
          <div class="item-info">
            <v-list-item-subtitle>Episode ID:</v-list-item-subtitle>
            <span>{{singleEpisode.episode}}</span>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-row v-if='charactersByEpisode.length' class='mt-15'>
      <v-col
        v-for='character in charactersByEpisode'
        :key='character.id'
        md='6'
        sm='12'
      >
        <CharacterCart :character='character' />
      </v-col>
    </v-row>
    <div v-else class='alert-message'>
      There are no Characters from this Episode
    </div>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import CharacterCart from '@/components/carts/CharacterCart'
  
  export default {
    name: 'SingleEpisodePage',
    components: {CharacterCart},
    data() {
      return {
        charactersCount: 6,
      }
    },
    computed: {
      ...mapState({
        singleEpisode: state => state.episodesStore.singleEpisode,
        charactersByEpisode: state => state.charactersStore.charactersByEpisode
      }),
      getCharactersIds() {
        return this.singleEpisode.characters.reduce((acc, curr) => [...acc, curr.split('/').pop()], '')
      }
    },
    async created() {
      await this.getSingleEpisode(this.$route.params.episodeId)
      await this.getCharactersByEpisode(this.getCharactersIds.slice(0, this.charactersCount).join(','))
    },
    beforeDestroy() {
      this.CLEAR_CHARACTERS()
      document.removeEventListener('scroll', this.getNextCharacters)
    },
    mounted() {
      document.addEventListener('scroll', this.getNextCharacters)
    },
    methods: {
      ...mapActions({
        getSingleEpisode: 'episodesStore/getSingleEpisode',
        getCharactersByEpisode: 'charactersStore/getCharactersByEpisode'
      }),
      ...mapMutations({
        CLEAR_CHARACTERS: 'charactersStore/CLEAR_CHARACTERS_BY_EPISODE'
      }),
      async getNextCharacters() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
          this.charactersCount += 6
          const ids = this.getCharactersIds.slice(this.charactersCount - 6, this.charactersCount).join(',')
          if (ids.length) await this.getCharactersByEpisode(ids)
        }
      }
    }
  }
</script>

<style scoped>

</style>