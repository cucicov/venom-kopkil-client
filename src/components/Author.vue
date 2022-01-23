<template>
  <div class="video-wrapper">
    <div class="pre-video-header-wrapper">
      <div class="video-header-wrapper">
        <div class="first-header-logo" v-on:click="gotoMainPage()">
          <v-img src="./logo.svg">
          </v-img>
        </div> <!-- TODO: extract header in component?-->
      </div>
    </div>

    <div class="first-header-courses-wrapper">
      <div class="video-header-courses">
        <div class="video-header-courses-content">
          <div class="video-header-courses-pretitle">
            PROFIL DE POVESTITOR
          </div>
          <div class="video-header-courses-title">
            {{name}}
          </div>
        </div>
        <div>
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

        <div v-if="description" class="video-content-description-wrapper-full">
          <div class="video-content-description-left">
            <div class="video-content-description-text">
              <div class="video-content-description-text-description">
                {{description}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Footer from './Footer'
import $ from "jquery";

export default {
  name: 'Video',
  data() {
    return {
      preTitle: "pret",
      name: "aaa",
      description: "desc",
      fullVideoUrl: undefined
    }
  },
  components: {
    Footer
  },
  methods: {
    getFullVideoDetails: function () {
      let vm = this;
      const payload = {
        currentVideoId: this.$store.getters.activeVideo,
      }

      this.$store.dispatch('loadFullAuthorDetails', payload)
          .then(() => {
              vm.name = payload.name;
              vm.description = payload.fullDescription;
              vm.fullVideoUrl = payload.fullVideoUrl;
          });
    },
    updateCurrentVideoParams() {
      this.$store.dispatch('setActiveVideo',
      {
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
      this.getFullVideoDetails();
    }
  },
  mounted: function() {
    console.log("Author component mounted.");
    this.updateCurrentVideoParams();
    this.getFullVideoDetails();
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .video-header-wrapper {
    padding: 20px 20px 180px 20px;
  }
  .video-content-main {
    /*margin-bottom: 40px;*/
  }
}
@media only screen and (min-width: 769px) {
  .video-header-wrapper {
    padding: 80px 0px 200px 0px;
    width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }
  .video-content-main {
    margin: 40px;
  }
  .pre-video-header-wrapper{
    margin-left: 80px;
    margin-right: 80px;
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
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.video-content-description-wrapper-full{
  margin: 40px;
  display: flex;
  flex-direction: row;
  /*flex-wrap: wrap;*/
}

.video-content-description-text-title {
  color: #1B2CC1;
  font-size: 14px;
  line-height: 25px;
  text-align: left;
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
}

.video-content-description-text-student-text {
  text-align: left;
  line-height: 25px;
  flex-basis: 100%;
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
  background: #D4D7EE;
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
