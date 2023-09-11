<template>
  <div id="app">
  <!-- si no autenticado -->
    <Login v-if="!user.token"></Login>
  <!-- else -->
    <md-app v-else>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="showDrawer = true">
            <md-icon>menu</md-icon>
          </md-button>
        </div>
        <span class="md-title">My routes</span>
        <div class="md-toolbar-section-end">
          <div>
            <router-link to="/profile">
              <md-avatar>
                <img :src="user.img" />
              </md-avatar>
            </router-link>
            <md-button class="md-icon-button" @click="logout">
              <md-icon>logout</md-icon>
            </md-button>
          </div>
        </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="showDrawer" :md-swipeable="true">
        <md-list>
          <md-list-item to="/home">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>
          <md-list-item to="/routes">
            <md-icon>list</md-icon>
            <span class="md-list-item-text">Routes</span>
          </md-list-item>
          <md-list-item to="/map">
            <md-icon>map</md-icon>
            <span class="md-list-item-text">Map</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view :user="user"></router-view>
        <md-bottom-bar md-sync-route>
          <md-bottom-bar-item to="/home" md-label="Home" md-icon="home"></md-bottom-bar-item>
          <md-bottom-bar-item to="/routes" md-label="Routes" md-icon="list"></md-bottom-bar-item>
          <md-bottom-bar-item to="/map" md-label="Map" md-icon="map"></md-bottom-bar-item>
        </md-bottom-bar>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: { Login },
  data() {
    return {
      user: this.$user,
      showDrawer: false
    }
  },
  methods: {
    loginUser() {
      this.$db.login("pepe", "pepe", (err, token, user) => {
        if(err) console.log("Error: " + err.stack);
        else console.log("Success: " + token);
      });
    },
    logout()
    {
      console.log("Logout");
      this.user.token = null;
    }
  }
}
</script>

<style>
.md-app
{
  height: 100vh;
}

.md-bottom-bar
{
  position: fixed;
  bottom: 0;
  left: 0;
}

.md-bottom-bar>.md-ripple
{
  justify-content: center;
}

main
{
  overflow-y: hidden !important;
}
</style>
