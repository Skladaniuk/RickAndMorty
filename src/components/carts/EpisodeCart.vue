<template>
  <v-card class="list-item-card">
    <v-list-item three-line class="list-item-wrap">
      
      <v-list-item-content class="content">
        <router-link :to='{name: "SingleEpisodePage", params: {episodeId: episode.id}}'>
          <v-list-item-title class="text-h5 mb-1 item-name">{{episode.name}}</v-list-item-title>
        </router-link>
        <div class="item-info">
          <v-list-item-subtitle>Air Date:</v-list-item-subtitle>
          <span>{{episode.air_date}}</span>
        </div>
        <div class="item-info">
          <v-list-item-subtitle>Episode ID:</v-list-item-subtitle>
          <span>{{episode.episode}}</span>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {
    name: 'EpisodeCart',
    props: {
      episode: {
        type: Object
      }
    }
  }
</script>

<style scoped>
  
  .list-item-card {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .list-item-wrap {
    display: flex;
  }

</style>