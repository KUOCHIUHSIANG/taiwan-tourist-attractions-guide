<template>
  <div class="scenic-spot-container">
    <SharedPage :initial-inside-page-data="scenicSpot"
    :center="{lat, lng}"
    />
    <SharedCardsList 
    v-if="nearbyScenicSpots.length !== 0"
    :initial-card-list="nearbyScenicSpots"
    :initial-title="nearByTitle"
    :initial-sub-title="nearBySubTitle" />
  </div>
</template>

<script>
import SharedPage from '../components/SharedPageForInsidePages.vue'
import SharedCardsList from '../components/SharedCardsList.vue';
import scenicSpotsAPI from '../api/scenic-spots'
import { mixinResize } from "../utils/mixin";
import store from "./../store";


export default {
  mixins: [mixinResize],
  components: {
    SharedPage,
    SharedCardsList
  },
  created() {
    this.fetchScenicSpot(this.$route.params.ScenicSpotID);
  },
  data() {
    return {
      scenicSpot: {},
      nearbyScenicSpots: [],
      lat: 0,
      lng: 0,
    }
  },
  methods: {
    async fetchScenicSpot(id) {
      try {
        const response = await scenicSpotsAPI.getScenicSpot({ id });

        if(response.data.length === 0) {
          this.$toast.error("此景點不存在", {
            timeout: 1500
          })
          this.$router.push({ name: 'search-scenic-spot' })
          return
        }

        const [scenicSpotData] = response.data
        this.scenicSpot = {
          id: scenicSpotData.ScenicSpotID,
          name: scenicSpotData.ScenicSpotName,
          description: scenicSpotData.DescriptionDetail,
          phone: scenicSpotData.Phone,
          address: scenicSpotData.Address ? scenicSpotData.Address : '未提供',
          openTime: scenicSpotData.OpenTime,
          city: scenicSpotData.City ? scenicSpotData.City : '未提供',
          class1: scenicSpotData.Class1,
          class2: scenicSpotData.Class2,
          class3: scenicSpotData.Class3,
          websiteUrl: scenicSpotData.WebsiteUrl,
          picture: scenicSpotData.Picture,
          position: scenicSpotData.Position,
          ticketInfo: scenicSpotData.TicketInfo,
          remarks: scenicSpotData.Remarks,
        }
        this.lat = this.scenicSpot.position.PositionLat
        this.lng = this.scenicSpot.position.PositionLon

        this.fetchNearbyScenicSpots(this.scenicSpot.id, this.lat, this.lng)        
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
           this.fetchScenicSpot(this.$route.params.ScenicSpotID);
        } else {
          console.log(error)
        }
      }
      
    },
    async fetchNearbyScenicSpots(id, lat, lng) {
      try{
        const amount = 4
        const response = await scenicSpotsAPI.getNearbyScenicSpots(id, lat, lng, amount)

        this.nearbyScenicSpots = response.data.map((scenicSpot)=> ({
          id: scenicSpot.ScenicSpotID,
          name: scenicSpot.ScenicSpotName,
          city: scenicSpot.City ? scenicSpot.City : '未提供',
          picture: scenicSpot.Picture
        }))

        this.nearbyScenicSpots = this.nearbyScenicSpots.filter((nearbyScenicSpots) => {
          return nearbyScenicSpots.id !== this.scenicSpot.id
        })

      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchScenicSpot(this.$route.params.ScenicSpotID);
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
    const { ScenicSpotID } = to.params
    this.fetchScenicSpot(ScenicSpotID);
    next()
  },
}
</script>

<style lang="scss" scoped>
.scenic-spot-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 88px 15px 0;
  margin-bottom: 71px;
}

@media screen and (min-width: 768px) {
  .scenic-spot-container {
    padding: 140px 45px 0;
    margin-bottom: 120px;
  }
}
</style>