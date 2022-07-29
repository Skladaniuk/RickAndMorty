import Vue from 'vue'
import VueRouter from 'vue-router'
import OverviewPage from "@/pages/OverviewPage";

import CharactersPage from "@/pages/CharactersPage";
import LocationsPage from "@/pages/LocationsPage";
import EpisodesPage from "@/pages/EpisodesPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OverviewPage',
    component: OverviewPage
  },
  {
    path: '/characters',
    name: 'CharactersPage',
    component: CharactersPage
  },
  {
    path: '/locations',
    name: 'LocationsPage',
    component: LocationsPage
  },
  {
    path: '/episodes',
    name: 'EpisodesPage',
    component: EpisodesPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
