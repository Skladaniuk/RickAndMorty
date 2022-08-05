import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout'
import LoginPage from '@/pages/auth/LoginPage'
import RegistrationPage from '@/pages/auth/RegistrationPage'

import MainLayout from '@/layouts/MainLayout'
import OverviewPage from '@/pages/OverviewPage'
import CharactersPage from '@/pages/CharactersPage'
import LocationsPage from '@/pages/LocationsPage'
import EpisodesPage from '@/pages/EpisodesPage'
import SingleCharacterPage from '@/pages/SingleCharacterPage'
import SingleEpisodePage from '@/pages/SingleEpisodePage'
import SingleLocationPage from '@/pages/SingleLocationPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'LoginPage',
        component: LoginPage
      },
      {
        path: 'registration',
        name: 'RegistrationPage',
        component: RegistrationPage
      }
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'OverviewPage',
        component: OverviewPage
      },
      {
        path: 'characters',
        name: 'CharactersPage',
        component: CharactersPage,
      },
      {
        path: 'characters/:characterId',
        name: 'SingleCharacterPage',
        component: SingleCharacterPage,
      },
      {
        path: 'locations',
        name: 'LocationsPage',
        component: LocationsPage
      },
      {
        path: 'locations/:locationId',
        name: 'SingleLocationPage',
        component: SingleLocationPage,
      },
      {
        path: 'episodes',
        name: 'EpisodesPage',
        component: EpisodesPage
      },
      {
        path: 'episodes/:episodeId',
        name: 'SingleEpisodePage',
        component: SingleEpisodePage,
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
