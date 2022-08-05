<template>
  <div>
    <NavSidebar />
  
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  
    <FooterComponent />
  </div>
</template>

<script>
  import NavSidebar from '@/components/NavSidebar'
  import FooterComponent from '@/components/FooterComponent'
  import {mapActions} from 'vuex'
  
  export default {
    name: 'DefaultLayout',
    components: {
      NavSidebar,
      FooterComponent
    },
    async created() {
      await this.getCharacters()
      await this.getTenRandomCharacters()
      await this.getEpisodes()
      await this.getLocations()
    },
    methods: {
      ...mapActions({
        getCharacters: 'charactersStore/getCharacters',
        getTenRandomCharacters: 'charactersStore/getTenRandomCharacters',
        getEpisodes: 'episodesStore/getEpisodes',
        getLocations: 'locationsStore/getLocations'
      })
    }
  }
</script>