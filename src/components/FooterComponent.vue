<template>
  <v-footer app class='footer pa-0'>
    <ul class='footer-nav grey darken-4 d-flex align-center justify-center pa-2 py-sm-5'>
      <li
        v-for='item in allCount'
        :key='item.count'
        class='text-uppercase font-weight-bold'
      >
        {{ item.text }}: {{ item.count }}
      </li>
    </ul>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterComponent',
  computed: {
    ...mapState(['allCount'])
  }
}
</script>

<style lang='scss' scoped>
.footer {
  z-index: 7;
}
.footer-nav {
  list-style: none;
  width: 100%;
  li {
    color: rgb(158, 158, 158);
    font-size: 10px;
    @media (min-width: 600px) {
      font-size: 16px;
    }
  }
  li:not(:last-child) {
    margin-right: 20px;
  }
}

</style>