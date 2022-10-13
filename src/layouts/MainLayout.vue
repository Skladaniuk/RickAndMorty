<template>
  <div>
    <NavSidebar/>
    <v-main>
      <v-container fluid>
        <transition
          mode='out-in'
          name='fade'
        >
          <router-view/>
        </transition>
      </v-container>
    </v-main>

    <FooterComponent/>
  </div>
</template>

<script>
import NavSidebar from '@/components/AppBarComponent'
import FooterComponent from '@/components/FooterComponent'
import { mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: {
    NavSidebar,
    FooterComponent
  },
  async created() {
    await this.getCharacters()
    await this.getRandomCharacters()
    await this.getEpisodes()
    await this.getLocations()
  },
  methods: {
    ...mapActions({
      getCharacters: 'charactersStore/getCharacters',
      getRandomCharacters: 'charactersStore/getRandomCharacters',
      getEpisodes: 'episodesStore/getEpisodes',
      getLocations: 'locationsStore/getLocations'
    })
  }
}
</script>