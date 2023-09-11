import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import Routes from '../components/Routes.vue'
import RouteDetails from '../components/RouteDetails.vue'
import Map from '../components/Map.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/routes',
      name: 'Routes',
      component: Routes
    },
    {
      path: '/routes/:id',
      name: 'RouteDetails',
      component: RouteDetails
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/',
      redirect: Home
    },
    {
      path: '*',
      redirect: Home
    }
  ]
})
