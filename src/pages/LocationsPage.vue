<template>
  <div>
    <div>
      <v-row v-if='!allLocations.length'>
        <v-col
          v-for='i in 12'
          :key='i'
          class='mb-6'
          cols='12'
          md='6'
        >
          <v-skeleton-loader
            type='card-heading, list-item-three-line'
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for='(location, i) in allLocations'
          :key='i'
          class='mb-6'
          cols='12'
          md='6'
        >
          <LocationCart :location='location'/>
        </v-col>
      </v-row>
    </div>
    <v-pagination
      v-model='page'
      :length='pagesCount'
      :total-visible='7'
      class='text-center mb-12'
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import LocationCart from '@/components/carts/LocationCart'

export default {
  name: 'LocationsPage',
  components: { LocationCart },
  data() {
    return {
      page: 1
    }
  },
  computed: mapState('locationsStore', ['allLocations', 'pagesCount']),
  watch: {
    async page() {
      this.CLEAR_LOCATIONS()
      await this.getLocations({ page: this.page })
    }
  },
  async created() {
    this.CLEAR_LOCATIONS()
    await this.getLocations({ page: this.page })
  },
  methods: {
    ...mapActions('locationsStore', ['getLocations']),
    ...mapMutations('locationsStore', ['CLEAR_LOCATIONS'])
  }
}
</script>