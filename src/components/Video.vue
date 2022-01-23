<template>
  <div class="video-wrapper">
    <div class="pre-video-header-wrapper">
      <div class="video-header-wrapper">
        <div class="first-header-logo" v-on:click="gotoMainPage()">
          <v-img src="./logo.svg">
          </v-img>
        </div>
      </div>
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
          <vue-core-video-player  width="100%"
                                  :src="fullVideoUrl"
                                  :autoplay="false"
                                  @play="playFunc"
                                  @pause="pauseFunc"></vue-core-video-player>
        </div>

        <div class="video-content-description-wrapper">
          <div class="video-content-description-left">
            <div class="video-content-description-text" v-if="description !== undefined">
              <div class="video-content-description-text-title">
                DESCRIERE CURS
              </div>
              <div class="video-content-description-text-description">
                {{description}}
              </div>
            </div>
          </div>
          <div class="video-content-description-right">
            <div class="video-content-description-buttons">
              <div class="first-header-button-wrapper">
                <div class="first-header-button main" v-if="materialUrl !== undefined">
                  <button @click="downloadMateriale(materialUrl)">Descarcă materiale</button>
                </div>
                <div class="first-header-button" v-if="quizId !== undefined">
                  <button @click="downloadMateriale(quizId)">Testează-ți cunoștințele</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="video-content-description-wrapper">
          <div class="video-content-description-left-2">
            <div class="video-content-description-text-title-2">
              POVESTIT DE
            </div>
            <div class="video-content-description-student-box-wrapper">
              <div v-for="author in authors" :key="author.id" class="video-content-description-student-box">
                <div class="video-content-description-text-student-wrapper" v-on:click="gotoAuthor(author.id)">
                  <div class="video-content-description-text-student-image">
                    <v-img :src="author.image"
                           height="100"
                           width="100">
                    </v-img>
                  </div>
                  <div class="video-content-description-text-student-text">
                    <b>{{author.name}}</b><br/>
                    {{author.description}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


    <div class="first-footer-team" v-if="hasRecommendations">
      <div class="first-footer-team-title">
        <div>Recomandări</div>
        <div></div>
      </div>
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
import $ from 'jquery';

export default {
  name: 'Video',
  data() {
    return {
      hasRecommendations: true,
      preTitle: "pret",
      title: "title",
      description: undefined,
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
    },
    authors() {
      return this.$store.getters.videoAuthors;
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    downloadMateriale(source) {
      if (source !== "") {
        console.log("download " + source);
        axios({
          url: source,
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
        videosLimit: 6, // limit recommended videos to 3
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
              if (payload.description.length == 0) {
                vm.description = undefined;
              } else {
                vm.description = payload.description;
              }
              if (payload.materialUrl.length == 0) {
                vm.materialUrl = undefined;
              } else {
                vm.materialUrl = payload.materialUrl;
              }

              if (payload.quizId.length == 0) {
                vm.quizId = undefined;
              } else {
                vm.quizId = payload.quizId;
              }
              if (payload.fullVideoUrl.length == 0) {
                vm.fullVideoUrl = undefined;
              } else {
                vm.fullVideoUrl = payload.fullVideoUrl;
              }
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
      // console.log(authorId);
      this.scrollToTop();
      this.$router.push({path: `/author/${authorId}`});
      // this.$router.go();
    },
    gotoMainPage: function () {
      this.$router.push({path: `/`});
      // this.$router.go();
    },
    playFunc: function() {
      // BUGFIX: hide play button when starting playing to avoid it showing in full screen.
      if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $( ".play-pause-layer" ).hide();
      }
    },
    pauseFunc: function() {
      if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $( ".play-pause-layer" ).show();
      }
    }
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
}
@media only screen and (min-width: 769px) {

}



@media only screen and (max-width: 768px) {
  .video-header-wrapper {
    padding: 20px 20px 180px 20px;
  }
  .video-content-description-left {
    max-width: 100%;
  }
  .video-content-description-right{
    padding-left: 0px;
    flex-grow: 1;
  }
  .video-content-main {
    /*margin-bottom: 40px;*/
  }
  .first-content-videos-container {
    justify-content: center;
  }
  .first-content-videos-container div {
    /*margin: 0;*/
  }
}

@media only screen and (min-width: 769px) {
  .video-header-wrapper {
    padding: 80px 0px 200px 0px;
    width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }
  .video-content-description-left {
    flex-grow: 3;
    max-width: 70%;
  }
  .video-content-description-right{
    padding-left: 40px;
    flex-grow: 1;
  }
  .video-content-main {
    margin: 40px;
  }
  .pre-video-header-wrapper{
    margin-left: 80px;
    margin-right: 80px;
  }
  .first-content-videos-container {
    height: 270px;
    overflow: hidden;
  }
  .first-content-videos-container div {
    /*margin-right: 40px;*/
  }
}
.first-footer-team-content {
  justify-content: flex-start;
  padding: 0px;
}
.first-header-courses-wrapper {
  background: #D4D7EE;
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
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.video-content-description-wrapper{
  margin: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.first-header-button-wrapper {
  display:flex;
  flex-direction: column;
}

.video-content-description-text-title {
  color: #1B2CC1;
  font-size: 14px;
  line-height: 25px;
  text-align: left;
}

.video-content-description-text-title-2 {
  color: #1B2CC1;
  font-size: 14px;
  line-height: 25px;
  text-align: left;
  border-top: 1px solid #D4D7EE;
  padding-top: 40px;
}

.video-content-description-left-2 {
  flex-grow: 1;
}

.video-content-description-text-description {
  text-align: left;
  margin-top: 10px;
  /*margin-right: 40px;*/
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
  margin-right: 20px;
}

.video-content-description-buttons {
  margin-top: 40px;
}

.first-footer-team-item {
  flex-basis: 100%;
  margin: 20px;
}

.video-wrapper {
  display:flex;
  flex-direction: column;
  height: 100%;
  background: #D4D7EE;
}

.video-content-description-student-box-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.video-content-description-student-box {
  width: 300px;
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
