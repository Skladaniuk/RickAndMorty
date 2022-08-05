<template>
  <div>
    <div>
      <v-row v-if='loading'>
        <v-col
          v-for='i in 12'
          :key='i'
          md='6'
          sm='12'
          class='mb-10'
        >
          <v-skeleton-loader
            type="card-heading, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="location in allLocations"
          :key="location.id"
          md='6'
          sm='12'
        >
          <LocationCart :location="location" />
        </v-col>
      </v-row>
    </div>
    <div class="text-center mb-12">
      <v-pagination
        v-model="page"
        :length="pagesCount"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import LocationCart from '@/components/carts/LocationCart'
  
  export default {
    name: 'LocationsPage',
    components: {LocationCart},
    data() {
      return {
        page: 1,
        loading: false
      }
    },
    computed: mapState('locationsStore', ['allLocations', 'pagesCount']),
    watch: {
      async page() {
        this.loading = true
        await this.getLocations({page: this.page})
        this.loading = false
      }
    },
    methods: mapActions('locationsStore', ['getLocations'])
  }
</script>

<style scoped>

</style>