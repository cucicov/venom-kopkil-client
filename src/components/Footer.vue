<template>
  <div class="footer-wrapper">
    <div class="footer-logo">
      <v-img src="./logo.svg">
      </v-img>
    </div>
    <div class="footer-chunk">
<!--      <div>Proiect <br/>co-finanțat de:</div>-->
      <div>
        <v-img src="./afcn.png">
        </v-img>
      </div>
    </div>

    <div class="footer-chunk">
      <div>Imaginat și implementat de:</div>
      <div>
        <v-img src="./ez_logo.svg">
        </v-img>
      </div>
      <div>
        <v-img src="./vt_logo.svg">
        </v-img>
      </div>
    </div>

    <div class="footer-chunk-last">
      <div style="flex-grow: 1"/>
      <div class="footer-chunk-last-content">
        <v-img src="./restul.svg">
        </v-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media only screen and (max-width: 768px) {
  .footer-wrapper {
    flex-direction: column;
    padding: 40px 20px;
  }
  .footer-chunk {
    margin-bottom: 60px;
  }
  .footer-chunk-last-content {
    margin-right: auto;
  }
}

@media only screen and (min-width: 769px) {
  .footer-wrapper {
    flex-direction: row;
    padding: 80px;
  }
  .footer-chunk{
    margin-left: 80px;
  }
  .footer-chunk-last-content {
    margin-left: auto;
  }
}
.footer-chunk-last {
  display: flex;
  flex-direction: column;
  color: black;
  text-align: left;
  flex-grow: 1;
  margin-top: 20px;
}

.footer-chunk {
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 14px;
  width: 120px;
  text-align: left;
  color: black;
}

.footer-chunk >div {
  margin-top: 20px;
}

.footer-wrapper {
  background: #F4F9F9 none;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #1B2CC1;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  text-transform: uppercase;
}
.footer-logo {
  width: 81px;
  margin: 20px 0px 80px 0px;
  text-align: left;
  color: black;
}
</style>
