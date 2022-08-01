<template>
  <div>
    <v-app-bar app>
      <!-- -->
      <v-app-bar-nav-icon @click.stop="showSidebar = !showSidebar"></v-app-bar-nav-icon>
      <v-toolbar-title>Rick And Morty App</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="showSidebar">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Rick and Morty App
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
      <v-divider></v-divider>
      
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          
          <v-list-item v-for="element in sidebarElements" :key="element.id" class='sidebar-nav-item'>
            <v-list-item-title>
              <router-link :to="{name: element.name}">{{element.title}}</router-link>
            </v-list-item-title>
          </v-list-item>
        
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    data() {
      return {
        showSidebar: true,
        sidebarElements: [
          {
            title: 'Overview',
            name: 'OverviewPage',
            id: 1
          },
          {
            title: 'Characters',
            name: 'CharactersPage',
            id: 2
          },
          {
            title: 'Locations',
            name: 'LocationsPage',
            id: 3
          },
          {
            title: 'Episodes',
            name: 'EpisodesPage',
            id: 4
          }
        ]
      }
    }
  }
</script>

<style scoped lang='scss'>

  .sidebar-nav-item a {
    color: #000;
    font-size: 18px;
    text-decoration: none;
    display: block;
  }
  
</style>