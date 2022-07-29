<template>
  <v-card class="mx-auto list-item-card" max-width="45%">
    <v-list-item three-line class="list-item-wrap">
      <v-list-item-avatar tile size="80" color="grey" class="avatar ma-0 mr-3">
        <img :src="character.image">
      </v-list-item-avatar>

      <v-list-item-content class="content">
        <v-list-item-title class="text-h5 mb-1 item-name">{{character.name}}</v-list-item-title>
        <div class="item-in-life">
          <span>{{character.status}} - {{character.species}}</span>
        </div>
        <div class="item-info">
          <v-list-item-subtitle>Last known location:</v-list-item-subtitle>
          <span>{{character.location.name}}</span>
        </div>
        <div class="item-info">
          <v-list-item-subtitle>First seen in:</v-list-item-subtitle>
          <span></span>
        </div>
      </v-list-item-content>

    </v-list-item>
  </v-card>
</template>

<script>
  export default {
    name: "CharacterItem"
  }
</script>

<style scoped>

</style>