<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class='text-h5 font-weight-bold py-2'>
          Rick and Morty App
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item-group active-class='indigo--text text--accent-4'>
        <v-list-item v-for='element in sidebarElements' :key='element.id' class='mb-4'>
          <v-list-item-title class='d-flex'>
            <router-link
              :to='{name: element.name}'
              class='page-link d-flex align-center black--text text-h6 text-decoration-none font-weight-bold'
            >
              <v-icon class='mr-3'>{{ element.icon }}</v-icon>
              {{ element.title }}
            </router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',
  data() {
    return {
      sidebarElements: [
        {
          title: 'Overview',
          name: 'OverviewPage',
          id: 1,
          icon: 'mdi-circle-box'
        },
        {
          title: 'Characters',
          name: 'CharactersPage',
          id: 2,
          icon: 'mdi-account-group'
        },
        {
          title: 'Episodes',
          name: 'EpisodesPage',
          id: 3,
          icon: 'mdi-movie-play'
        },
        {
          title: 'Locations',
          name: 'LocationsPage',
          id: 4,
          icon: 'mdi-map-marker-multiple'
        }
      ]
    }
  }
}
</script>

<style scoped>
.page-link {
  width: 100%;
}
</style>