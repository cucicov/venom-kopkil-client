import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import OldHomePage from '@/components/OldHomePage.vue'
import VueMeta from 'vue-meta'

Vue.use(Router)
Vue.use(VueMeta , {
    attribute: 'metaa'
})

export default new Router({
    routes: [
        {
            path: '/',
            component: HomePage,
        },
        {
            path: '/gg',
            component: OldHomePage
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
})
