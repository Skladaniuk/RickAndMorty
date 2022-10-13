<template>
  <div>
    <v-btn
      :to='{name: "OverviewPage"}'
      class='mt-3 ml-3'
      color='primary'
    >
      <v-icon class='mr-1' color='white'>mdi-home</v-icon>
      Home
    </v-btn>
    <v-form
      ref='form'
      v-model='valid'
      class='mt-12'
      lazy-validation
    >
      <v-container>
        <v-row justify='center'>
          <v-col
            cols='11'
            md='8'
            sm='9'
          >
            <v-row class='mb-6' justify='center'>
              <v-col cols='12'>
                <h1 class='text-center'>Login</h1>
              </v-col>
            </v-row>
            <v-card
              class='pt-14 pb-10 px-1 px-sm-10'
              color='#f9f9f9'
            >
              <v-row justify='center'>
                <v-col
                  cols='11'
                  md='8'
                >
                  <v-text-field
                    v-model='user.email'
                    :rules='emailRules'
                    label='Email'
                    outlined
                    required
                    type='email'
                  ></v-text-field>
                  <v-text-field
                    v-model='user.password'
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules='passRules'
                    :type="show ? 'text' : 'password'"
                    class='input-group--focused'
                    hint='At least 8 characters'
                    label='Password'
                    name='input-10-2'
                    outlined
                    required
                    @click:append='show = !show'
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify='center'>
                <v-col cols='5'>
                  <v-btn
                    :to='{name: "RegistrationPage"}'
                    color='primary'
                    text
                  >Registration
                  </v-btn>
                </v-col>
                <v-col cols='5'>
                  <v-btn
                    :disabled='!valid'
                    class='ml-auto d-block'
                    color='primary'
                    @click='loginUser'
                  >
                    Log-In
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      valid: true,
      show: false,
      passRules: [
        value => !!value || 'Required',
        v => v.length >= 8 || 'Min 8 characters'
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      alertColor: ''
    }
  },
  computed: {
    ...mapState({
      statusMessage: state => state.authStore.statusMessage
    }),
    ...mapGetters({
      findUser: 'authStore/findUser'
    })
  },
  methods: {
    ...mapMutations({
      SET_SNACKBAR_PARAMS: 'snackbarStore/SET_SNACKBAR_PARAMS',
      SET_CURRENT_USER: 'authStore/SET_CURRENT_USER'
    }),
    ...mapActions({
      loginTheUser: 'authStore/loginTheUser'
    }),
    async loginUser() {
      if (this.$refs.form.validate()) {
        // this.SET_CURRENT_USER(this.findUser(this.user))
        await this.loginTheUser(this.user)

        switch(this.statusMessage.status) {
          case 200:
            this.alertColor = 'success'
            break
          case 404:
            this.alertColor = 'error'
            break
        }

        this.SET_SNACKBAR_PARAMS({
          isOpen: true,
          message: this.statusMessage.data.message,
          color: this.alertColor
        })
      }
    }
  }
}
</script>