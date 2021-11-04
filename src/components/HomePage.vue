<template>
  <div>
    <div class="first-header-wrapper">
      <div class="first-header-logo">copiii povestesc istoria</div>
      <div class="first-header-title-big">Misiune</div>
      <div class="first-header-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</div>
      <div class="first-header-button-wrapper">
        <div class="first-header-button main">
          <button v-on:click="gotoCourses">Spre cursuri</button>
        </div>
        <div class="first-header-button">
          <button v-on:click="gotoTeam">Cunoaște echipa</button>
        </div>
      </div>
    </div>

    <div class="first-header-courses-wrapper">
      <div class="first-header-courses">
        <div class="first-header-courses-title">Cursuri</div>
        <div>
          <select v-model="activeClass" @change="getVideosByClass()">
            <option v-for="option in options" v-bind:value="option.key" v-bind:key="option.key">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="first-content-bg">
      <div class="first-content-wrapper">
        <div class="first-content-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</div>
       <!-- TODO: here use for? -->
        <v-expansion-panels accordion multiple v-model="panelcontentvideos">
          <v-expansion-panel expand elevation-0>
            <div class="header-top-line"></div>
            <v-expansion-panel-header>
              Semestrul I
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="first-content-videos-container">
                  <div v-for="video in videos1" :key="video.id">

                    <div v-if="isMobile()">
                      <v-img :src="video.thumbnail" class="first-video-thumbnail-main-image"
                             max-height="190"
                             max-width="260">
                        <div class="play-image" v-on:click="gotoVideo">&#9658;</div>
                      </v-img>
                    </div>
                    <div v-else>
                      <v-img :src="video.thumbnail" class="first-video-thumbnail-main-image"
                             max-height="190"
                             max-width="320">
                        <div class="play-image" v-on:click="gotoVideo">&#9658;</div>
                      </v-img>
                    </div>

                    <div class="first-content-video-title">
                      {{ video.title }}
                    </div>
                  </div>
              </div>
            </v-expansion-panel-content>

          </v-expansion-panel>
          <v-expansion-panel elevation-0>
            <div class="header-top-line"></div>
            <v-expansion-panel-header>
              Semestrul II
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="first-content-videos-container">
                <div v-for="video in videos2" :key="video.id">

                  <div v-if="isMobile()">
                    <v-img :src="video.thumbnail" class="first-video-thumbnail-main-image"
                           max-height="190"
                           max-width="260">
                      <div class="play-image" v-on:click="gotoVideo">&#9658;</div>
                    </v-img>
                  </div>
                  <div v-else>
                    <v-img :src="video.thumbnail" class="first-video-thumbnail-main-image"
                           max-height="190"
                           max-width="320">
                      <div class="play-image" v-on:click="gotoVideo">&#9658;</div>
                    </v-img>
                  </div>

                  <div class="first-content-video-title">
                    {{ video.title }}
                  </div>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>

    <div class="first-newsletter-wrapper">
      <div class="first-newsletter-title">Newsletter</div>
      <div class="first-newsletter-description">Fii primul care află cînd adăugăm materiale noi.</div>
      <div class="first-newsletter-email-wrapper">
        <input v-model="newsletter_email"
               style="background: white;" placeholder="Adresă e-mail"/>
        <button v-on:click="gotoTeam">Înregistrează</button>
      </div>
    </div>


    <div class="first-footer-team">
      <div class="first-footer-team-title">Echipa</div>
    </div>
    <div class="first-footer-team-body">
      <div class="first-footer-team-content">

        <div class="first-footer-team-item" v-for="item in team" :key="item.id">
          <v-img :lazy-src="item.lazyUrl" :src="item.url"
              max-height="190"
              max-width="190">
          </v-img>
          <div class="first-footer-team-item-name">
            {{ item.name }}
          </div>
          <div class="first-footer-team-item-role">
            {{ item.role }}
          </div>
        </div>

      </div>
    </div>

    <div class="first-footer-partners">
      <div>AFCN</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      panelcontentvideos: [0], // keep only first panel expanded.
      activeClass: 1,
      newsletter_email: '',
      options: [
        { text: 'Clasa I', key: 1 },
        { text: 'Clasa II', key: 2 },
        { text: 'Clasa III', key: 3 }
      ],
      team: [
        {
          id: 1,
          name: 'Vasile',
          role: 'santehnic',
          lazyUrl: "https://picsum.photos/id/1062/10/6",
          url: "https://picsum.photos/id/1062/500"
        },{
          id: 2,
          name: 'Maria',
          role: 'activistă',
          lazyUrl: "https://picsum.photos/id/1084/10/6",
          url: "https://picsum.photos/id/1084/500"
        },{
          id: 3,
          name: 'Ionel',
          role: 'gigel',
          lazyUrl: "https://picsum.photos/id/200/10/6",
          url: "https://picsum.photos/id/200/500"
        },{
          id: 4,
          name: 'Vasilisa',
          role: 'direktor',
          lazyUrl: "https://picsum.photos/id/275/10/6",
          url: "https://picsum.photos/id/275/500"
        },
      ]
    }
  },
  computed: {
    videos1() {
      return this.$store.getters.videosSem1;
      // return [
      //   {
      //     id: 1,
      //     thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
      //     title: "video title 1"
      //   },
      //   {
      //     id: 2,
      //     thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
      //     title: "video title 2"
      //   },
      //   {
      //     id: 3,
      //     thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
      //     title: "video title 3"
      //   }
      // ]
    },
    videos2() {
      return this.$store.getters.videosSem2;
      // return [
      //   {
      //     id: 1,
      //     thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
      //     title: "video title 1"
      //   },
      //   {
      //     id: 2,
      //     thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
      //     title: "video title 2"
      //   },
      //   {
      //     id: 3,
      //     thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
      //     title: "video title 3"
      //   },
      //   {
      //     id: 4,
      //     thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
      //     title: "video title 3"
      //   },
      //   {
      //     id: 5,
      //     thumbnail: "http://localhost:8081/videothumbnails/mondrian.jpg",
      //     title: "video title 3"
      //   }
      // ]
    }
  },
  methods: {
    isMobile() {
      if(screen.width <= 760 ) {
        return true;
      }
      else {
        return false;
      }
    },
    gotoCourses: function() {
      this.$router.push('/courses');
    },
    gotoTeam: function() {
      this.$router.push('/team');
    },
    gotoVideo: function() {
      this.$router.push('/video');
    },
    getVideosByClass: function () {
      const vm = this;
      const payload = {
        classOf: this.activeClass
      }
      this.$store.dispatch('loadVideos', payload)
        .then(() => {
          console.log('found videos for class: ' + vm.activeClass);
          console.log(this.$store.getters.videoIds);
        });
    }
  },
  mounted: function() {
    console.log('Component has been created!');
    this.getVideosByClass();
  }
}
</script>

