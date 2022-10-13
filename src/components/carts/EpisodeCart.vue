<template>
  <v-card>
    <v-list-item>
      <v-list-item-content class='content'>
        <router-link
          :to='{name: "SingleEpisodePage", params: {episodeId: episode.id}}'
          class='title text-decoration-none indigo--text mb-2'
        >
          <span class='text-h5 mb-3'>{{ episode.name }}</span>
        </router-link>
        <div class='mb-2'>
          <v-list-item-subtitle>Air Date:</v-list-item-subtitle>
          <span>{{ episode.air_date }}</span>
        </div>
        <div>
          <v-list-item-subtitle>Episode ID:</v-list-item-subtitle>
          <span>{{ episode.episode }}</span>
        </div>
      </v-list-item-content>
      <v-btn
        v-if='isLogged'
        :color='color'
        icon
        @click='evaluateEpisode'
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'EpisodeCart',
  props: {
    episode: {
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
    this.likedEpisode()
  },
  methods: {
    ...mapMutations({
      LIKE_EPISODE: 'episodesStore/LIKE_EPISODE',
      DISLIKE_EPISODE: 'episodesStore/DISLIKE_EPISODE'
    }),
    evaluateEpisode() {
      this.episode.isLiked = !this.episode.isLiked
      if (this.episode.isLiked) {
        this.LIKE_EPISODE(this.episode)
        this.likedEpisode()
      } else {
        this.DISLIKE_EPISODE(this.episode.id)
        this.likedEpisode()
      }
    },
    likedEpisode() {
      if (this.episode.isLiked) this.color = 'pink'
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