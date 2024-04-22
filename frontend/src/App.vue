<template>
  <div id="app">
    <Header v-if="showHeader" :isHomePage="isHomePage"></Header>

    <router-view class="router-view"></router-view>

    <Footer v-if="showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
   Header,
   Footer
  },
  computed:{
    showHeader() {
      const excludedRoutes = ['login', 'add-book', 'book-form', 'register', 'adminlogin'];
      return !excludedRoutes.includes(this.$route.name);
    },
    showFooter() {
      const excludedRoutes = ['login','add-book', 'book-form', 'register', 'adminlogin'];
      return !excludedRoutes.includes(this.$route.name);
    },

    isHomePage() {
      return this.$route.name === 'home'; 
    },
  },
};
</script>

<style>
  .page {
    height: auto;
    width: 100%;
  }
  

  .router {
    height: 100vh;
  }
</style>