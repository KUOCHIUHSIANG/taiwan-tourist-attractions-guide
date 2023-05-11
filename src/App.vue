<template>
  <div id="app">
    <Navbar />
    <main role="main" class=" bg-white">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">
@import "./assets/scss/variables";

#app {
  text-align: center;
  color: $main-font-color;
}

main {
  margin-top: 64px;
}


 /* Medium devices , > 768px */
@media screen and (min-width: 768px) {
  main {
    margin-top: 80px;
  }
}
</style>