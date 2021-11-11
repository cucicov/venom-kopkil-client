<template>
  <div class="video-wrapper">
    <div class="video-header-wrapper">
      <div class="first-header-logo" v-on:click="gotoMainPage()">copiii explică istoria</div>
    </div>

    <div class="first-header-courses-wrapper">
      <div class="video-header-courses">
        <div class="video-header-courses-content">
          <div class="video-header-courses-pretitle">
            {{preTitle}}
          </div>
          <div class="video-header-courses-title">
            {{title}}
          </div>
        </div>
        <div>
<!--          ...-->
        </div>
      </div>
    </div>

    <div class="first-content-bg">
      <div class="first-content-wrapper">
        <div class="video-content-main" v-if="fullVideoUrl !== undefined">
          <vue-core-video-player  width="100%" :src="fullVideoUrl"></vue-core-video-player>
        </div>

        <div class="video-content-description-wrapper">
          <div class="video-content-description-left">
            <div class="video-content-description-text">
              <div class="video-content-description-text-title">
                DESCRIERE CURS
              </div>
              <div class="video-content-description-text-description">
                {{description}}
              </div>
            </div>
            <div class="video-content-description-buttons">
              <div class="first-header-button-wrapper">
                <div class="first-header-button main">
                  <button @click="onClick()">Descarcă materiale</button>
                </div>
                <div class="first-header-button">
                  <button>Testează-ți cunoștințele</button>
                </div>
              </div>
            </div>
          </div>
          <div class="video-content-description-right">
            <div class="video-content-description-text-title">
              POVESTIT DE
            </div>
            <div class="video-content-description-text-student-wrapper" v-on:click="gotoAuthor(authorId)">
              <div class="video-content-description-text-student-text">
                <b>{{authorName}}</b><br/>
                {{authorDescription}}
              </div>
              <div class="video-content-description-text-student-image">
                <v-img :src="authorImage"
                       max-height="100"
                       max-width="100">
                </v-img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="first-footer-team" v-if="hasRecommendations">
      <div class="first-footer-team-title">Recomandări</div>
    </div>
    <div class="first-footer-team-body" v-if="hasRecommendations">
      <div class="first-footer-team-content">

        <div class="first-footer-team-item">
          <VideoListPreview :is-mobile="isMobile()" :videos="previewVideos"/>
        </div>

      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Footer from './Footer'
import VideoListPreview from "@/components/VideoListPreview";
import axios from "axios";

