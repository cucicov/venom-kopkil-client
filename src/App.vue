<template>
  <div id="app">
<!--    <img alt="sss" src="./assets/smile.png">-->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  metaInfo: {
    title: 'Copiii explică istoria',
    titleTemplate: '%s | Copiii explică istoria',
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'În prima serie de lecții video, copiii din Sohatu ne povestesc despre primii oameni, despre viața cotidiană în Orientul Antic, despre meșteșugurile și credințele practicate atunci, despre felul în care oamenii se organizau în grupuri sociale' },
      { name: 'viewport', content: 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width' },
      { name: 'robots', content: 'index, follow' },
      { name: 'og:title', content: 'Copiii explică istoria' },
      { name: 'og:description', content: 'În prima serie de lecții video, copiii din Sohatu ne povestesc despre primii oameni, despre viața cotidiană în Orientul Antic, despre meșteșugurile și credințele practicate atunci, despre felul în care oamenii se organizau în grupuri sociale' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://copiiiexplicaistoria.ro' },
      { name: 'og:image', content: 'https://venom-kopkil-server.herokuapp.com/videothumbnails/mainbg.png' },
      { name: 'og:image:type', content: 'image/png' },
      { name: 'og:image:width', content: '1920' },
      { name: 'og:image:height', content: '1080' },
    ]
  },
}
</script>
<!--<meta charset="utf-8">-->
<!--<meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">-->
<!--<meta name="robots" content="index, follow" />-->
<!--<meta property="og:title" content="BIOS" />-->
<!--<meta property="og:description" content="An interactive art exhibition about the anthropocene" />-->
<!--<meta property="og:type" content="website" />-->
<!--<meta property="og:url" content="http://bios.live" />-->
<!--<meta property="og:image" content="http://bios.live/img/BIOS.jpg" />-->
<!--<meta property="og:image:type" content="image/jpeg" />-->
<!--<meta property="og:image:width" content="1920" />-->
<!--<meta property="og:image:height" content="1080" />-->
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap');
/*font-family: 'DM Sans', sans-serif;*/

@font-face {
  font-family: "Matter";
  src: local("Matter"),   url(./assets/fonts/Matter/Matter-Regular.otf) format("truetype");}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Matter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  height: 100%;
}

#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  height: 100%;
}
</style>
