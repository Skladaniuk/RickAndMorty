<template>
  <div>
    <div>
      <v-row v-if='loading'>
        <v-col
          v-for='i in 12'
          :key='i'
          md='6'
          sm='12'
          class='mb-10'
        >
          <v-skeleton-loader
            type="card-heading, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="episode in allEpisodes"
          :key="episode.id"
          md='6'
          sm='12'
        >
          <EpisodeCart :episode="episode" />
        </v-col>
      </v-row>
    </div>
    <div class="text-center mb-12">
      <v-pagination
        v-model="page"
        :length="pagesCount"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
  import EpisodeCart from '@/components/carts/EpisodeCart'
  import {mapActions, mapState} from 'vuex'
  
  export default {
    name: 'EpisodesPage',
    components: {EpisodeCart},
    data() {
      return {
        page: 1,
        loading: false
      }
    },
    computed: mapState('episodesStore', ['allEpisodes', 'pagesCount']),
    watch: {
      async page() {
        this.loading = true
        await this.getEpisodes({page: this.page})
        this.loading = false
      }
    },
    methods: mapActions('episodesStore', ['getEpisodes'])
  }
</script>

<style scoped>

</style>