<template>
  <div>
    <h2>Home Page</h2>
    <select v-model="activeClass" @change="getVideosByClass()">
      <option v-for="option in options" v-bind:value="option.key" v-bind:key="option.key">
        {{ option.text }}
      </option>
    </select>

    <ul id="videos">
      <li v-for="video in videos" :key="video.id">
        {{ video.name }}
      </li>
      <p>{{activeClass}}</p>
    </ul>
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
</style>