<style>
@media only screen and (max-width: 768px) {
  .first-header-wrapper {
    padding: 20px 20px 180px 20px;
  }
  .first-header-courses-wrapper {
    padding: 0px 20px 0px 20px;
  }
  .first-content-wrapper {
    margin: 0px 20px 0px 20px;
  }
  .first-footer-team {
    padding: 80px 20px 0px 20px;
  }
  .first-footer-team-content {
    margin: 0px 20px 20px 20px;
  }
  .first-newsletter-email-wrapper input {
    padding: 5px 10px;
  }
  .first-footer-team-content {
    justify-content: space-around;
  }
  .v-expansion-panel-content__wrap {
    padding: 0px !important;
  }
}
@media only screen and (min-width: 769px) {
  .first-header-wrapper {
    padding: 80px 80px 200px 80px;
  }
  .first-header-courses-wrapper {
    padding: 0px 80px 0px 80px;
  }
  .first-content-wrapper {
    margin: 0px 80px 0px 80px;
  }
  .first-footer-team {
    padding: 80px 80px 0px 80px;
  }
  .first-footer-team-content {
    margin: 0px 80px 80px 80px;
  }
  .first-newsletter-email-wrapper input {
    padding: 15px 20px;
  }
  .first-footer-team-content {
    justify-content: space-between;
  }
  .header-top-line {
    width: 300px;
  }
}

