import Vue from 'vue';
import Vuex from 'vuex'
import VueCoreVideoPlayer from 'vue-core-video-player';

import videos from './modules/videos'

Vue.use(Vuex)
Vue.use(VueCoreVideoPlayer)

export default new Vuex.Store({
    modules: {videos}
})