<template>
  <v-dialog
    v-model='dialog'
    max-width='800px'
  >
    <template v-slot:activator='{ on, attrs }'>
      <v-btn
        class='mt-5 mx-auto d-block'
        color='primary'
        dark
        v-bind='attrs'
        v-on='on'
      >
        Edit Info
      </v-btn>
    </template>
    <v-form
      ref='form'
      v-model='valid'
      lazy-validation
    >
      <v-card class='pa-10' color='#f9f9f9'>
        <v-row justify='center'>
          <v-col cols='12'>
            <div class='avatar'>
              <v-avatar
                class='mb-3'
                color='brown'
                size='100'
              >
                <img
                  v-if='currentUser.avatar'
                  :src='currentUser.avatar'
                >
                <span
                  v-else
                  class='white--text text-h4'
                >
            {{ currentUser.firstName.charAt(0).toUpperCase() }}{{ currentUser.lastName.charAt(0).toUpperCase() }}
          </span>
              </v-avatar>
              <div class='upload-photo'>
                <v-file-input
                  v-model='photoFile'
                  accept='image/png, image/jpeg, image/bmp'
                  hide-input
                  prepend-icon='mdi-pencil'
                ></v-file-input>
              </div>
            </div>
          </v-col>
          <v-col
            cols='12'
            sm='6'
          >
            <v-text-field
              v-model='editedUser.firstName'
              :rules='fieldRules'
              label='First Name'
              outlined
              required
              type='text'
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            sm='6'
          >
            <v-text-field
              v-model='editedUser.lastName'
              :rules='fieldRules'
              label='Last Name'
              outlined
              required
              type='text'
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            sm='6'
          >
            <v-text-field
              v-model='editedUser.phoneNumber'
              v-mask="'+380-##-###-##-##'"
              :rules='phoneRules'
              label='Phone Number'
              outlined
              required
              type='text'
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            sm='6'
          >
            <v-menu
              ref='menu'
              v-model='menu'
              :close-on-content-click='false'
              :return-value.sync='editedUser.birthDate'
              max-width='290px'
              min-width='auto'
              offset-y
              transition='scale-transition'
            >
              <template v-slot:activator='{ on, attrs }'>
                <v-text-field
                  v-model='editedUser.birthDate'
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
                v-model='editedUser.birthDate'
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
                  @click='$refs.menu.save(editedUser.birthDate)'
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols='12'
            sm='6'
          >
            <v-text-field
              v-model='newPassword'
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules='newPassRules'
              :type="showPass ? 'text' : 'password'"
              class='input-group--focused'
              hint='At least 8 characters'
              label='New Password'
              name='input-10-1'
              outlined
              @focus='changePass = true'
              @click:append='showPass = !showPass'
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            sm='6'
          >
            <v-text-field
              v-if='changePass'
              v-model='oldPassword'
              :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules='oldPassRules'
              :type="showPass2 ? 'text' : 'password'"
              class='input-group--focused'
              hint='At least 8 characters'
              label='Old Password'
              name='input-10-1'
              outlined
              @click:append='showPass2 = !showPass2'
            ></v-text-field>
          </v-col>
          <v-col
            cols='6'
          >
            <v-btn
              color='primary'
              text
              @click='closeDialog'
            >
              Close
            </v-btn>
          </v-col>
          <v-col
            cols='6'
          >
            <v-btn
              :disabled='!valid'
              class='ml-auto d-block'
              color='primary'
              @click='editUser'
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'EditUserDialogComponent',
  computed: { ...mapState('authStore', ['currentUser']) },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      changePass: false,
      photoFile: [],
      photoSrc: '',
      editedUser: {},
      valid: true,
      menu: false,
      fieldRules: [v => !!v || 'Required'],
      phoneRules: [
        v => !!v || 'Required',
        v => v.length >= 17 || 'Must be 9 digits'
      ],
      newPassRules: [],
      showPass: false,
      oldPassRules: [
        v => v === this.currentUser.password || 'Passwords do not match'
      ],
      showPass2: false,
      dialog: false
    }
  },
  created() {
    this.editedUser = { ...this.currentUser }
  },
  watch: {
    changePass() {
      if (this.changePass) {
        this.newPassRules.push(v => v.length >= 8 || 'Min 8 characters')
      }
    },
    photoFile() {
      this.uploadPhoto()
    }
  },
  methods: {
    ...mapMutations({
      EDIT_USER: 'authStore/EDIT_USER',
      SET_CURRENT_USER: 'authStore/SET_CURRENT_USER',
      SET_SNACKBAR_PARAMS: 'snackbarStore/SET_SNACKBAR_PARAMS'
    }),
    editUser() {
      if (this.$refs.form.validate()) {
        this.EDIT_USER({ user: this.editedUser, newPass: this.newPassword, avatar: this.photoSrc })
        this.SET_CURRENT_USER(this.editedUser)
        this.newPassword = ''
        this.oldPassword = ''
        this.newPassRules = []
        this.changePass = false
        this.dialog = false
        this.SET_SNACKBAR_PARAMS({
          isOpen: true,
          message: 'Info is edited',
          color: 'success'
        })
      }
    },
    closeDialog() {
      this.editedUser = { ...this.currentUser }
      this.newPassword = ''
      this.oldPassword = ''
      this.newPassRules = []
      this.changePass = false
      this.photoSrc = this.currentUser.avatar
      this.dialog = false
    },
    uploadPhoto() {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.photoSrc = reader.result
      })
      reader.readAsDataURL(this.photoFile)
    }
  }
}
</script>

<style lang='scss'>

.avatar {
  position: relative;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  .upload-photo {
    position: absolute;
    bottom: 15px;
    left: 65px;
    border-radius: 50%;
    background-color: cornflowerblue;
    .v-text-field {
      padding: 0;
      margin: 0;
    }
    .v-input__prepend-outer {
      margin: 0;
      padding: 5px;
    }
  }
}

</style>