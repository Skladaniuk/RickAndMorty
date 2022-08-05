<template>
  <v-card class="list-item-card">
    <v-list-item three-line class="list-item-wrap">
      <router-link :to='{name: "SingleCharacterPage", params: {characterId: character.id}}'>
        <v-list-item-avatar tile size="80" color="grey" class="avatar ma-0 mr-3">
          <img :src="character.image">
        </v-list-item-avatar>
      </router-link>
      
      <v-list-item-content class="content">
        <router-link :to='{name: "SingleCharacterPage", params: {characterId: character.id}}'>
          <v-list-item-title class="text-h5 mb-1 item-name">{{character.name}}</v-list-item-title>
        </router-link>
        <div class="item-in-life">
          <span>{{character.status}} - {{character.species}}</span>
        </div>
        <div class="item-info">
          <v-list-item-subtitle>Last known location:</v-list-item-subtitle>
          <router-link :to='{name: "SingleLocationPage", params: {locationId: getLocationId(character.location.url)}}'>
            <span>{{character.location.name}}</span>
          </router-link>
        </div>
<!--        <div class="item-info">-->
<!--          <v-list-item-subtitle>First seen in:</v-list-item-subtitle>-->
<!--          <span></span>-->
<!--        </div>-->
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  
  export default {
    name: 'CharacterCart',
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    methods: {
      getLocationId(locationUrl) {
        return +locationUrl.split("/")[locationUrl.split("/").length - 1]
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-item-card {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .list-item-wrap {
    display: flex;
    padding: 0;
  }
  
  .avatar {
    min-width: 200px !important;
    min-height: 200px;
    
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>