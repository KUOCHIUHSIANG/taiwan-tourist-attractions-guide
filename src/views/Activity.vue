<template>
  <div class="activity-container">
    <SharedPage :initial-inside-page-data="activity"
    :center="{lat, lng}"
    />
    <SharedCardsList v-if="nearbyActivities.length !== 0"
    :initial-card-list="nearbyActivities"
    :initial-title="nearByTitle"
    :initial-sub-title="nearBySubTitle" />
  </div>
</template>

<script>
import SharedPage from '../components/SharedPageForInsidePages.vue';
import SharedCardsList from '../components/SharedCardsList.vue';
import activitiesAPI from '../api/activities';
import { mixinResize } from "../utils/mixin";
import store from "./../store";
import { mapState } from 'vuex';

export default {
  mixins: [mixinResize],
  components: {
    SharedPage,
    SharedCardsList
  },
  created() {
    this.fetchActivity(this.$route.params.ActivityID)
  },
   mounted() {
    window.addEventListener('resize', this.getDimensions)
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions)
  },
  data() {
    return {
      activity: {},
      nearbyActivities: [],
      lat: 0,
      lng: 0,
    }
  },
  methods: {
    async fetchActivity(id) {
      try {
        const response = await activitiesAPI.getActivity({ id });
        
        if(response.data.length === 0) {
          this.$toast.error("此活動不存在", {
            timeout: 1500
          })
          this.$router.push({ name: 'search-activity' })
          return
        }
        const [activityData] = response.data
        this.activity = {
          id: activityData.ActivityID,
          name: activityData.ActivityName,
          description: activityData.Description,
          phone: activityData.Phone,
          address: activityData.Address ? activityData.Address : '未提供',
          startTime: activityData.StartTime,
          endTime: activityData.EndTime,
          city: activityData.City ? activityData.City : '未提供',
          class1: activityData.Class1,
          class2: activityData.Class2,
          websiteUrl: activityData.WebsiteUrl,
          picture: activityData.Picture,
          position: activityData.Position,
          charge: activityData.Charge,
          remarks: activityData.Remarks,
          organizer: activityData.Organizer
        }
        this.lat = this.activity.position.PositionLat
        this.lng = this.activity.position.PositionLon
        if (this.activity.city !== '未提供') {
          let citiesArr = this.cities.map((city)=> {
            return city.name
          })
          let cityIndex = citiesArr.indexOf(this.activity.city)
          let engCity = this.cities[cityIndex].engName
          
          this.fetchRecentActivitiesByCity(engCity)
        } else {
          this.nearbyActivities = []
        }
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchActivity(this.$route.params.ActivityID)
        } else {
          console.log(error)
        }
      }
    },
    async fetchRecentActivitiesByCity(city) {
      try { 
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        const amount = 4

        const response = await activitiesAPI.getRecentActivitiesByCity({year, month, day, city, amount})

        if (response.statusText !== "OK") {
          throw new Error(response);
        }
        
        this.nearbyActivities = response.data.map((activity) => ({
          id: activity.ActivityID,
          name: activity.ActivityName,
          city: activity.City ? activity.City : "未提供",
          picture: activity.Picture,
        }))
        
        this.nearbyActivities = this.nearbyActivities.filter((nearbyActivity) => {
          return nearbyActivity.id !== this.activity.id
        })

      } catch (error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchActivity(this.$route.params.ActivityID)
        } else {
          console.log(error)
        }
      }
    }
  },
  computed: {
    ...mapState(['cities'])
  },
  watch: {
    activity() {
      this.getDimensions()
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { ActivityID } = to.params
    this.fetchActivity(ActivityID)
    next()
  },
}
</script>

<style lang="scss" scoped>
.activity-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 88px 15px 0;
  margin-bottom: 71px;
}

@media screen and (min-width: 768px) {
  .activity-container {
    padding: 140px 45px 0;
    margin-bottom: 120px;
  }
}
</style>