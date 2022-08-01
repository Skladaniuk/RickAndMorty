<template>
  <v-app>
    <NavSidebar />
    
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    
    <Footer
      :charactersNumber="allCharactersNumber" :episodesNumber="allEpisodesNumber" :locationsNumber="allLocationsNumber"
    />
  </v-app>
</template>

<script>
  
  import NavSidebar from '@/components/NavSidebar'
  import Footer from '@/components/Footer'
  import {mapActions, mapState} from 'vuex'
  
  export default {
    name: 'App',
    components: {
      NavSidebar,
      Footer
    },
    data() {
      return {
        characters: [],
        episodes: [],
        locations: []
      }
    },
    computed: {
      ...mapState('charactersStore', ['allCharacters', 'allCharactersNumber']),
      ...mapState('episodesStore', ['allEpisodes', 'allEpisodesNumber']),
      ...mapState('locationsStore', ['allLocations', 'allLocationsNumber'])
    },
    async created() {
      await this.getCharacters()
      this.characters = this.allCharacters
      await this.getEpisodes()
      this.episodes = this.allEpisodes
      await this.getLocations()
      this.locations = this.allLocations
    },
    methods: {
      ...mapActions('charactersStore', ['getCharacters']),
      ...mapActions('episodesStore', ['getEpisodes']),
      ...mapActions('locationsStore', ['getLocations'])
    }
  }
</script>
