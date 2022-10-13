import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const AuthLayout = () => import(/* webpackChunkName: "auth-layout" */ '@/layouts/AuthLayout')
const LoginPage = () => import(/* webpackChunkName: "login-page" */ '@/pages/auth/LoginPage')
const RegistrationPage = () => import(/* webpackChunkName: "registration-page" */ '@/pages/auth/RegistrationPage')

const MainLayout = () => import(/* webpackChunkName: "main-layout" */ '@/layouts/MainLayout')
const OverviewPage = () => import(/* webpackChunkName: "overview-page" */ '@/pages/OverviewPage')
const CharactersPage = () => import(/* webpackChunkName: "characters-page" */ '@/pages/CharactersPage')
const LocationsPage = () => import(/* webpackChunkName: "locations-page" */ '@/pages/LocationsPage')
const EpisodesPage = () => import(/* webpackChunkName: "episodes-page" */ '@/pages/EpisodesPage')
const SingleCharacterPage = () => import(/* webpackChunkName: "single-character-page" */ '@/pages/SingleCharacterPage')
const SingleEpisodePage = () => import(/* webpackChunkName: "single-episode-page" */ '@/pages/SingleEpisodePage')
const SingleLocationPage = () => import(/* webpackChunkName: "single-location-page" */ '@/pages/SingleLocationPage')
const ProfilePage = () => import(/* webpackChunkName: "profile-page" */ '@/pages/ProfilePage')

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'LoginPage',
        component: LoginPage,
        meta: {
          hideForAuth: true
        }
      },
      {
        path: 'registration',
        name: 'RegistrationPage',
        component: RegistrationPage,
        meta: {
          hideForAuth: true
        }
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
        meta: {
          authRequired: true
        }
      },
      {
        path: 'characters/:characterId',
        name: 'SingleCharacterPage',
        component: SingleCharacterPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'locations',
        name: 'LocationsPage',
        component: LocationsPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'locations/:locationId',
        name: 'SingleLocationPage',
        component: SingleLocationPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'episodes',
        name: 'EpisodesPage',
        component: EpisodesPage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'episodes/:episodeId',
        name: 'SingleEpisodePage',
        component: SingleEpisodePage,
        meta: {
          authRequired: true
        }
      },
      {
        path: 'profile',
        name: 'ProfilePage',
        component: ProfilePage,
        meta: {
          authRequired: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

  // If auth isn't required for the route, just continue.
  if (!authRequired) next()

  // If auth is required and the user is NOT currently logged in...
  if (!store.getters['authStore/isLogged'] && authRequired) {
    next({ name: 'LoginPage' })
  }

  // If the user is currently logged in
  const hideForAuth = routeTo.matched.some((route) => route.meta.hideForAuth)
  if (store.getters['authStore/isLogged'] && hideForAuth) {
    next({ name: 'OverviewPage' })
  }

  next()
})

export default router
