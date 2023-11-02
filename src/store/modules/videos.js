import Vue from 'vue'

const state = {
    activeClass: -1,
    activeVideo: -1,
    activeVideoAuthors: [],
    videosSem1: [
        {
            id: 1,
            fullVideoId: 101,
            title: "Loading...",
            thumbnail: "../../loading.gif",
            semester: 1,
            class: 1
        }
    ],
    videosSem2: [
        {
            id: 2,
            fullVideoId: 101,
            title: "Loading...",
            thumbnail: "../../loading.gif",
            semester: 2,
            class: 1
        }
    ],
    videosSem3: [
        {
            id: 3,
            fullVideoId: 101,
            title: "Loading...",
            thumbnail: "../../loading.gif",
            semester: 2,
            class: 1
        }
    ],
    videosOther: [
        {
            id: 3,
            fullVideoId: 101,
            title: "Loading...",
            thumbnail: "../../loading.gif",
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
    videosSem3: state => state.videosSem3,
    videosOther: state => state.videosOther,
    allVideos: state => state.videosSem1.concat(state.videosSem2).concat(state.videosSem3).concat(state.videosOther),
    videoAuthors: state => state.activeVideoAuthors
}

const actions = {
    async loadVideos({commit}, payload) {
        await Vue.axios.get('/video/class/' + payload.classOf)
            .then((resp) => {
               let data = resp.data;
                payload.videos = [];

                // limit the number of returned videos if payload contains limit parameter
                if (payload.videosLimit !== undefined) { // load only a limited amount of videos
                    let i = 0;
                    while(payload.videos.length < payload.videosLimit
                        && data.length > i) {
                        if (data[i].fullVideoId != payload.currentVideoId) { // skip current video id.
                            payload.videos.push({
                                id : data[i]._id,
                                fullVideoId: data[i].fullVideoId,
                                title: data[i].title,
                                thumbnail: data[i].thumbnail,
                                semester: data[i].semester,
                                class: data[i].class,
                                order: data[i].order
                            });
                        }
                        i++;
                    }
                } else { // load all videos
                    if (data && data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            payload.videos.push({
                                id : data[i]._id,
                                fullVideoId: data[i].fullVideoId,
                                title: data[i].title,
                                thumbnail: data[i].thumbnail,
                                semester: data[i].semester,
                                class: data[i].class,
                                order: data[i].order
                            })
                        }
                    }
                }

                payload.videos.sort((a, b) => (a.order > b.order) ? 1 : -1);
               commit('loadVideos', payload);
            });
    },
    async loadFullVideoDetails({commit}, payload) {
        await Vue.axios.get('/video/' + payload.currentVideoId)
            .then((resp) => {
               let data = resp.data[0];

                payload.fullVideoId = data._id;
                payload.preTitle = data.pretitle;
                payload.title = data.title;
                payload.description = data.description;
                payload.materialUrl = data.materialUrl;
                payload.quizId = data.quizId;
                payload.fullVideoUrl = data.fullVideoUrl;

               commit('nothing', payload);
            });
        await Vue.axios.get('/video/' + payload.currentVideoId + '/authors')
            .then((resp) => {
                let data = resp.data;
                payload.authors = [];

                if (data && data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        payload.authors.push({
                            id : data[i].author._id,
                            name: data[i].author.name,
                            description: data[i].author.description,
                            image: data[i].author.image
                        })
                    }
                }

                commit('updateActiveVideoAuthors', payload.authors);
            });
    },
    async loadFullAuthorDetails({commit}, payload) {
        await Vue.axios.get('/author/' + payload.currentVideoId)
            .then((resp) => {
                let data = resp.data[0];

                payload.id = data._id;
                payload.name = data.name;
                payload.description = data.description;
                payload.fullDescription = data.fullDescription;
                payload.image = data.image;
                payload.fullVideoUrl = data.fullVideoUrl;

                commit('nothing', payload);
            });
    },
    async saveEmailNewsletter({commit}, email) {
        await Vue.axios.post('/emails/add/', {email: email})
            .then((resp) => {
                commit('nothing', resp);
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
        let sem3 = [];
        let other = [];

        // filter out videos for semester 1 and semester 2.
        for(let i=0; i<payload.videos.length; i++) {
            let currentVideo = payload.videos[i];
            if (currentVideo.semester == 1) {
                sem1.push(currentVideo);
            } else if (currentVideo.semester == 2) {
                sem2.push(currentVideo);
            } else if (currentVideo.semester == 3) {
                sem3.push(currentVideo);
            } else {
                other.push(currentVideo);
            }
        }

        state.videosSem1 = sem1;
        state.videosSem2 = sem2;
        state.videosSem3 = sem3;
        state.videosOther = other;
    },
    updateActiveClass(state, classId) {
        state.activeClass = classId;
    },
    updateActiveVideo(state, videoId) {
        state.activeVideo = videoId;
    },
    updateActiveVideoAuthors(state, authors) {
        console.log(authors);
        state.activeVideoAuthors = authors;
    },
    nothing(state, noth) {
        console.log(state + noth);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}