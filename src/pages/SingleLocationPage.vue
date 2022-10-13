<template>
  <div>
    <v-card class='list-item-card'>
      <v-list-item class='list-item-wrap' three-line>
        <v-list-item-content class='content'>
          <span class='text-h4 text-md-h2 mb-3 item-name'>{{ singleLocation.name }}</span>
          <div class='item-info mb-2'>
            <v-list-item-subtitle class='text-uppercase'>Type:</v-list-item-subtitle>
            <span class='text-h6'>{{ singleLocation.type }}</span>
          </div>
          <div class='item-info'>
            <v-list-item-subtitle class='text-uppercase'>Dimension:</v-list-item-subtitle>
            <span class='text-h6'>{{ singleLocation.dimension }}</span>
          </div>
        </v-list-item-content>
        <v-btn
          v-if='isLogged'
          :color='color'
          absolute
          icon
          right
          top
          @click='evaluateLocation'
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
        <h2 class='text-center'>Characters from this Location</h2>
      </v-col>
      <v-col
        v-for='(character, i) in charactersByLocation'
        :key='i'
        class='mb-6'
        cols='12'
        md='6'
      >
        <CharacterCart :character='character'/>
      </v-col>
    </v-row>
    <div v-if='!charactersByLocation.length' class='alert-message'>
      There are no Characters from this Location
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import CharacterCart from '@/components/carts/CharacterCart'

export default {
  name: 'SingleLocationPage',
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
      singleLocation: state => state.locationsStore.singleLocation,
      charactersByLocation: state => state.charactersStore.allCharacters
    }),
    ...mapGetters({
      isLogged: 'authStore/isLogged',
      getCharactersIdsByLocation: 'locationsStore/getCharactersIdsByLocation'
    })
  },
  async created() {
    await this.getSingleLocation(this.$route.params.locationId)
    this.CLEAR_CHARACTERS()
    await this.getCharactersByLocation(this.getCharactersIdsByLocation.slice(0, this.charactersCount).join(','))
    this.loading = false
    this.likedLocation()
  },
  mounted() {
    document.addEventListener('scroll', this.getNextCharacters)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.getNextCharacters)
  },
  methods: {
    ...mapActions({
      getSingleLocation: 'locationsStore/getSingleLocation',
      getCharactersByLocation: 'charactersStore/getCharactersByLocation'
    }),
    ...mapMutations({
      CLEAR_CHARACTERS: 'charactersStore/CLEAR_CHARACTERS',
      LIKE_LOCATION: 'locationsStore/LIKE_LOCATION',
      DISLIKE_LOCATION: 'locationsStore/DISLIKE_LOCATION'
    }),
    async getNextCharacters() {
      if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
        this.charactersCount += 6
        const ids = this.getCharactersIdsByLocation.slice(this.charactersCount - 6, this.charactersCount).join(',')
        if (ids.length) await this.getCharactersByLocation(ids)
      }
    },
    evaluateLocation() {
      this.singleLocation.isLiked = !this.singleLocation.isLiked
      if (this.singleLocation.isLiked) {
        this.LIKE_LOCATION(this.singleLocation)
        this.likedLocation()
      } else {
        this.DISLIKE_LOCATION(this.singleLocation.id)
        this.likedLocation()
      }
    },
    likedLocation() {
      if (this.singleLocation.isLiked) this.color = 'pink'
      else this.color = 'grey'
    }
  }
}
</script>

<style scoped>

.alert-message {
  text-align: center;
  font-size: 20px;
  margin-top: 100px;
  font-weight: 700;
}

</style>