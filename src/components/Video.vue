<template>
  <div>
    <div class="video-header-wrapper">
      <div class="first-header-logo">copiii povestesc istoria</div>
    </div>

    <div class="first-header-courses-wrapper">
      <div class="video-header-courses">
        <div class="video-header-courses-content">
          <div class="video-header-courses-pretitle">
            PREISTORIE
          </div>
          <div class="video-header-courses-title">
            Primii Oameni
          </div>
        </div>
        <div>
          ...
        </div>
      </div>
    </div>

    <div class="first-content-bg">
      <div class="first-content-wrapper">
        <div class="first-content-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</div>

        <div class="video-content-description-wrapper">
          <div class="video-content-description-left">
            <div class="video-content-description-text">
              <div class="video-content-description-text-title">
                DESCRIERE CURS
              </div>
              <div class="video-content-description-text-description">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </div>
            </div>
            <div class="video-content-description-buttons">
              <div class="first-header-button-wrapper">
                <div class="first-header-button main">
                  <button v-on:click="gotoCourses">Descarcă materiale</button>
                </div>
                <div class="first-header-button">
                  <button v-on:click="gotoTeam">Testează-ți cunoștințele</button>
                </div>
              </div>
            </div>
          </div>
          <div class="video-content-description-right">
            <div class="video-content-description-text-title">
              POVESTIT DE
            </div>
            <div class="video-content-description-text-student-wrapper">
              <div class="video-content-description-text-student-text">
                <b>Anca Dimulescu</b><br/>
                Elevă clasa a V-a Liceul Gimnazial Iancu
              </div>
              <div class="video-content-description-text-student-image">
                <v-img src="https://picsum.photos/id/200/500"
                       max-height="100"
                       max-width="100">
                </v-img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="first-footer-team">
      <div class="first-footer-team-title">Recomandări</div>
    </div>
    <div class="first-footer-team-body">
      <div class="first-footer-team-content">

        <div class="first-footer-team-item">
          asdasda
        </div>

      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Footer from './Footer'

export default {
  name: 'Video',
  components: {
    Footer
  },
  computed: {
    test() {
      return this.$store.getters.activeVideoId;
    }
  },
  mounted: function() {
    this.$store.dispatch('setActiveVideo',
        {
          activeClass: this.$route.params.class,
          activeVideoId: this.$route.params.id
        });
  }
}
</script>

<style>
@media only screen and (max-width: 768px) {
  .video-header-wrapper {
    padding: 20px 20px 180px 20px;
  }
}
@media only screen and (min-width: 769px) {
  .video-header-wrapper {
    padding: 80px 80px 200px 80px;
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
  max-width: 60%;
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
}

.video-content-description-text-student-image {
  text-align: left;
  line-height: 25px;
  margin-left: 20px;
}

.video-content-description-buttons {
  margin-top: 40px;
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
