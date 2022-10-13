<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <router-link
          :to='{name: "SingleLocationPage", params: {locationId: location.id}}'
          class='title text-decoration-none indigo--text mb-2'
        >
          <span class='text-h5 mb-3'>{{ location.name }}</span>
        </router-link>
        <div class='mb-2'>
          <v-list-item-subtitle>Type:</v-list-item-subtitle>
          <span>{{ location.type }}</span>
        </div>
        <div>
          <v-list-item-subtitle>Dimension:</v-list-item-subtitle>
          <span>{{ location.dimension }}</span>
        </div>
      </v-list-item-content>
      <v-btn
        v-if='isLogged'
        :color='color'
        icon
        @click='evaluateLocation'
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LocationCart',
  props: {
    location: {
      type: Object
    }
  },
  data() {
    return {
      color: ''
    }
  },
  computed: {
    ...mapGetters('authStore', ['isLogged'])
  },
  created() {
    this.likedLocation()
  },
  methods: {
    ...mapMutations({
      LIKE_LOCATION: 'locationsStore/LIKE_LOCATION',
      DISLIKE_LOCATION: 'locationsStore/DISLIKE_LOCATION'
    }),
    evaluateLocation() {
      this.location.isLiked = !this.location.isLiked
      if (this.location.isLiked) {
        this.LIKE_LOCATION(this.location)
        this.likedLocation()
      } else {
        this.DISLIKE_LOCATION(this.location.id)
        this.likedLocation()
      }
    },
    likedLocation() {
      if (this.location.isLiked) this.color = 'pink'
      else this.color = 'grey'
    }
  }
}
</script>

<style lang='scss' scoped>
.title:hover {
  text-decoration: underline !important;
}
</style>