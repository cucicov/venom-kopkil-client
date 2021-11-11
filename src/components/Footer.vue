<template>
  <div class="footer-wrapper">
    <div class="footer-logo">
      copiii explică istoria
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
        <v-img src="./EZ.png">
        </v-img>
      </div>
      <div>
        <v-img src="./vt.PNG">
        </v-img>
      </div>
    </div>

    <div class="footer-chunk-last">
      Restul e istorie.
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
.footer-chunk-last {
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 14px;
  width: 120px;
  margin: 0 0 80px 80px;
  text-align: left;
  color: black;
  text-align: right;
  align-content: flex-end;
  margin-top: 200px;
}

.footer-chunk {
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 14px;
  width: 120px;
  margin: 0 0 80px 80px;
  text-align: left;
  color: black;
}

.footer-chunk >div {
  margin-bottom: 20px;
}

.footer-wrapper {
  background: #F4F9F9 none;
  padding: 80px;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #1B2CC1;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
}
.footer-logo {
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 14px;
  width: 81px;
  margin-bottom: 80px;
  text-align: left;
  color: black;
}
</style>
