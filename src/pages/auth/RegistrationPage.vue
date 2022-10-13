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
            sm='10'
          >
            <v-row class='mb-6' justify='center'>
              <v-col cols='12'>
                <h1 class='text-center'>Registration</h1>
              </v-col>
            </v-row>
            <v-card
              class='pt-14 pb-10 px-1 px-sm-10'
              color='#f9f9f9'
            >
              <v-row justify='center'>
                <v-col
                  class='py-0'
                  cols='11'
                  sm='6'
                >
                  <v-text-field
                    v-model='newUser.firstName'
                    :rules='fieldRules'
                    label='First Name'
                    outlined
                    required
                    type='text'
                  ></v-text-field>
                </v-col>
                <v-col
                  class='py-0'
                  cols='11'
                  sm='6'
                >
                  <v-text-field
                    v-model='newUser.lastName'
                    :rules='fieldRules'
                    label='Last Name'
                    outlined
                    required
                    type='text'
                  ></v-text-field>
                </v-col>
                <v-col
                  class='py-0'
                  cols='11'
                  sm='6'
                >
                  <v-text-field
                    v-model='newUser.phone'
                    v-mask="'+380-##-###-##-##'"
                    :rules='phoneRules'
                    label='Phone Number'
                    outlined
                    required
                    type='text'
                  ></v-text-field>
                </v-col>
                <v-col
                  class='py-0'
                  cols='11'
                  sm='6'
                >
                  <v-menu
                    ref='menu'
                    v-model='menu'
                    :close-on-content-click='false'
                    :return-value.sync='newUser.date'
                    max-width='290px'
                    min-width='auto'
                    offset-y
                    transition='scale-transition'
                  >
                    <template v-slot:activator='{ on, attrs }'>
                      <v-text-field
                        v-model='newUser.date'
                        :rules='fieldRules'
                        label='Birth Date'
                        outlined
                        readonly
                        required
                        v-bind='attrs'
                        v-on='on'
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model='newUser.date'
                      scrollable
                      type='date'
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        color='primary'
                        text
                        @click='menu = false'
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color='primary'
                        text
                        @click='$refs.menu.save(newUser.date)'
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  class='py-0'
                  cols='11'
                  sm='12'
                >
                  <v-text-field
                    v-model='newUser.email'
                    :rules='emailRules'
                    label='Email'
                    outlined
                    required
                    type='email'
                  ></v-text-field>
                </v-col>
                <v-col
                  class='py-0'
                  cols='11'
                  sm='6'
                >
                  <v-text-field
                    v-model='newUser.password'
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules='passRules'
                    :type="showPass ? 'text' : 'password'"
                    class='input-group--focused'
                    hint='At least 8 characters'
                    label='Password'
                    name='input-10-1'
                    outlined
                    required
                    @click:append='showPass = !showPass'
                  ></v-text-field>
                </v-col>
                <v-col
                  class='py-0'
                  cols='11'
                  sm='6'
                >
                  <v-text-field
                    :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules='passConfirmRules'
                    :type="showConfirm ? 'text' : 'password'"
                    class='input-group--focused'
                    hint='At least 8 characters'
                    label='Confirm Password'
                    name='input-10-2'
                    outlined
                    required
                    @click:append='showConfirm = !showConfirm'
                  ></v-text-field>
                </v-col>
                <v-col
                  class='py-0 justify-center'
                  cols='11'
                  sm='6'
                >
                  <v-btn
                    :to='{name: "LoginPage"}'
                    class='justify-center d-flex mb-5 mb-sm-0'
                    color='primary'
                    text
                  >
                    Have an account?
                  </v-btn>
                </v-col>
                <v-col
                  class='py-0'
                  cols='11'
                  sm='6'
                >
                  <v-btn
                    :disabled='!valid'
                    class='mx-auto ml-sm-auto d-block'
                    color='primary'
                    @click='registerUser'
                  >
                    Submit
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
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'RegistrationPage',
  data() {
    return {
      newUser: {
        firstName: '',
        lastName: '',
        phone: '',
        date: '',
        email: '',
        password: '',
        avatar: ''
      },
      valid: true,
      menu: false,
      fieldRules: [v => !!v || 'Required'],
      phoneRules: [
        v => !!v || 'Required',
        v => v.length >= 17 || 'Must be 9 digits'
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        v => !!v || 'Required',
        v => v.length >= 8 || 'Min 8 characters'
      ],
      showPass: false,
      passConfirmRules: [
        v => !!v || 'Confirm password',
        v => v === this.newUser.password || 'Passwords do not match'
      ],
      showConfirm: false,
      alertColor: '',
    }
  },
  computed: {
    ...mapState({
      allUsers: state => state.authStore.allUsers,
      statusMessage: state => state.authStore.statusMessage
    }),
    ...mapGetters({
      checkIfRegistered: 'authStore/checkIfRegistered'
    })
  },
  methods: {
    ...mapMutations({
      ADD_USER: 'authStore/ADD_USER',
      SET_SNACKBAR_PARAMS: 'snackbarStore/SET_SNACKBAR_PARAMS'
    }),
    ...mapActions({
      registerTheUser: 'authStore/registerTheUser'
    }),
    async registerUser() {
      if (this.$refs.form.validate()) {
        // this.ADD_USER(this.newUser)
        await this.registerTheUser(this.newUser)

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