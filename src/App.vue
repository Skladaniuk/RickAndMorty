<template>
  <v-app>
    <transition
      mode='out-in'
      name='fade'
    >
      <router-view/>
    </transition>
    <SnackbarComponent/>
  </v-app>
</template>

<script>
import SnackbarComponent from '@/components/SnackbarComponent'

export default {
  name: 'App',
  components: { SnackbarComponent }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