.first-header-wrapper {
  display:flex;
  background: #F2B4B4;
  background-image: url("../assets/mainbg.png");
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
}

.first-header-logo {
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 14px;
  text-transform: uppercase;
  width: 81px;
  margin-bottom: 80px;
  text-align: left;
}

.first-header-title-big {
  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  line-height: 86px;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  margin-bottom: 20px;
}

.first-header-description {
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: left;
  max-width: 620px;
  margin-bottom: 20px;
}

.first-header-button-wrapper {
  display:flex;
}

.first-header-button button {
  padding: 10px;
  background: none;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 10px 20px;
  color: #1B2CC1;
}

.main button {
  background-color: #1B2CC1;
  color: white;
}

.first-header-courses-wrapper {
  display:flex;
  flex-direction: row;
}

.first-header-courses {
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
  margin-top: -100px;
}

.first-header-courses-title {
  flex-basis: 100%;
}

.first-header-courses select {
  padding: 10px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 10px 20px;
  background: #1B2CC1 none;
  color: white;
}

.first-content-bg {
  background: #F4F9F9 none;
}

.first-content-wrapper {
  display:flex;
  flex-direction: column;
  border-bottom: 10px solid #CCF2F4;
  border-left: 10px solid #CCF2F4;
  border-right: 10px solid #CCF2F4;
}

.first-content-description {
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: left;
  max-width: 540px;
  margin: 40px 20px;
}

.first-newsletter-wrapper {
  background: #F4F9F9 none;
}

.first-newsletter-title {
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #1B2CC1;
  padding-top: 80px;
}

.first-newsletter-description {
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 40px;
  color: #8A8A8A;
}

.first-newsletter-email-wrapper {
  display: flex;
  justify-content: center;
}

.first-newsletter-email-wrapper button {
  padding: 10px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  padding: 10px 20px;
  background: #1B2CC1 none;
  color: white;
}

.first-newsletter-email-wrapper input {
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
}

.first-footer-team {
  display: flex;
  flex-direction: column;
  background: #F4F9F9 none;
}

.first-footer-team-title {
  border-top: 10px solid #1B2CC1;
  border-left: 10px solid #1B2CC1;
  border-right: 10px solid #1B2CC1;
  color: #1B2CC1;
  text-align: left;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  padding: 20px;
}

.first-footer-partners {
  background: #F4F9F9 none;
  padding: 80px;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #1B2CC1;
}

.first-footer-team-body {
  background: white none;
  display: flex;
  flex-direction: column;

}

.first-footer-team-content {
  display: flex;
  flex-direction: row;
  border-bottom: 10px solid #CCF2F4;
  border-left: 10px solid #CCF2F4;
  border-right: 10px solid #CCF2F4;
  text-align: left;
  flex-wrap: wrap;
}

.first-footer-team-item {
  margin: 40px 20px;
}

.first-video-thumbnail-main-image {
  outline: 10px solid #F4F9F9;
  outline-offset: -10px;
}

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

.first-footer-team-item-name {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.02em;
  text-align: left;
  margin: 10px 0px;
}

.first-footer-team-item-role {
  font-family: Matter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: -0.02em;
  text-align: left;
}

.v-expansion-panel-header__icon {
  margin-left: auto;
}

.theme--light.v-expansion-panels .v-expansion-panel {
  background-color: transparent !important;
}

.v-expansion-panel::before {
  box-shadow: none !important;
}

.v-expansion-panel:not(:first-child):after {
  border-top: 0px !important;
}

/* TODO: clarify overwriting vuetify styles */
.theme--light.v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
  color: #1B2CC1 !important;
}

.v-expansion-panel-header {
  padding: 20px !important;
  color: #1B2CC1 !important;
}

.header-top-line {
  margin: 0px 20px -10px 20px;
  height: 1px;
  background-color: #1B2CC1;
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
}
</style>