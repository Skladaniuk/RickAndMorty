<template>
  <v-card>
    <v-list-item class='flex-column flex-sm-row d-flex pa-0'>
      <router-link :to='{name: "SingleCharacterPage", params: {characterId: character.id}}' class='avatar'>
        <div class='ma-0 d-flex'>
          <img :src='character.image' width='100%'>
        </div>
      </router-link>

      <v-list-item-content class='px-5'>
        <router-link
          :to='{name: "SingleCharacterPage", params: {characterId: character.id}}'
          class='title font-weight-bold text-decoration-none indigo--text mb-2'
        >
          <span class='text-h4 text-sm-h5 mb-2'>{{ character.name }}</span>
        </router-link>
        <div class='d-flex'>
          <v-icon
            :color='checkLifeCharacter'
            class='mr-1'
            size='10'
          >
            mdi-brightness-1
          </v-icon>
          <span class='is-live'>{{ character.status }} - {{ character.species }}</span>
        </div>
        <div class='mt-3'>
          <span class='grey--text mr-2'>Last known location:</span>
          <router-link
            v-if='character.location.url'
            :to='{name: "SingleLocationPage", params: {locationId: getLocationId(character.location.url)}}'
          >
            <span>{{ character.location.name }}</span>
          </router-link>
          <span v-else>{{ character.location.name }}</span>
        </div>
      </v-list-item-content>
      <v-btn
        :color='likeColor'
        class='like-btn'
        icon
        @click='evaluateCharacter'
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CharacterCart',
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      likeColor: '',
      lifeIndicator: ''
    }
  },
  computed: {
    ...mapGetters('authStore', ['isLogged']),
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
  created() {
    this.likedCharacter()
  },
  methods: {
    ...mapMutations({
      LIKE_CHARACTER: 'charactersStore/LIKE_CHARACTER',
      DISLIKE_CHARACTER: 'charactersStore/DISLIKE_CHARACTER',
      SET_SNACKBAR_PARAMS: 'snackbarStore/SET_SNACKBAR_PARAMS'
    }),
    getLocationId(locationUrl) {
      return +locationUrl.split('/').pop()
    },
    evaluateCharacter() {
      if (this.isLogged) {
        this.character.isLiked = !this.character.isLiked
        if (this.character.isLiked) {
          this.LIKE_CHARACTER(this.character)
          this.likedCharacter()
        } else {
          this.DISLIKE_CHARACTER(this.character.id)
          this.likedCharacter()
        }
      } else {
        this.SET_SNACKBAR_PARAMS({
          isOpen: true,
          message: 'Please log-in to like',
          color: 'error'
        })
      }
    },
    likedCharacter() {
      if (this.character.isLiked) this.likeColor = 'pink'
      else this.likeColor = 'grey'
    }
  }
}
</script>

<style lang='scss' scoped>

.avatar {
  max-width: unset;
  width: 100%;
  @media (min-width: 600px) {
    max-width: 220px;
  }
}
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 7px;
  background-color: #fff;
  @media (min-width: 600px) {
    position: relative;
  }
}
.title:hover {
  text-decoration: underline !important;
}
</style>