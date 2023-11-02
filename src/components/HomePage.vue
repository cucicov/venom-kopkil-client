<template>
  <div>
    <div class="first-header-wrapper">
      <div class="first-header-wrapper-fixed-size">
        <div class="first-header-logo">
          <v-img src="./logo.svg">
          </v-img>
        </div>
        <div class="first-header-title-big">Misiune</div>
        <div class="first-header-description">
          Credem că istoria poate fi mult mai captivantă pentru copii atunci când e povestită tot de copii. Așa că i-am scos pe elevii Școlii Gimnaziale nr.1 din Sohatu, jud Călărași la joacă și i-am rugat să ne explice câteva lucruri interesante despre începuturile istoriei în Orientul Antic și despre frumusețea și grandoarea civilizațiilor grecești și romane.
        </div>
        <div class="first-header-button-wrapper">
          <div class="first-header-button main">
            <button v-on:click="scrollTo('coursesRef')">Spre cursuri</button>
          </div>
          <div class="first-header-button">
            <button v-on:click="scrollTo('teamRef')">Cunoaște echipa</button>
          </div>
        </div>
      </div>
    </div>

    <div class="first-header-courses-wrapper">
      <div class="first-header-courses">
        <div class="first-header-courses-title" ref="coursesRef">Cursuri</div>
<!--        <div style="margin-top: -5px;"> &lt;!&ndash;TODO: this is a workaround. find a better way to center vertically the button &ndash;&gt;-->
<!--          <select v-model="activeClass" @change="getVideosByClass()">-->
<!--            <option v-for="option in options" v-bind:value="option.key" v-bind:key="option.key">-->
<!--              {{ option.text }}-->
<!--            </option>-->
<!--          </select>-->
<!--        </div>-->
      </div>
    </div>

    <div class="first-content-bg">
      <div class="first-content-wrapper">
        <div class="first-content-description">
