<template>
  <div class="restaurant-container">
    <SharedPage :initial-inside-page-data="restaurant"
    :center="{lat, lng}"
    />
    <SharedCardsList 
    v-if="nearbyRestaurants.length !== 0"
    :initial-card-list="nearbyRestaurants"
    :initial-title="nearByTitle"
    :initial-sub-title="nearBySubTitle" />
  </div>
</template>

<script>
import SharedPage from '../components/SharedPageForInsidePages.vue'
import SharedCardsList from '../components/SharedCardsList.vue';
import restaurantsAPI from '../api/restaurants';
import { mixinResize } from "../utils/mixin";
import store from "./../store";


export default {
  mixins: [mixinResize],
  components: {
    SharedPage,
    SharedCardsList
  },
  created() {
    this.fetchRestaurant(this.$route.params.RestaurantID)
  },
  data() {
    return {
      restaurant: {},
      nearbyRestaurants: [],
      lat: 0,
      lng: 0,
    }
  },
  methods: {
    async fetchRestaurant(id) {
      try {
        const response = await restaurantsAPI.getRestaurant({ id })

        if(response.data.length === 0) {
          this.$toast.error("此餐廳不存在", {
            timeout: 1500
          })
          this.$router.push({ name: 'search-restaurant' })
          return
        }
        
        const [restaurantData] = response.data
        this.restaurant = {
          id: restaurantData.RestaurantID,
          name: restaurantData.RestaurantName,
          description: restaurantData.Description,
          phone: restaurantData.Phone,
          address: restaurantData.Address ? restaurantData.Address : '未提供',
          openTime: restaurantData.OpenTime,
          city: restaurantData.City ? restaurantData.City : '未提供',
          class1: restaurantData.Class,
          websiteUrl: restaurantData.WebsiteUrl,
          picture: restaurantData.Picture,
          position: restaurantData.Position,
        }
        this.lat = this.restaurant.position.PositionLat
        this.lng = this.restaurant.position.PositionLon

        this.fetchNearbyRestaurants(this.restaurant.id, this.lat, this.lng) 

       } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchRestaurant(this.$route.params.ActivityID)
        } else {
          console.log(error)
        }
      }
    },
    async fetchNearbyRestaurants(id, lat, lng) {
      try{
        const amount = 4
        const response = await restaurantsAPI.getNearbyRestaurants(id, lat, lng, amount)

        this.nearbyRestaurants = response.data.map((restaurant)=> ({
          id: restaurant.RestaurantID,
          name: restaurant.RestaurantName,
          city: restaurant.City ? restaurant.City : '未提供',
          picture: restaurant.Picture
        }))

        this.nearbyRestaurants = this.nearbyRestaurants.filter((nearbyRestaurants) => {
          return nearbyRestaurants.id !== this.restaurant.id
        })

      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchRestaurant(this.$route.params.RestaurantID);
        } else {
          console.log(error)
        }
      }
    },
  },
  watch: {
    scenicSpot() {
      this.getDimensions()
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { RestaurantID } = to.params
    this.fetchRestaurant(RestaurantID);
    next()
  },
}
</script>

<style lang="scss" scoped>
.restaurant-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 88px 15px 0;
  margin-bottom: 71px;
}

@media screen and (min-width: 768px) {
  .restaurant-container {
    padding: 140px 45px 0;
    margin-bottom: 120px;
  }
}
</style>