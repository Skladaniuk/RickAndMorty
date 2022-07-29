<template>
  <CharacterItem v-for="character in characters" :key="character.id"/>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import CharacterItem from "@/components/CharacterItem";

  export default {
    name: "OverviewPage",
    components: {
      CharacterItem
    },
    computed: {
      ...mapState('charactersStore', ['characters'])
    },
    async created() {
      await this.getCharacters()
    },
    methods: {
      ...mapActions('charactersStore', ['getCharacters'])
    },
  }
</script>

<style scoped lang="scss">
  .list-item-card {
    width: 100%;
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