
<template>
  <div>
    <top-bar v-if="!$route.meta.hideNavbar"></top-bar>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import TopBar from './components/topBar.vue';
import FooterComponent from './components/footerComponent.vue';
import { useConfigStore } from './store/configStore';

export default {
  name: 'App',
  components: { TopBar, FooterComponent},
  mounted() {
    const configStore = useConfigStore();
    const language = configStore.getUserLanguage();
    this.$i18n.locale= language || 'en';
    configStore.setUserLanguage(language || 'en');
  }
}

</script>

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
