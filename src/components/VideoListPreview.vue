<template>
  <div class="first-content-videos-container">
    <div v-for="video in videos" :key="video.id">
      <div v-if="isMobile">
        <v-img :src="video.thumbnail" class="first-video-thumbnail-main-image"
               max-height="190"
               max-width="calc(100vw - 20px)">
          <div class="play-image" v-on:click="gotoVideo(video.fullVideoId, video.class)">&#9658;</div>
        </v-img>
      </div>
      <div v-else>
        <v-img :src="video.thumbnail" class="first-video-thumbnail-main-image"
               max-height="190"
               max-width="320">
          <div class="play-image" v-on:click="gotoVideo(video.fullVideoId, video.class)">&#9658;</div>
        </v-img>
      </div>

      <div class="first-content-video-title">
        {{ video.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoListPreview',
  props: {
    isMobile: Boolean,
    videos: Array
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    gotoVideo: function (videoId, activeClass) {
      this.scrollToTop();
      this.$router.push({path: `/video/${activeClass}/${videoId}`});
      // this.$router.go();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.play-image {
  height: 54px;
  width: 54px;
  background: #1B2CC1;
  position: relative;
  margin-left: auto;
  margin-top: 136px;
  display:flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color:white;
  border: 2px solid #F4F9F9;
}
.first-content-videos-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.first-content-video-title {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: left;
  margin: 20px 0px 50px 10px;
  max-width: 300px;
}
</style>
