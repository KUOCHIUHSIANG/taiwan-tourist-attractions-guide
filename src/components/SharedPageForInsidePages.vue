<template>
  <div class="shared-page-container">
    <div class="index-title">
      <span>首頁</span>
      <span v-if="routeName === 'scenic-spot'">探索景點</span>
      <span v-else-if="routeName === 'activity'">節慶活動</span>
      <span v-else-if="routeName === 'restaurant'">在地美食</span>
      <span v-if="insidePageData.city !=='未提供'">{{ insidePageData.city }}</span>
      <span>{{ insidePageData.name }}</span>
    </div>
    <div class="picture-container">
      <img v-if="insidePageData.picture.PictureUrl1"
       v-default-img="insidePageData.picture.PictureUrl1"
       :src="insidePageData.picture.PictureUrl1" :alt="insidePageData.picture.PictureDescription1 ">
      <img v-else :src="require(`@/assets/images/icon/${emptyImageUrl}`)"
      alt="未提供">
    </div>
    <div class="content-container">
      <h1 class="content-name">{{ insidePageData.name }}</h1>
      <span v-if="insidePageData.class1" class="hash-tag">{{ insidePageData.class1 }}</span>
      <span v-if="insidePageData.class2" class="hash-tag">{{ insidePageData.class2 }}</span>
      <span v-if="insidePageData.class3" class="hash-tag">{{ insidePageData.class3 }}</span>
      <p v-if="routeName === 'scenic-spot'" class="content-title">景點介紹：</p>
      <p v-else-if="routeName === 'activity'" class="content-title">活動介紹：</p>
      <p v-else-if="routeName === 'restaurant'" class="content-title">餐廳介紹：</p>
      <p class="content-description">
        {{ insidePageData.description }}
      </p>
    </div>
    <div class="detail-container">
      <div v-if="routeName === 'scenic-spot'" class="detail-container__info-section">
        <div v-if="insidePageData.openTime" class="info">
          <span class="title">開放時間：</span>
          08:00 - 22:00
        </div>
        <div v-if="insidePageData.phone" class="info">
          <span class="title">服務電話：</span>
          {{ insidePageData.phone }}
        </div>
        <div v-if="insidePageData.address" class="info">
          <span class="title">景點地址：</span>
          <a :href="'https://www.google.com/maps/search/?api=1&query='+ center.lat +'%2C'+ center.lng" target="_blank">{{ insidePageData.address }}</a>
        </div>
        <div v-if="insidePageData.websiteUrl" class="info">
          <span class="title">官方網站：</span>
          <a :href="insidePageData.websiteUrl" target="_blank">{{ insidePageData.websiteUrl }}</a>
        </div>
        <div v-if="insidePageData.ticketInfo" class="info">
          <span class="title">票價資訊：</span>
          免費，露營活動另計。
        </div>
        <div v-if="insidePageData.remarks" class="info">
          <span class="title">注意事項：</span>
          {{ insidePageData.remarks }}
        </div>
      </div>
      <div v-else-if="routeName === 'activity'" class="detail-container__info-section">
        <div class="info">
          <span class="title">活動時間：</span>
          {{ insidePageData.startTime | formatTime }} - {{ insidePageData.endTime | formatTime }}
        </div>
        <div v-if="insidePageData.phone" class="info">
          <span class="title">聯絡電話：</span>
          {{ insidePageData.phone }}
        </div>
        <div v-if="insidePageData.organizer" class="info">
          <span class="title">主辦單位：</span>
          {{ insidePageData.organizer }}
        </div>
        <div v-if="insidePageData.address" class="info">
          <span class="title">活動地點：</span>
          <a :href="'https://www.google.com/maps/search/?api=1&query='+ center.lat +'%2C'+ center.lng" target="_blank">{{ insidePageData.address }}</a>
        </div>
        <div v-if="insidePageData.websiteUrl" class="info">
          <span class="title">官方網站：</span>
          <a :href="insidePageData.websiteUrl" target="_blank">{{ insidePageData.websiteUrl }}</a>
        </div>
        <div v-if="insidePageData.charge" class="info">
          <span class="title">活動費用：</span>
          {{ insidePageData.charge }}
        </div>
        <div v-if="insidePageData.remarks" class="info">
          <span class="title">注意事項：</span>
          {{ insidePageData.remarks }}
        </div>
      </div>
      <div v-else-if="routeName === 'restaurant'" class="detail-container__info-section">
        <div v-if="insidePageData.openTime" class="info">
          <span class="title">營業時間：</span>
          上午11:00~14:30下午17:00~21:00
        </div>
        <div v-if="insidePageData.phone" class="info">
          <span class="title">聯絡電話：</span>
          {{ insidePageData.phone }}
        </div>
        <div v-if="insidePageData.address" class="info">
          <span class="title">餐廳地址：</span>
          <a :href="'https://www.google.com/maps/search/?api=1&query='+ center.lat +'%2C'+ center.lng" target="_blank">{{ insidePageData.address }}</a>
        </div>
        <div v-if="insidePageData.websiteUrl" class="info">
          <span class="title">官方網站：</span>
          <a :href="insidePageData.websiteUrl" target="_blank">{{ insidePageData.websiteUrl }}</a>
        </div>
      </div>
      <div class="detail-container__nearby-section">
         <div id="map" class="google-map"></div>
        <div class="nearby-btn-section">
          <div class="nearby-btn-title">周邊資訊：
          </div>
          <div class="nearby-btn-wrapper">
            <div 
            @click="fetchNearbyScenicSpots"
            class="nearby-scenic-spots-btn nearby-btn">
              <div class="nearby-btn-icon icon-scene"></div>
              <span>附近景點</span>
            </div>
            <div
            @click="fetchNearbyActivities"
             class="nearby-activities-btn nearby-btn">
              <div class="nearby-btn-icon icon-event"></div>
              <span>附近活動</span>
            </div>
            <div
            @click="fetchNearbyRestaurants"
            class="nearby-restaurants-btn nearby-btn">
              <div class="nearby-btn-icon icon-food"></div>
              <span>附近美食</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading :active.sync="isLoading" :is-full-page="fullPage">
        <div class="loadingio-spinner-bean-eater-2g50jwtex7">
          <div class="ldio-d8k2jos3ikj">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
    </Loading>
  </div>
