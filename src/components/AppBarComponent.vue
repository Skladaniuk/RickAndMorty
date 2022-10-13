<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon v-if='isLogged' @click.stop='showSidebar = !showSidebar'></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <!--      <v-col cols='4'-->
      <!--       class='ml-auto'>-->
      <!--        <v-text-field placeholder='Search'></v-text-field>-->
      <!--      </v-col>-->
      <div v-if='isLogged' class='ml-auto'>
        <v-row justify='center'>
          <v-menu
            bottom
            min-width='200px'
            offset-y
            rounded
          >
            <template v-slot:activator='{ on }'>
              <v-btn
                icon
                x-medium
                v-on='on'
              >
                <v-avatar
                  color='brown'
                  size='36'
                >
                  <img
                    v-if='currentUser.avatar'
                    :src='currentUser.avatar'
                  >
                  <span
                    v-else
                    class='white--text'
                  >{{ currentUser.firstName.charAt(0).toUpperCase() }}{{ currentUser.lastName.charAt(0).toUpperCase() }}
                  </span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class='justify-center'>
                <div class='mx-auto text-center'>
                  <v-avatar
                    class='mb-3'
                    color='brown'
                  >
                    <img
                      v-if='currentUser.avatar'
                      :src='currentUser.avatar'
                    >
                    <span
                      v-else
                      class='white--text'
                    >{{ currentUser.firstName.charAt(0).toUpperCase() }}{{
                        currentUser.lastName.charAt(0).toUpperCase()
                      }}
                    </span>
                  </v-avatar>
                  <h3>{{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
                  <p class='text-caption mt-1'>
                    {{ currentUser.email }}
                  </p>
                  <v-divider class='my-1'></v-divider>
                  <v-btn
                    :to='{name: "ProfilePage"}'
                    depressed
                    text
                  >
                    Go To Profile
                  </v-btn>
                  <v-divider class='my-1'></v-divider>
                  <v-btn
                    text
                    @click='logOut'
                  >
                    Log-Out
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </div>
      <v-btn
        v-else
        :to='{name: "LoginPage"}'
        class='ml-auto'
        color='primary'
      >
        <v-icon class='mr-2'>
          mdi-account-circle
        </v-icon>
        Log-In
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-if='isLogged' v-model='showSidebar' app>
      <SidebarComponent/>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import SidebarComponent from '@/components/SidebarComponent'

export default {
  name: 'Sidebar',
  components: { SidebarComponent },
  data() {
    return {
      showSidebar: false
    }
  },
  computed: {
    ...mapState('authStore', ['currentUser']),
    ...mapGetters('authStore', ['isLogged'])
  },
  methods: {
    ...mapMutations({
      LOG_OUT: 'authStore/LOG_OUT',
      SET_SNACKBAR_PARAMS: 'snackbarStore/SET_SNACKBAR_PARAMS'
    }),
    logOut() {
      this.LOG_OUT(this.$store.state)
      if (this.$route.path !== '/') {
        this.$router.push({ name: 'OverviewPage' })
      }
      this.SET_SNACKBAR_PARAMS({
        isOpen: true,
        message: 'You are logged out',
        color: 'success'
      })
    }
  }
}
</script>