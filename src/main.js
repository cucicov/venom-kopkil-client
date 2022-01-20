import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import vuetify from "@/plugins/vuetify";
import VueAnalytics from 'vue-analytics';

//Vuex store
import store from './store'

Vue.config.productionTip = false

Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'https://venom-kopkil-server.herokuapp.com/api'
  // baseURL: 'http://localhost:8081/api' // TODO: take from parameter?
})

Vue.use(VueAnalytics, {
  id: 'UA-217710004-1',
  router
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
