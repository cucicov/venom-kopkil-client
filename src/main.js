import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import vuetify from "@/plugins/vuetify";

//Vuex store
import store from './store'

Vue.config.productionTip = false

Vue.axios = Vue.prototype.$http = axios.create({
  // baseURL: 'https://venom-kopkil-server.herokuapp.com/api'
  baseURL: 'http://localhost:8081/api' // TODO: take from parameter?
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