export default {
  name: 'Video',
  data() {
    return {
      hasRecommendations: true,
      preTitle: "pret",
      title: "title",
      description: "desc",
      authorName: "auth",
      authorId: "id",
      authorDescription: "description",
      authorImage: "https://picsum.photos/id/200/500",
      materialUrl: "url",
      quizId: "qid",
      fullVideoUrl: undefined
    }
  },
  components: {
    Footer,
    VideoListPreview,
  },
  computed: {
    previewVideos() {
      return this.$store.getters.allVideos;
    }
  },
  methods: {
    onClick() {
      if (this.materialUrl !== "") {
        axios({
          url: this.materialUrl,
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fURL = document.createElement('a');

          fURL.href = fileURL;
          fURL.setAttribute('download', this.title.replace(/\s/g, '-') + ".rar");
          document.body.appendChild(fURL);

          fURL.click();
        });
      }
    },

    getRecommendedVideos: function () {
      let vm = this;
      const payload = {
        classOf: this.$store.getters.activeClass,
        videosLimit: 3, // limit recommended videos to 3
        currentVideoId: this.$store.getters.activeVideo,
      }
      this.$store.dispatch('loadVideos', payload)
          .then(() => {
            console.log(payload.videos.length + ' recommended videos found videos for class: ' + this.$store.getters.activeClass);
            if (payload.videos.length == 0) {
              vm.hasRecommendations = false;
            }
          });
    },
    getFullVideoDetails: function () {
      let vm = this;
      const payload = {
        classOf: this.$store.getters.activeClass,
        currentVideoId: this.$store.getters.activeVideo,
      }

      this.$store.dispatch('loadFullVideoDetails', payload)
          .then(() => {
              vm.preTitle = payload.preTitle;
              vm.title = payload.title;
              vm.description = payload.description;
              vm.authorName = payload.author.name,
              vm.authorId = payload.author._id,
              vm.authorDescription = payload.author.description,
              vm.authorImage = payload.author.image,
              vm.materialUrl = payload.materialUrl;
              vm.quizId = payload.quizId;
              vm.fullVideoUrl = payload.fullVideoUrl;

              // console.log(">>>>>>" + payload.fullVideoUrl);
          });
    },
    updateCurrentVideoParams() {
      this.$store.dispatch('setActiveVideo',
      {
        activeClass: this.$route.params.class,
        activeVideoId: this.$route.params.id
      });
    },
    isMobile() { //TODO: move to Preview component?
      if(screen.width <= 760 ) {
        return true;
      }
      else {
        return false;
      }
    },
    gotoAuthor: function (authorId) {
      console.log(authorId);
      // this.$router.push({path: `/author/${authorId}`});
      // this.$router.go();
    },
    gotoMainPage: function () {
      this.$router.push({path: `/`});
      // this.$router.go();
    },
  },
  watch: {
    '$route.params.id' : function() {
      this.updateCurrentVideoParams();
      this.getRecommendedVideos();
      this.getFullVideoDetails();
    }
  },
  mounted: function() {
    console.log("Video component mounted.");
    this.updateCurrentVideoParams();
    this.getRecommendedVideos();
    this.getFullVideoDetails();
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .video-header-wrapper {
    padding: 20px 20px 180px 20px;
  }
  .first-footer-team-content {
    justify-content: space-around;
  }
}
@media only screen and (min-width: 769px) {
  .video-header-wrapper {
    padding: 80px 80px 200px 80px;
  }
  .first-footer-team-content {
    justify-content: space-between;
  }
}

.video-header-wrapper {
  display: flex;
  background: #D4D7EE;
  flex-direction: column;
  background-size: cover;
}

.video-header-courses-content {
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
}

.video-header-courses-pretitle {
  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;
}

.video-header-courses {
  text-align: left;
  display:flex;
  border-top: 10px solid #1B2CC1;
  border-left: 10px solid #1B2CC1;
  border-right: 10px solid #1B2CC1;
  color: #1B2CC1;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  padding: 20px;
  flex-basis: 100%;
  margin-top: -120px;
}

.video-content-description-wrapper{
  margin: 40px;
  display: flex;
  flex-direction: row;
  /*flex-wrap: wrap;*/
}

.video-content-description-right{
  border-left: 1px solid #D4D7EE;
  padding-left: 40px;
  flex-grow: 1;
}

.video-content-description-text-title {
  color: #1B2CC1;
  font-size: 14px;
  line-height: 25px;
  text-align: left;
}

.video-content-description-left {
  flex-grow: 1;
  max-width: 70%;
}

.video-content-description-text-description {
  text-align: left;
  margin-top: 10px;
  margin-right: 40px;
  line-height: 25px;
}

.video-content-description-text-student-wrapper {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

.video-content-description-text-student-text {
  text-align: left;
  line-height: 25px;
  flex-basis: 100%;
}

.video-content-description-text-student-image {
  text-align: left;
  line-height: 25px;
  margin-left: 20px;
}

.video-content-description-buttons {
  margin-top: 40px;
}

.first-footer-team-item {
  flex-basis: 100%;
}

.video-wrapper {
  display:flex;
  flex-direction: column;
  height: 100%;
}

.video-content-main {
  margin: 40px;
}

/*.video-header-courses-title {*/
/*  font-size: 18px;*/
/*  line-height: 21px;*/
/*}*/
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*margin-top: 60px;*/
}
</style>
