<template>
  
</template>

<script>
  import {mapActions, mapState} from "vuex";

  export default {
    name: "EpisodesPage",
    data() {
      return {
        episodes: [],
      }
    },
    computed: {
      ...mapState('episodesStore', ['allEpisodes'])
    },
    async created() {
      await this.getEpisodes();
      this.episodes = this.allEpisodes;
    },
    methods: {
      ...mapActions('episodesStore', ['getEpisodes'])
    },
  }
</script>

<style scoped>

</style>