<!--          În prima serie de lecții video, copiii din Sohatu ne povestesc despre primii oameni, despre viața-->
<!--          cotidiană în Orientul Antic, despre meșteșugurile și credințele practicate atunci, despre felul în care-->
<!--          oamenii se organizau în grupuri sociale, despre construcțiile lor impresionante și despre legile-->
<!--          după care se guvernau. Care este cel mai vechi schelet uman descoperit de cercetători? Cine a-->
<!--          fost Ötzi? Ce este Turnul Babel? Ce sunt pagodele? Ce animale mumificau egiptenii? Cum au-->
<!--          evoluat oamenii în neolitic? Să începem cu începutul.-->
          În cea de-a doua serie de lecții video, elevii din Sohatu ne povestesc câteva lucruri despre Antichitatea greacă și romană, despre viața cotidiană din polisul grec, despre ocupațiile și meșteșugurile vechilor greci, despre apetența lor pentru războaie dar și pentru artă și literatură, despre cel mai important eveniment socio-cultural din Grecia Antică, despre legendele grecești și adevărul din spatele lor și despre fondarea Romei, răspândirea marii civilizații romane în interiorul coloniilor, zei și cum au fost înlocuiți ei de către creștinism. Să începem.
        </div>
        <v-expansion-panels accordion multiple v-model="panelcontentvideos">
          <v-expansion-panel expand elevation-0>
            <div class="header-top-line"></div>
            <v-expansion-panel-header>
              Sezonul I
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <VideoListPreview :is-mobile="isMobile()" :videos="videos1"/>
            </v-expansion-panel-content>

          </v-expansion-panel>
          <v-expansion-panel expand elevation-0>
            <div class="header-top-line"></div>
            <v-expansion-panel-header>
              Sezonul II
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <VideoListPreview :is-mobile="isMobile()" :videos="videos2"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel expand elevation-0>
            <div class="header-top-line"></div>
            <v-expansion-panel-header>
              Sezonul III
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <VideoListPreview :is-mobile="isMobile()" :videos="videos3"/>
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
        <button v-on:click="saveEmailNewsletter(newsletter_email)" @click="snackbar = true">Înregistrează</button>
      </div>
    </div>

    <div class="first-footer-team" ref="teamRef">
      <div class="first-footer-team-title">
        <div>Echipa</div>
        <div></div>
      </div>

    </div>
    <div class="first-footer-team-body">
      <div class="first-footer-team-content">

        <div class="first-footer-team-item" v-for="item in team" :key="item.id">
          <v-img :lazy-src="item.lazyUrl" :src="item.url"
              height="200px"
              width="200px">
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

    <Footer/>


    <!-- dialogs -->
    <v-snackbar v-model="snackbar" >
      {{ textNewsletterOk }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Închide
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import Footer from './Footer';
import VideoListPreview from './VideoListPreview';

export default {
  name: 'HomePage',
  components: {
    Footer,
    VideoListPreview
  },
  data() {
    return {
      panelcontentvideos: [1], // keep only first panel expanded.
      activeClass: 1,
      newsletter_email: '',
      snackbar: false,
      textNewsletterOk: `Adresa de email a fost înregistrată.`,
      options: [
        { text: 'Clasa a V-a', key: 1 },
      ],
      team: [
        {
          id: 1,
          name: 'Alina Constantinescu',
          role: 'Manager proiect',
          url: "./team/Alina_Constantinescu_manager_proiect.jpg"
        },{
          id: 2,
          name: 'Andreea Tudor',
          role: 'Responsabil financiar',
          url: "./team/Andreea Tudor_responsabil financiar.jpg"
        },{
          id: 3,
          name: 'Cristina Baciu',
          role: 'Editor',
          url: "./team/Cristina Baciu_editor.jpg"
        },{
          id: 99,
          name: 'Eliza Zdru',
          role: 'Regizor/producător',
          url: "./team/Eliza Zdru_producator _ regizor.JPG"
        },{
          id: 5,
          name: 'Ion David Pirneci',
          role: 'Profesor de istorie',
          url: "./team/Ionuț Pirneci_profesor de istorie.jpg"
        },{
          id: 6,
          name: 'Matei Budeș',
          role: 'Director de imagine',
          url: "./team/Matei Budeș_ director de imagine.jpeg"
        },{
          id: 7,
          name: 'Vlad Bolocan',
          role: 'Director Tehnic',
          url: "./team/Vlad Bolocan_șofer.jpeg"
        },{
          id: 8,
          name: 'Vlad Bâscă',
          role: 'Director de imagine',
          url: "./team/VladBasca.jpg"
        },{
          id: 9,
          name: 'Letiția Ștefănescu',
          role: 'Editor',
          url: "./team/LetitiaStefanescu.jpg"
        },{
          id: 10,
          name: 'Hara Alexandra Mosteanu',
          role: 'Fotograf de platou',
          url: "./team/HaraAlexandraMosteanu.jpg"
        },{
          id: 11,
          name: 'Cătălina Murariu',
          role: 'Comunicare & PR',
          url: "./team/CatalinaMurariu.jpg"
        }
      ]
    }
  },
  computed: {
    videos1() {
      return this.$store.getters.videosSem1;
    },
    videos2() {
      return this.$store.getters.videosSem2;
    },
    videos3() {
      return this.$store.getters.videosSem3;
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
    getVideosByClass: function () {
      const vm = this;
      const payload = {
        classOf: this.activeClass
      }
      this.$store.dispatch('loadVideos', payload)
        .then(() => {
          console.log(payload.videos.length + ' found videos for class: ' + vm.activeClass);
        });
    },
    scrollTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo({top:top, left:0, behavior: 'smooth'});
    },
    saveEmailNewsletter(email) {
      this.$store.dispatch('saveEmailNewsletter', email).then(() => {
        console.log("Email for newsletter saved.");
        this.newsletter_email = '';
      })
    },
  },
  mounted: function() {
    console.log('Home page component has been created!');
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
    padding: 0px;
  }
  .first-content-wrapper {
    margin: 0px;
  }
  .first-content-bg {
    padding: 0;
  }
  .first-footer-team {
    padding-top: 80px;
  }
  .first-footer-team-content {
    margin: 0;
    padding: 40px;
    justify-content: flex-start;
    justify-content: center;
  }
  .first-newsletter-email-wrapper input {
    padding: 5px 10px;
  }
  .v-expansion-panel-content__wrap {
    padding: 0 !important;
  }
}
@media only screen and (min-width: 769px) {
  .first-header-wrapper {
    padding: 80px 80px 200px 80px;
  }
  .first-header-courses-wrapper {
    padding: 0 80px 0 80px;
  }
  .first-content-wrapper {
    /*margin: 0 80px 0 80px;*/
  }
  .first-content-bg {
    padding: 0 80px;
  }
  .first-footer-team {
    padding: 80px 80px 0 80px;
  }
  .first-newsletter-email-wrapper input {
    padding: 15px 20px;
  }

  .first-footer-team-content {
    justify-content: flex-start;
    margin: 0 80px 80px 80px;
    padding: 40px;
  }
  .header-top-line {
    width: 300px;
  }

  .first-header-wrapper-fixed-size {
    width: 1280px;
    margin: auto;
  }

}

.first-header-wrapper {
  display:flex;
  flex-direction: column;
  background-size: cover;
  background: #F2B4B4 url("../assets/mainbg.png") no-repeat;
  background-size: cover;
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
  cursor: pointer;
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
  width: 100%;
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
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
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
  border-bottom: 10px solid #D4D7EE;
  border-left: 10px solid #D4D7EE;
  border-right: 10px solid #D4D7EE;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
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

.first-footer-team-body {
  background: white none;
  display: flex;
  flex-direction: column;

}

.first-footer-team-content {
  display: flex;
  flex-direction: row;
  border-bottom: 10px solid #D4D7EE;
  border-left: 10px solid #D4D7EE;
  border-right: 10px solid #D4D7EE;
  text-align: left;
  flex-wrap: wrap;
}

.first-footer-team-item {
  margin: 0px 20px 0px 20px;
}

.first-video-thumbnail-main-image {
  outline: 10px solid #F4F9F9;
  outline-offset: -10px;
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
  margin-bottom: 30px;
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

</style>