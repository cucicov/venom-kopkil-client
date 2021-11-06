import Vue from 'vue'

const state = {
    activeClass: -1,
    activeVideo: -1,
    videosSem1: [
        {
            id: 1,
            fullVideoId: 101,
            title: "video title 1",
            thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
            semester: 1,
            class: 1
        }
    ],
    videosSem2: [
        {
            id: 1,
            fullVideoId: 101,
            title: "video title 1",
            thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
            semester: 2,
            class: 1
        }
    ],
    videosOther: [
        {
            id: 1,
            fullVideoId: 101,
            title: "video title 1",
            thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
            semester: -1,
            class: 1
        }
    ]
}

const getters = {
    activeClass: state => state.activeClass,
    activeVideo: state => state.activeVideo,
    videosSem1: state => state.videosSem1,
    videosSem2: state => state.videosSem2,
    videosOther: state => state.videosOther
}

const actions = {
    async loadVideos({commit}, payload) {
        await Vue.axios.get('/video/class/' + payload.classOf)
            .then((resp) => {
               let data = resp.data;
                payload.videos = [];

               if (data && data.length > 0) {
                   for (let i = 0; i < data.length; i++) {
                       payload.videos.push({
                           id : data[i]._id,
                           fullVideoId: data[i].fullvideoid,
                           title: data[i].title,
                           thumbnail: data[i].thumbnail,
                           semester: data[i].semester
                       })
                   }
               }
               commit('loadVideos', payload);
            });
    },
    setActiveVideo({commit}, payload) {
        commit('updateActiveClass', payload.activeClass);
        commit('updateActiveVideo', payload.activeVideoId);
    }
}

const mutations = {
    loadVideos(state, payload) {
        let sem1 = [];
        let sem2 = [];
        let other = [];

        // filter out videos for semester 1 and semester 2.
        for(let i=0; i<payload.videos.length; i++) {
            let currentVideo = payload.videos[i];
            if (currentVideo.semester == 1) {
                sem1.push(currentVideo);
            } else if (currentVideo.semester == 2) {
                sem2.push(currentVideo);
            } else {
                other.push(currentVideo);
            }
        }

        state.videosSem1 = sem1;
        state.videosSem2 = sem2;
        state.videosOther = other;
    },
    updateActiveClass(state, classId) {
        state.activeClass = classId;
    },
    updateActiveVideo(state, videoId) {
        state.activeVideo = videoId;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}