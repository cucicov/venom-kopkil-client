import Vue from 'vue'

const state = {
    activeClass: 5,
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
                       console.log("_id: " + data[i]._id);
                       console.log("fullVideoId: " + data[i].fullVideoId);
                       console.log("title: " + data[i].title);
                       console.log("thumbnail: " + data[i].thumbnail);
                       console.log("semester: " + data[i].semester);
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
        console.log('classOf:'+payload.classOf);

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
            console.log('sem1:'+currentVideo.semester);

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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}