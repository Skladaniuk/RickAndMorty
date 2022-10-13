<template>
  <v-snackbar
    v-model='snackbarParams.isOpen'
    :color='snackbarParams.color'
    :timeout='timer'
    right
    top
  >
    {{ snackbarParams.message }}

    <template v-slot:action='{ attrs }'>
      <v-btn
        text
        v-bind='attrs'
        @click='snackbarParams.isOpen = false'
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'SnackbarComponent',
  data() {
    return {
      timer: 3000
    }
  },
  computed: mapState('snackbarStore', ['snackbarParams']),
  watch: {
    'snackbarParams.isOpen'() {
      if (this.snackbarParams.isOpen) setTimeout(this.closeSnackbar, this.timer)
    }
  },
  methods: {
    ...mapMutations('snackbarStore', ['SET_SNACKBAR_PARAMS']),
    closeSnackbar() {
      this.SET_SNACKBAR_PARAMS({
        isOpen: false,
        message: ''
      })
    }
  }
}
</script>

<style scoped>

</style>