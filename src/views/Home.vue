<template>
  <div class="home-container">
    <SearchSection />
    <Carousel :initial-card-list="randomCarouselScenicSpots"/>
    <Activities :initial-recent-activities="recentActivities" />
    <SharedCardsList :initial-card-list="popularScenicSpots"
    :initial-title="popularScenicSpotsTitle"
    :initial-sub-title="popularScenicSpotsSubTitle"/>
    <SharedCardsList :initial-card-list="popularRestaurants"
    :initial-title="popularRestaurantsTitle"
    :initial-sub-title="popularRestaurantsSubTitle"/>
  </div>
</template>

<script>
import SearchSection from '../components/SearchSection.vue';
import Carousel from '../components/Carousel.vue';
import Activities from '../components/Activities.vue';
import SharedCardsList from '../components/SharedCardsList';
import activitiesAPI from '../api/activities';
import scenicSpotsAPI from '../api/scenic-spots';
import restaurantsAPI from '../api/restaurants';
import store from "./../store";
import { mapState } from 'vuex';


export default {
  components: {
    SearchSection,
    Carousel,
    Activities,
    SharedCardsList
  },
  created() {
    this.fetchRandomScenicSpots()
    this.fetchRecentActivities()
    this.fetchPopularScenicSpots()
    this.fetchPopularRestaurants()
  },
  data() {
    return {
      popularScenicSpotsTitle: "熱門打卡景點",
      popularScenicSpotsSubTitle: "查看更多景點",
      popularRestaurantsTitle: "一再回訪美食",
      popularRestaurantsSubTitle: "查看更多美食",
      randomCarouselScenicSpots: [],
      popularScenicSpots: [],
      popularRestaurants: [],
      recentActivities: []
    }
  },
  methods: {
    async fetchRandomScenicSpots() {
      try {
        let n = []
        for (let i = 0; i < 6; i++) {
          // 出現過的數字要跳過重新抓取
          let pick = Math.floor(Math.random() * 22 ) + 1;
          if(n.indexOf(pick) >= 0) {
            i-=1;
            continue;
          } else {
            n.push(pick)
          }

          let city = this.cities[pick].engName
          let response = await scenicSpotsAPI.getCityScenicSpots(city)
         
          this.randomCarouselScenicSpots.push({
            id: response.data[0].ScenicSpotID,
            name: response.data[0].ScenicSpotName,
            picture: response.data[0].Picture,
            city: response.data[0].City
          })
        }
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchRandomScenicSpots()
        } else {
          console.log(error)
        }
      }
    },
    async fetchRecentActivities() {
      try { 
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let response = await activitiesAPI.getRecentActivities({year, month, day})

        if (response.statusText !== "OK") {
          throw new Error(response);
        }
        
        this.recentActivities = response.data.map((activity) => ({
          id: activity.ActivityID,
          name: activity.ActivityName,
          city: activity.City ? activity.City : "未提供",
          picture: activity.Picture,
          startTime: activity.StartTime,
          endTime: activity.EndTime
        }))

      } catch (error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchRecentActivities()
        } else {
          console.log(error)
        }
      }
    },
    async fetchPopularScenicSpots() {
      try {
        let response = await scenicSpotsAPI.getPopularScenicSpots()

        if (response.statusText !== "OK") {
          throw new Error(response);
        }
        
        this.popularScenicSpots = response.data.map((scenicSpot) => ({
          id: scenicSpot.ScenicSpotID,
          name: scenicSpot.ScenicSpotName,
          city: scenicSpot.City ? scenicSpot.City : "未提供",
          picture: scenicSpot.Picture
        }))
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchPopularScenicSpots()
        } else {
          console.log(error)
        }
      }
    },
    async fetchPopularRestaurants() {
     try {
      let response = await restaurantsAPI.getPopularRestaurants() 

      if (response.statusText !== "OK") {
        throw new Error(response);
      }

      this.popularRestaurants = response.data.map((restaurant) => ({
        id: restaurant.RestaurantID,
        name: restaurant.RestaurantName,
        city: restaurant.City ? restaurant.City : "未提供",
        picture: restaurant.Picture
      }))

     } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchPopularRestaurants()
        } else {
          console.log(error)
        }
     }
    }
  },
  computed: {
    ...mapState(['cities'])
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  margin: 70px 15px 72px;
}

@media screen and (min-width: 768px) {
  .home-container {
    margin: 162px 45px 120px;
    max-width: 1200px;
  }
}
</style>