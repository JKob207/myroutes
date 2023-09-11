// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import db from './services/db_rest.js'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false
Vue.prototype.$db = db;
Vue.prototype.$user = {};

window.Vue = Vue;

window.vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
