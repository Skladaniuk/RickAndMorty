<template>
  <v-main>
    <transition
      mode='out-in'
      name='fade'
    >
      <router-view/>
    </transition>
  </v-main>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style scoped>

</style>