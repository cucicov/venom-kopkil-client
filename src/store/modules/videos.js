import Vue from 'vue'

const state = {
    activeClass: 5,
    videoIds: [
        {id : 1},
        {id : 2}
    ]
}

const getters = {
    activeClass: state => state.activeClass,
    videoIds: state => state.videoIds
}

const actions = {
    async loadVideos({commit}, payload) {
        await Vue.axios.get('/video/class/' + payload.classOf)
            .then((resp) => {
               let data = resp.data;
                payload.videoIds = [];

               if (data && data.length > 0) {
                   for (let i = 0; i < data.length; i++) {
                       payload.videoIds.push({
                           id : data[i]._id,
                           name: data[i].name
                       })
                   }
               }
               commit('loadVideos', payload);
            });
        console.log('classOf:'+payload.classOf);

    }
}

const mutations = {
    loadVideos(state, payload) {
        state.videoIds = payload.videoIds;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}