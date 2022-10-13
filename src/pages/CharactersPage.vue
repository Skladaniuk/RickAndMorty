<template>
  <div>
    <div>
      <v-row v-if='allCharacters.length'>
        <v-col
          v-for='(character, i) in allCharacters'
          :key='i'
          class='mb-6'
          cols='12'
          md='6'
        >
          <CharacterCart :character='character'/>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for='i in 12'
          :key='i'
          class='mb-6'
          cols='12'
          md='6'
        >
          <v-skeleton-loader
            type='list-item-avatar, card-heading, list-item-three-line'
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <v-pagination
      v-model='page'
      :length='pagesCount'
      :total-visible='7'
      class='text-center mt-12'
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import CharacterCart from '@/components/carts/CharacterCart'

export default {
  name: 'CharactersPage',
  components: { CharacterCart },
  data() {
    return {
      page: 1
    }
  },
  computed: mapState('charactersStore', ['allCharacters', 'pagesCount']),
  watch: {
    async page() {
      this.CLEAR_CHARACTERS()
      await this.getCharacters({ page: this.page })
    }
  },
  async created() {
    this.CLEAR_CHARACTERS()
    await this.getCharacters({ page: this.page })
  },
  methods: {
    ...mapMutations('charactersStore', ['CLEAR_CHARACTERS']),
    ...mapActions('charactersStore', ['getCharacters'])
  }
}
</script>