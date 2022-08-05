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
            type="list-item-avatar, card-heading, list-item-three-line"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="character in allCharacters"
          :key="character.id"
          md='6'
          sm='12'
        >
          <CharacterCart :character='character' />
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
  import {mapState, mapActions} from 'vuex'
  import CharacterCart from '@/components/carts/CharacterCart'
  
  export default {
    name: 'CharactersPage',
    components: {CharacterCart},
    data() {
      return {
        page: 1,
        loading: false
      }
    },
    computed: mapState('charactersStore', ['allCharacters', 'pagesCount']),
    watch: {
      async page() {
        this.loading = true
        await this.getCharacters({page: this.page})
        this.loading = false
      }
    },
    methods: mapActions('charactersStore', ['getCharacters'])
  }
</script>

<style scoped>

</style>