<script setup>
import TopBar from './components/topBar.vue'
import { useUserStore } from './store/userStore';

useUserStore();
</script>

<template>
  <div>
    <top-bar v-if="!$route.meta.hideNavbar"></top-bar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap');

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main-font-color;
  background-color: $main-background;
}
body{
  margin: 0px;
}
</style>
