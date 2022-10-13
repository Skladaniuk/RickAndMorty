<template>
  <div>
    <v-card class='list-item-card'>
      <v-list-item class='list-item-wrap' three-line>
        <v-list-item-content class='content'>
          <span class='text-h4 text-md-h2 mb-3 item-name'>{{ singleEpisode.name }}</span>
          <div class='item-info mb-2'>
            <v-list-item-subtitle class='text-uppercase'>Air Date:</v-list-item-subtitle>
            <span class='text-h6'>{{ singleEpisode.air_date }}</span>
          </div>
          <div class='item-info'>
            <v-list-item-subtitle class='text-uppercase'>Episode ID:</v-list-item-subtitle>
            <span class='text-h6'>{{ singleEpisode.episode }}</span>
          </div>
        </v-list-item-content>
        <v-btn
          v-if='isLogged'
          :color='color'
          absolute
          icon
          right
          top
          @click='evaluateEpisode'
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-list-item>
    </v-card>
    <v-row v-if='loading' class='mt-5'>
      <v-col
        v-for='i in 12'
        :key='i'
        class='mb-6'
        cols='12'
        md='6'
      >
        <v-skeleton-loader
          type='list-item-avatar, card-heading, list-item-three-line'
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else class='mt-15'>
      <v-col cols='12'>
        <h2 class='text-center'>Characters in this Episode</h2>
      </v-col>
      <v-col
        v-for='(character, i) in charactersByEpisode'
        :key='i'
        class='mb-6'
        cols='12'
        md='6'
      >
        <CharacterCart :character='character'/>
      </v-col>
    </v-row>
    <div v-if='!charactersByEpisode.length' class='alert-message'>
      There are no Characters from this Episode
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import CharacterCart from '@/components/carts/CharacterCart'

export default {
  name: 'SingleEpisodePage',
  components: { CharacterCart },
  data() {
    return {
      color: '',
      charactersCount: 6,
      loading: true
    }
  },
  computed: {
    ...mapState({
      singleEpisode: state => state.episodesStore.singleEpisode,
      charactersByEpisode: state => state.charactersStore.allCharacters
    }),
    ...mapGetters({
      isLogged: 'authStore/isLogged',
      getCharactersIdsByEpisode: 'episodesStore/getCharactersIdsByEpisode'
    })
  },
  async created() {
    await this.getSingleEpisode(this.$route.params.episodeId)
    this.CLEAR_CHARACTERS()
    await this.getCharactersByEpisode(this.getCharactersIdsByEpisode.slice(0, this.charactersCount).join(','))
    this.loading = false
    this.likedEpisode()
  },
  mounted() {
    document.addEventListener('scroll', this.getNextCharacters)
  },
  beforeDestroy() {
    this.CLEAR_SINGLE_EPISODE({})
    document.removeEventListener('scroll', this.getNextCharacters)
  },
  methods: {
    ...mapActions({
      getSingleEpisode: 'episodesStore/getSingleEpisode',
      getCharactersByEpisode: 'charactersStore/getCharactersByEpisode'
    }),
    ...mapMutations({
      CLEAR_CHARACTERS: 'charactersStore/CLEAR_CHARACTERS',
      CLEAR_SINGLE_EPISODE: 'episodesStore/SET_SINGLE_EPISODE',
      LIKE_EPISODE: 'episodesStore/LIKE_EPISODE',
      DISLIKE_EPISODE: 'episodesStore/DISLIKE_EPISODE'
    }),
    async getNextCharacters() {
      if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
        this.charactersCount += 6
        const ids = this.getCharactersIdsByEpisode.slice(this.charactersCount - 6, this.charactersCount).join(',')
        if (ids.length) await this.getCharactersByEpisode(ids)
      }
    },
    evaluateEpisode() {
      this.singleEpisode.isLiked = !this.singleEpisode.isLiked
      if (this.singleEpisode.isLiked) {
        this.LIKE_EPISODE(this.singleEpisode)
        this.likedEpisode()
      } else {
        this.DISLIKE_EPISODE(this.singleEpisode.id)
        this.likedEpisode()
      }
    },
    likedEpisode() {
      if (this.singleEpisode.isLiked) this.color = 'pink'
      else this.color = 'grey'
    }
  }
}
</script>

<style scoped>

</style>