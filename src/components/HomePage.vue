<template>
  <div>
    <div class="first-header-wrapper">
      <div class="first-header-title">copiii povestesc istoria</div>
    </div>
<!--    drop box with all classes-->
<!--    <select v-model="activeClass" @change="getVideosByClass()">-->
<!--      <option v-for="option in options" v-bind:value="option.key" v-bind:key="option.key">-->
<!--        {{ option.text }}-->
<!--      </option>-->
<!--    </select>-->

<!--    list of the videos for the selected class-->
<!--    <ul id="videos">-->
<!--      <li v-for="video in videos" :key="video.id">-->
<!--        {{ video.name }}-->
<!--      </li>-->
<!--      <p>{{activeClass}}</p>-->
<!--    </ul>-->
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      activeClass: 1,
      options: [
        { text: 'Clasa I', key: 1 },
        { text: 'Clasa II', key: 2 },
        { text: 'Clasa III', key: 3 }
      ]
    }
  },
  computed: {
    videos() {
      return this.$store.getters.videoIds;
    }
  },
  methods: {
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
.first-header-wrapper {
  display:flex;
  background: #F2B4B4;
}

.first-header-title {
  font-family: 'Matter', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 140px;
  line-height: 140px;
  /*text-transform: uppercase;*/
  width: 81px;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
</style>