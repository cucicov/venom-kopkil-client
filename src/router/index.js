import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import OldHomePage from '@/components/OldHomePage.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: HomePage },
        { path: '/gg', component: OldHomePage },
        { path: '*', redirect: '/' },
    ]
})
