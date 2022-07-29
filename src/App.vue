<template>
  <v-app>
    <NavSidebar/>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>

  import NavSidebar from "@/components/NavSidebar";
  export default {
    name: 'App',
    components: {NavSidebar},
    data() {
      return {

      }
    },
  };
</script>
