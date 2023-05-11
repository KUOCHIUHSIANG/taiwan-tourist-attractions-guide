<template>
  <div class="search-container">
    <h1>
      Search Page
    </h1>
    <h3>
      {{ routeName }}
    </h3>
  </div>
</template>

<script>
export default {
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