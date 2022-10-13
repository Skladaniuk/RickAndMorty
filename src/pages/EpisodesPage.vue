<template>
  <div>
    <div>
      <v-row v-if='!allEpisodes.length'>
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
      <v-row v-else>
        <v-col
          v-for='(episode, i) in allEpisodes'
          :key='i'
          class='mb-6'
          cols='12'
          md='6'
        >
          <EpisodeCart :episode='episode'/>
        </v-col>
      </v-row>
    </div>
    <v-pagination
      v-model='page'
      :length='pagesCount'
      :total-visible='7'
      class='text-center mb-12'
    ></v-pagination>
  </div>
</template>

<script>
import EpisodeCart from '@/components/carts/EpisodeCart'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'EpisodesPage',
  components: { EpisodeCart },
  data() {
    return {
      page: 1
    }
  },
  computed: mapState('episodesStore', ['allEpisodes', 'pagesCount']),
  watch: {
    async page() {
      this.CLEAR_EPISODES()
      await this.getEpisodes({ page: this.page })
    }
  },
  async created() {
    this.CLEAR_EPISODES()
    await this.getEpisodes({ page: this.page })
  },
  methods: {
    ...mapActions('episodesStore', ['getEpisodes']),
    ...mapMutations('episodesStore', ['CLEAR_EPISODES'])
  }
}
</script>