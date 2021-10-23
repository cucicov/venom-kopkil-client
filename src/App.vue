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
    title: 'Copiii povestesc istoria',
    titleTemplate: '%s | Copiii povestesc istoria',
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'An example Vue application with vue-meta.' },
      { name: 'viewport', content: 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width' },
      { name: 'robots', content: 'index, follow' },
      { name: 'og:title', content: 'cpi-placeholder' },
      { name: 'og:description', content: 'cpi-placeholder' },
      { name: 'og:type', content: 'cpi-placeholder' },
      { name: 'og:url', content: 'cpi-placeholder' },
      { name: 'og:image', content: 'cpi-placeholder' },
      { name: 'og:image:type', content: 'cpi-placeholder' },
      { name: 'og:image:width', content: 'cpi-placeholder' },
      { name: 'og:image:height', content: 'cpi-placeholder' },
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
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

@font-face {
  font-family: "Matter";
  src: local("Matter"),   url(./assets/fonts/Matter/Matter-Regular.otf) format("truetype");}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
