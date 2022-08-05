<template>
  <div>
    <v-card class="list-item-card" v-if='isCharacterExist'>
      <v-list-item three-line class="list-item-wrap">
        <v-list-item-avatar tile size="80" color="grey" class="avatar ma-0 mr-3">
          <img :src="singleCharacter.image">
        </v-list-item-avatar>
        <v-list-item-content class="content">
          <v-list-item-title class="text-h5 mb-1 item-name">{{singleCharacter.name}}</v-list-item-title>
          <div class="item-in-life">
            <span>{{singleCharacter.status}} - {{singleCharacter.species}}</span>
          </div>
          <div class="item-info">
            <v-list-item-subtitle>Last known location:</v-list-item-subtitle>
            <router-link
              :to='{name: "SingleLocationPage", params: {locationId: getLocationId(singleCharacter.location.url)}}'
            >
              <span>{{singleCharacter.location.name}}</span>
            </router-link>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-row v-if='episodesByCharacter.length' class='mt-15'>
      <v-col
        v-for='(episode, i) in episodesByCharacter'
        :key='i'
        md='6'
        sm='12'
      >
        <EpisodeCart :episode='episode' />
      </v-col>
    </v-row>
    <div v-else class='alert-message'>
      There are no Characters from this Location
    </div>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import EpisodeCart from '@/components/carts/EpisodeCart'
  
  export default {
    name: 'SingleCharacterPage',
    components: {EpisodeCart},
    data() {
      return {
        episodesCount: 6
      }
    },
    computed: {
      ...mapState({
        singleCharacter: state => state.charactersStore.singleCharacter,
        episodesByCharacter: state => state.episodesStore.episodesByCharacter
      }),
      getEpisodesIds() {
        return this.singleCharacter.episode.reduce((acc, curr) => [...acc, curr.split('/').pop()], '')
      },
      isCharacterExist() {
        return !!Object.keys(this.singleCharacter).length
      }
    },
    async created() {
      await this.getSingleCharacter(this.$route.params.characterId)
      await this.getEpisodesByCharacter(this.getEpisodesIds.slice(0, this.episodesCount).join(','))
    },
    beforeDestroy() {
      this.CLEAR_EPISODES()
      document.removeEventListener('scroll', this.getNextEpisodes)
    },
    mounted() {
      document.addEventListener('scroll', this.getNextEpisodes)
    },
    methods: {
      ...mapActions({
        getSingleCharacter: 'charactersStore/getSingleCharacter',
        getEpisodesByCharacter: 'episodesStore/getEpisodesByCharacter'
      }),
      ...mapMutations({
        CLEAR_EPISODES: 'episodesStore/CLEAR_EPISODES_BY_CHARACTER'
      }),
      async getNextEpisodes() {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          this.episodesCount += 6
          const ids = this.getEpisodesIds.slice(this.episodesCount - 6, this.episodesCount).join(',')
          if (ids.length) await this.getEpisodesByCharacter(ids)
        }
      },
      getLocationId(locationUrl) {
        return +locationUrl.split('/')[locationUrl.split('/').length - 1]
      }
    }
  }
</script>

<style scoped>

</style>