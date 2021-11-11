import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import Video from '@/components/Video.vue'
import Author from '@/components/Author.vue'
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
            path: '/video/:class/:id',
            component: Video
        },
        {
            path: '/author/:id',
            component: Author
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
})
