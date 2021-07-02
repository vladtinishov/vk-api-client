<template>
  <div id="app">
    <CreateCampaign
      @campaign_selected="getCampaing"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import CreateCampaign from './components/CreateCampaign.vue'

export default {
  name: 'App',
  components: {
    CreateCampaign
  },
  methods: {
    getCampaing(id) {
      console.log(id);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
