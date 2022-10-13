<template>
  <div>
    <v-card v-if='isCharacterExist' class='pa-0'>
      <v-list-item class='flex-column flex-sm-row pa-0 pa-sm-4'>
        <div class='pa-0 mr-sm-3 col-12 col-sm-4'>
          <img :src='character.image' width='100%'>
        </div>
        <v-list-item-content class='px-4 px-sm-0'>
          <span class='text-h4 text-sm-h3 text-md-h2 mb-2 item-name'>{{ character.name }}</span>
          <div class='item-in-life'>
            <div class='d-flex'>
              <v-icon
                :color='checkLifeCharacter'
                class='mr-1'
                size='10'
              >
                mdi-brightness-1
              </v-icon>
              <span>{{ character.status }} - {{ character.species }}</span>
            </div>
          </div>
          <div class='d-flex mt-4'>
            <span class='text-uppercase grey--text mb-1 mr-2'>Gender:</span>
            <span>{{ character.gender }}</span>
          </div>
          <div class='d-flex mt-1'>
            <span class='text-uppercase grey--text mb-1 mr-2'>Origin:</span>
            <router-link
              v-if='singleCharacter.origin.url'
              :to='{name: "SingleLocationPage", params: {locationId: getLocationId(singleCharacter.origin.url)}}'
            >
              <span>{{ character.origin.name }}</span>
            </router-link>
            <span v-else>{{ character.origin.name }}</span>
          </div>
          <div class='d-flex mt-1'>
            <span class='text-uppercase grey--text mb-1 mr-2'>Last known location:</span>
            <router-link
              v-if='singleCharacter.location.url'
              :to='{name: "SingleLocationPage", params: {locationId: getLocationId(singleCharacter.location.url)}}'
            >
              <span>{{ character.location.name }}</span>
            </router-link>
            <span v-else>{{ character.location.name }}</span>
          </div>
        </v-list-item-content>
        <v-btn
          :color='color'
          class='like-btn'
          icon
          @click='evaluateCharacter'
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-list-item>
    </v-card>
    <v-row v-if='loading'>
      <v-col
        v-for='i in 12'
        :key='i'
        class='mb-6'
        cols='12'
        md='6'
      >
        <v-skeleton-loader
          type='card-heading, list-item-three-line'
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else class='mt-15'>
      <v-col cols='12'>
        <h2 class='text-center'>Episodes with {{ character.name }}</h2>
      </v-col>
      <v-col
        v-for='(episode, i) in episodesByCharacter'
        :key='i'
        class='mb-6'
        cols='12'
        md='6'
      >
        <EpisodeCart :episode='episode'/>
      </v-col>
    </v-row>
    <div v-if='!episodesByCharacter.length' class='text-h6 text-sm-h4 text-center'>
      There are no Episodes with {{ character.name }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import EpisodeCart from '@/components/carts/EpisodeCart'

export default {
  name: 'SingleCharacterPage',
  components: { EpisodeCart },
  data() {
    return {
      color: '',
      episodesCount: 6,
      loading: true,
      character: {}
    }
  },
  computed: {
    ...mapState({
      singleCharacter: state => state.charactersStore.singleCharacter,
      episodesByCharacter: state => state.episodesStore.allEpisodes
    }),
    ...mapGetters({
      isLogged: 'authStore/isLogged',
      getEpisodesIdsByCharacter: 'charactersStore/getEpisodesIdsByCharacter'
    }),
    isCharacterExist() {
      return !!Object.keys(this.character).length
    },
    checkLifeCharacter() {
      switch (this.character.status) {
        case 'Alive':
          return 'green'
          break
        case 'Dead':
          return 'red'
          break
        default:
          return 'grey'
      }
    }
  },
  async created() {
    await this.getSingleCharacter(this.$route.params.characterId)
    this.character = this.singleCharacter
    this.CLEAR_EPISODES()
    await this.getEpisodesByCharacter(this.getEpisodesIdsByCharacter.slice(0, this.episodesCount).join(','))
    this.loading = false
    this.likedCharacter()
  },
  mounted() {
    document.addEventListener('scroll', this.getNextEpisodes)
  },
  beforeDestroy() {
    this.CLEAR_SINGLE_CHARACTER({})
    document.removeEventListener('scroll', this.getNextEpisodes)
  },
  methods: {
    ...mapActions({
      getSingleCharacter: 'charactersStore/getSingleCharacter',
      getEpisodesByCharacter: 'episodesStore/getEpisodesByCharacter'
    }),
    ...mapMutations({
      CLEAR_EPISODES: 'episodesStore/CLEAR_EPISODES',
      CLEAR_SINGLE_CHARACTER: 'charactersStore/SET_SINGLE_CHARACTER',
      LIKE_CHARACTER: 'charactersStore/LIKE_CHARACTER',
      DISLIKE_CHARACTER: 'charactersStore/DISLIKE_CHARACTER'
    }),
    async getNextEpisodes() {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.episodesCount += 6
        const ids = this.getEpisodesIdsByCharacter.slice(this.episodesCount - 6, this.episodesCount).join(',')
        if (ids.length) await this.getEpisodesByCharacter(ids)
      }
    },
    getLocationId(locationUrl) {
      return +locationUrl.split('/').pop()
    },
    evaluateCharacter() {
      this.character.isLiked = !this.character.isLiked
      if (this.character.isLiked) {
        this.LIKE_CHARACTER(this.character)
        this.likedCharacter()
      } else {
        this.DISLIKE_CHARACTER(this.character.id)
        this.likedCharacter()
      }
    },
    likedCharacter() {
      if (this.character.isLiked) this.color = 'pink'
      else this.color = 'grey'
    }
  }
}
</script>

<style lang='scss' scoped>
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 7px;
  background-color: #fff;
}
</style>