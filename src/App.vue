<template>
  <Header />
  <router-view></router-view>
</template>

<script>
import Header from '@/pages/Header/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
