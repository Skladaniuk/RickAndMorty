<template>
  <div>
    <v-card class="list-item-card">
      <v-list-item three-line class="list-item-wrap">
        <v-list-item-content class="content">
          <v-list-item-title class="text-h5 mb-1 item-name">{{singleLocation.name}}</v-list-item-title>
          <div class="item-info">
            <v-list-item-subtitle>Type:</v-list-item-subtitle>
            <span>{{singleLocation.type}}</span>
          </div>
          <div class="item-info">
            <v-list-item-subtitle>Dimension:</v-list-item-subtitle>
            <span>{{singleLocation.dimension}}</span>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-row v-if='charactersByLocation.length' class='mt-15'>
      <v-col
        v-for='character in charactersByLocation'
        :key='character.id'
        md='6'
        sm='12'
      >
        <CharacterCart :character='character' />
      </v-col>
    </v-row>
    <div v-else class='alert-message'>
      There are no Characters from this Location
    </div>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import CharacterCart from '@/components/carts/CharacterCart'
  
  export default {
    name: 'SingleLocationPage',
    components: {CharacterCart},
    data() {
      return {
        charactersCount: 6,
      }
    },
    computed: {
      ...mapState({
        singleLocation: state => state.locationsStore.singleLocation,
        charactersByLocation: state => state.charactersStore.charactersByLocation
      }),
      getCharactersIds() {
        return this.singleLocation.residents.reduce((acc, curr) => [...acc, curr.split('/').pop()], '')
      }
    },
    async created() {
      await this.getSingleLocation(this.$route.params.locationId)
      if (this.getCharactersIds.length) {
        await this.getCharactersByLocation(this.getCharactersIds.slice(0, this.charactersCount).join(','))
      }
    },
    beforeDestroy() {
      this.CLEAR_CHARACTERS()
      document.removeEventListener('scroll', this.getNextCharacters)
    },
    mounted() {
      document.addEventListener('scroll', this.getNextCharacters)
    },
    methods: {
      ...mapActions({
        getSingleLocation: 'locationsStore/getSingleLocation',
        getCharactersByLocation: 'charactersStore/getCharactersByLocation'
      }),
      ...mapMutations({
        CLEAR_CHARACTERS: 'charactersStore/CLEAR_CHARACTERS_BY_LOCATION'
      }),
      async getNextCharacters() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
          this.charactersCount += 6
          const ids = this.getCharactersIds.slice(this.charactersCount - 6, this.charactersCount).join(',')
          if (ids.length) await this.getCharactersByLocation(ids)
        }
      }
    }
  }
</script>

<style scoped>
  
  .alert-message {
    text-align: center;
    font-size: 20px;
    margin-top: 100px;
    font-weight: 700;
  }

</style>