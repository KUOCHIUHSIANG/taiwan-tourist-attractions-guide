<template>
  <div class="search-container">
    <SharedSearchPage :initial-route-name="routeName"/>
  </div>
</template>

<script>
import SharedSearchPage from '../components/SharedSearchPages.vue'
export default {
  components: {
    SharedSearchPage
  },
  data() {
    return {
      routeName: this.$route.name
    }
  },
  watch: {
    // 當路徑改變時獲取新路徑名稱
    $route: function(to, from) {
      if (to.path !== from.path) {
        this.routeName = this.$route.name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  padding: 88px 15px 0;
  max-width: 1200px;
  margin: 0 auto;
}

@media screen and (min-width: 768px) {
  .search-container {
    padding: 140px 45px 0;
  }
}
</style>