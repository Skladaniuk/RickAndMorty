<template>
  <v-footer class='footer pa-0' app>
    <ul class='footer-nav'>
      <li
        v-for='item in allCount'
        :key='item.count'
      >
        {{item.text}}: {{item.count}}
      </li>
    </ul>
  </v-footer>
</template>

<script>
  import {mapState} from 'vuex'
  
  export default {
    name: 'FooterComponent',
    computed: {
      ...mapState(['allCount'])
    }
  }
</script>

<style scoped lang='scss'>
  .footer {
    z-index: 7;
  }
  
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