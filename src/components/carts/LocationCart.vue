<template>
  <v-card class="list-item-card">
    <v-list-item three-line class="list-item-wrap">
      <v-list-item-content class="content">
        <router-link :to='{name: "SingleLocationPage", params: {locationId: location.id}}'>
          <v-list-item-title class="text-h5 mb-1 item-name">{{location.name}}</v-list-item-title>
        </router-link>
        <div class="item-info">
          <v-list-item-subtitle>Type:</v-list-item-subtitle>
          <span>{{location.type}}</span>
        </div>
        <div class="item-info">
          <v-list-item-subtitle>Dimension:</v-list-item-subtitle>
          <span>{{location.dimension}}</span>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
  export default {
    name: 'LocationCart',
    props: {
      location: {
        type: Object
      }
    }
  }
</script>

<style scoped lang='scss'>
  
  .list-item-card {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .list-item-wrap {
    display: flex;
  }

</style>