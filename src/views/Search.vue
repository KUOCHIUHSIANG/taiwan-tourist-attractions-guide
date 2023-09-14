<template>
  <div class="search-container">
    <SharedSearchPage :initial-route-name="routeName"
    :initial-search-keyword="keyword"
    :initial-result-list="resultList"/>
  </div>
</template>

<script>
import SharedSearchPage from '../components/SharedSearchPages.vue'
import scenicSpotsAPI from '../api/scenic-spots';
import activitiesAPI from '../api/activities';
import restaurantsAPI from '../api/restaurants';
import store from "./../store";

export default {
  props: {
    routerResultList: {
      type: Array
    }
  },
  components: {
    SharedSearchPage
  },
  created() {
    this.keyword = this.$route.query.keyword;
    if(this.keyword && this.routeName === 'search-scenic-spot') {
      this.fetchScenicSpots()
    } else if (this.keyword && this.routeName === 'search-activity') {
      this.fetchActivities()
    } else if (this.keyword && this.routeName === 'search-restaurant') {
      this.fetchRestaurants()
    }

    if(this.routerResultList) {
      if(this.routerResultList.length === 0) {
         this.$toast.info("目前無附近資訊，請重新搜尋!", {
            timeout: 1500
          })
      } else {
        this.resultList = this.routerResultList
      }
    }
  },
  data() {
    return {
      keyword: '',
      routeName: this.$route.name,
      resultList: []
    }
  },
  methods: {
    async fetchScenicSpots() {
      try {
        const response = await scenicSpotsAPI.getScenicSpotsByKeyword({ keyword: this.keyword});
        
        this.resultList = response.data.map((scenicSpot) => ({
          id: scenicSpot.ScenicSpotID,
          name: scenicSpot.ScenicSpotName,
          city: scenicSpot.City ? scenicSpot.City : "未提供",
          picture: scenicSpot.Picture
        }))
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchScenicSpots()
        } else {
          console.log(error)
        }
      }
    },
    async fetchActivities() {
      try {
        const response = await activitiesAPI.getActivitiesByKeyword({ keyword: this.keyword});
        
        this.resultList = response.data.map((activity) => ({
          id: activity.ActivityID,
          name: activity.ActivityName,
          city: activity.City ? activity.City : "未提供",
          picture: activity.Picture
        }))
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchActivities()
        } else {
          console.log(error)
        }
      }
    },
    async fetchRestaurants() {
      try {
        const response = await restaurantsAPI.getRestaurantsByKeyword({ keyword: this.keyword});
        
        this.resultList = response.data.map((restaurant) => ({
          id: restaurant.RestaurantID,
          name: restaurant.RestaurantName,
          city: restaurant.City ? restaurant.City : "未提供",
          picture: restaurant.Picture
        }))
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchRestaurants()
        } else {
          console.log(error)
        }
      }
    }
  },
  watch: {
    // 當路徑改變時獲取新路徑名稱
    $route: function(to, from) {
      if (to.path !== from.path) {
        this.routeName = this.$route.name
      }
    },
  },
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