</template>

<script>
import { mixinFilter } from "../utils/mixin";
import scenicSpotsAPI from "../api/scenic-spots";
import activitiesAPI from '../api/activities';
import restaurantsAPI from '../api/restaurants';
import store from "./../store";
import Loading from "vue-loading-overlay";
import "../assets/css/vue-loading.css";

export default {
  mixins: [mixinFilter],
  components: {
    Loading,
  },
  props: {
    initialInsidePageData: {
      type: Object
    },
    center: {
      type: Object,
      default: () => ({ lat: 25.0325917, lng: 121.5624999 })
    },
    initialNearbyScenicSpots: {
      type: Array
    }
  },
  mounted() {
    this.initMap()
  },
  data() {
    return {
      routeName: this.$route.name,
      insidePageData: {
        address: "",
        charge: "",
        city: "",
        class1: "",
        class2: "",
        class3: "",
        description: "",
        id: "",
        name: "",
        organizer: "",
        phone: "",
        picture:{
          PictureUrl1: "www",
          PictureDescription1: "1234"
        },
        position:{},
        remarks:"",
        startTime:"",
        websiteUrl:"",
      },
      map: null,
      emptyImageUrl: "noImage-255x200.png",
      isLoading: true,
      fullPage: true,
    }
  },
  methods: {
    initMap() {
      const google = window.google
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.center,
        zoom: 15,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false
      });
      new google.maps.Marker({
        position: this.center,
        map: this.map
      })
    },
    async fetchNearbyScenicSpots() {
      try {
        const amount = 30
        const response = await scenicSpotsAPI.getNearbyScenicSpots(this.insidePageData.id, this.center.lat, this.center.lng, amount)

        const resultData = response.data.map((result)=> ({
          id: result.ScenicSpotID,
          name: result.ScenicSpotName,
          picture: result.Picture,
          city: result.City ? result.City : '未提供'
        }))

        this.$router.push({
          name: 'search-scenic-spot',
          params: {
            routerResultList: resultData
          }
        })
      } catch(error) {
         if(error.response.status === 401) {
            store.dispatch("getToken");
            this.fetchNearbyScenicSpots()
          } else {
            console.log(error)
          }
      }
    },
    async fetchNearbyActivities() {
      try{
        const amount = 30
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        const response = await activitiesAPI.getNearbyActivities(this.insidePageData.id, year, month, day, this.center.lat, this.center.lng, amount)
        
        const resultData = response.data.map((result)=> ({
          id: result.ActivityID,
          name: result.ActivityName,
          picture: result.Picture,
          city: result.City ? result.City : '未提供'
        }))
        
        this.$router.push({
          name: 'search-activity',
          params: {
            routerResultList: resultData
          }
        })
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchNearbyActivities()
        } else {
          console.log(error)
        }
      }
    },
    async fetchNearbyRestaurants() {
      try {
        const amount = 30
        const response = await restaurantsAPI.getNearbyRestaurants(this.insidePageData.id, this.center.lat, this.center.lng, amount)

        const resultData = response.data.map((result)=> ({
          id: result.RestaurantID,
          name: result.RestaurantName,
          picture: result.Picture,
          city: result.City ? result.City : '未提供'
        }))

        this.$router.push({
          name: 'search-restaurant',
          params: {
            routerResultList: resultData
          }
        })
      } catch(error) {
        if(error.response.status === 401) {
          store.dispatch("getToken");
          this.fetchNearbyRestaurants()
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
    initialInsidePageData(newValue) {
      this.insidePageData = { ...newValue }
      this.isLoading = false
    },
    center() {
      this.initMap();
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/extend";

.shared-page-container {
  margin-bottom: 60px;
  text-align: left;
  .index-title {
    @extend %index-title;
  }
  .picture-container {
    margin: 16px 0;
    border-radius: 16px;
    overflow: hidden;
    height: 185px;
  }
  .content-container {
    margin-bottom: 30px;
    h1.content-name {
      font-size: 24px;
      font-weight: 300;
      margin-bottom: 10px;
      letter-spacing: 0.72px;
    }
    span.hash-tag {
      color: $hash-tag;
      font-size: 14px;
      border: 1px solid $hash-tag;
      border-radius: 20px;
      padding: 2px 10px;
      margin-right: 6px;
      &::before {
        content: "# ";
      }
    }
    p.content-title {
      margin: 18px 0 8px;
      font-size: 18px;
      font-weight: 500;
      color: $sub-font-color;
    }
    p.content-description {
      color: #000;
      font-weight: 300;
      line-height: 30.6px;
    }
  }
  .detail-container {
    background-color: #F9F9F9;
    color: $sub-font-color;
    margin: 0 -15px;
    padding: 0 15px;
    &__info-section {
      padding: 30px 0;
      .info {
        text-indent: -90px;
        margin-left: 90px;
        line-height: 30px;
        span.title {
          font-size: 18px;
          font-weight: 700;
          line-height: 30px;
        }
        &:not(:last-child) {
          margin-bottom: 8px;
        }
        a {
          word-break: break-all;
          color: $sub-color;
          text-decoration-line: underline;
        }
      }
    }
    &__nearby-section {
      .google-map {
        width: 100%;
        height: 185px;
        border-radius: 12px;
      }
      .nearby-btn-section {
        padding-bottom: 30px;
        .nearby-btn-title {
          font-size: 18px;
          font-weight: 700;
          margin: 20px 0;
        }
        .nearby-btn-wrapper {
          .nearby-btn {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1.33px solid #E5E5E5;
            background-color: #FFF;
            border-radius: 6px;
            padding: 8px 0;
            cursor: pointer;
            &:not(:last-child) {
              margin-bottom: 9px;
            }
            .nearby-btn-icon {
              width: 30px;
              height: 30px;
              background-position: center; 
              background-repeat: no-repeat; 
              background-size: cover;
            }
            .icon-scene {
              background-image: url('../assets/images/icon/nearby-scene-btn.png');
            }
            .icon-event {
              background-image: url('../assets/images/icon/nearby-event-btn.png');
            }
            .icon-food {
              background-image: url('../assets/images/icon/nearby-food-btn.png');
            }
            span {
              color: $main-color;
              font-weight: 700;
              line-height: 28px;
              letter-spacing: 3px;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .shared-page-container {
    .index-title {
      font-size: 16px;
      line-height: 28px;
    }
    .picture-container { 
      margin: 30px 0;
      border-radius: 24px;
      height: 400px;
    }
    .content-container {
      margin-bottom: 60px;
      h1.content-name {
        font-size: 36px;
        margin-bottom: 12px;
        letter-spacing: 1.08px;
      }
      span.hash-tag {
        font-size: 20px;
        padding: 2px 18px;
        margin-right: 8px;
      }
      p.content-title {
        margin: 30px 0 10px;
        font-size: 20px;
        font-weight: 700;
      }
      p.content-description {
        font-size: 18px;
      }
    }
    .detail-container {
      background-color: #FFF;
      display: flex;
      column-gap: 32px;
      &__info-section {
        width: 50%;
        height: 100%;
        background-color: #F9F9F9;
        border-radius: 12px;
        padding: 30px 30px 60px;
        .info { 
          font-size: 18px;
          span.title {
            font-size: 20px;
            line-height: normal;
          }
          &:not(:last-child) {
            margin-bottom: 13px;
          }
        }
      }
      &__nearby-section {
        width: 50%;
        .google-map {
          height: 250px;
        }
        .nearby-btn-section {
          .nearby-btn-title {
            font-size: 20px;
            margin-top: 32px;
          }
          .nearby-btn-wrapper {
            display: flex;
            .nearby-btn {
              width: 30%;
              padding: 25px 0;
              &:not(:last-child) {
                margin: unset;
                margin-right: 30px;
              }
              &:hover {
                border: 1.33px solid $main-color;
                .icon-scene {
                  background-image: url('../assets/images/icon/nearby-scene-btn_hover.png');
                }
                .icon-event {
                  background-image: url('../assets/images/icon/nearby-event-btn_hover.png');
                }
                .icon-food {
                  background-image: url('../assets/images/icon/nearby-food-btn_hover.png');
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>