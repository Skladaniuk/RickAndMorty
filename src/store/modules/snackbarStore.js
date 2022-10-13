export default {
  namespaced: true,
  state: {
    snackbarParams: {
      isOpen: false,
      message: '',
      color: ''
    }
  },
  getters: {},
  mutations: {
    SET_SNACKBAR_PARAMS: (state, params) => state.snackbarParams = params
  },
  actions: {}
}