<template>
  <div>
    <v-card class='mt-10 pa-4 pa-sm-6 pa-md-16'>
      <v-row class='justify-center flex-column-reverse flex-sm-row'>
        <v-col
          cols='12'
          sm='8'
        >
          <v-card-text class='text-h4 text-md-h3 mb-3 mb-sm-6'>{{
              `${ currentUser.firstName } ${ currentUser.lastName }`
            }}
          </v-card-text>
          <v-card-subtitle class='text-h6'>Phone Number</v-card-subtitle>
          <v-card-text>{{ currentUser.phoneNumber }}</v-card-text>
          <v-card-subtitle class='text-h6'>Email</v-card-subtitle>
          <v-card-text>{{ currentUser.email }}</v-card-text>
          <v-card-subtitle class='text-h6'>Birth Date</v-card-subtitle>
          <v-card-text>{{ currentUser.birthDate }}</v-card-text>
          <EditUserDialogComponent/>
        </v-col>
        <v-col
          class='d-flex justify-center'
          cols='12'
          sm='4'
        >
          <v-avatar
            class='mt-md-8'
            rounded
            size='200'
          >
            <img
              v-if='currentUser.avatar'
              :src='currentUser.avatar'
              width='100%'
            >
            <img
              v-else
              src='../assets/blank-profile-picture.png'
              width='100%'
            >
          </v-avatar>
        </v-col>
      </v-row>
    </v-card>
    <LikesTableComponent/>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import EditUserDialogComponent from '@/components/EditUserDialogComponent'
import LikesTableComponent from '@/components/LikesTableComponent'

export default {
  name: 'ProfilePage',
  components: {
    EditUserDialogComponent,
    LikesTableComponent
  },
  computed: { ...mapState('authStore', ['currentUser']) }
}
</script>