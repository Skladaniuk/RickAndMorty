<template>
  <v-footer class='pa-0' app>
    <ul class='footer-nav'>
      <li>Characters: {{charactersNumber}}</li>
      <li>Episodes: {{episodesNumber}}</li>
      <li>Locations: {{locationsNumber}}</li>
    </ul>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      charactersNumber: {
        type: Number,
      },
      episodesNumber: {
        type: Number,
      },
      locationsNumber: {
        type: Number,
      }
    }
  }
</script>

<style scoped lang='scss'>

  .footer-nav {
    background-color: rgb(32, 35, 41);
    display: flex;
    justify-content: center;
    padding: 30px 0;
    width: 100%;
    list-style: none;
    
    li:not(:last-child) {
      margin-right: 20px;
    }
  
    li {
      color: rgb(158, 158, 158);
      text-transform: uppercase;
      text-decoration: none;
      font-weight: 700;
    }
  }
  
</style>