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
          <v-img
              :lazy-src="item.lazyUrl"
              min-height="190"
              max-width="190"
              :src="item.url">
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
    videos() {
      return this.$store.getters.videoIds;
    }
  },
  methods: {
    gotoCourses: function() {
      this.$router.push('/courses');
    },
    gotoTeam: function() {
      this.$router.push('/team');
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
    padding: 20px;
  }
  .first-header-courses-wrapper {
    padding: 40px 20px 0px 20px;
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
}
@media only screen and (min-width: 769px) {
  .first-header-wrapper {
    padding: 80px;
  }
  .first-header-courses-wrapper {
    padding: 120px 80px 0px 80px;
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
}

.first-header-wrapper {
  display:flex;
  background: #F2B4B4;
  flex-direction: column;
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
  background: #F2B4B4;
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
  background: lightcyan none;
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
  background: lightcyan none;
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
  background: lightcyan none;
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
  background: lightcyan none;
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

</style>