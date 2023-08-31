<template>
  <div class="shared-page-container">
    <div class="index-title">
      <span>首頁</span>
      <span v-if="routeName === 'scenic-spot'">探索景點</span>
      <span v-else-if="routeName === 'activity'">節慶活動</span>
      <span v-else-if="routeName === 'restaurant'">在地美食</span>
      <span>宜蘭縣</span>
      <span>羅東林業文化園區</span>
    </div>
    <div class="picture-container">
      <img src="https://www.eastcoast-nsa.gov.tw/image/426/640x480" alt="這是綠島露營區的階梯">
    </div>
    <div class="content-container">
      <h1 class="content-name">羅東林業文化園區</h1>
      <span class="hash-tag">自然風景類</span>
      <span class="hash-tag">都會公園類</span>
      <span class="hash-tag">其他</span>
      <p v-if="routeName === 'scenic-spot'" class="content-title">景點介紹：</p>
      <p v-else-if="routeName === 'activity'" class="content-title">活動介紹：</p>
      <p v-else-if="routeName === 'restaurant'" class="content-title">餐廳介紹：</p>
      <p class="content-description">
        紫坪位在綠島最南方，緊鄰「綠島露營區」。從露營區旁的步道，可通往海岸邊的潟湖「紫坪」。「紫坪」是一處由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。外海儘管浪濤洶湧，內湖依然波平如鏡，宛若沉睡的湖水，清淺的躺在外珊瑚礁岩與內珊瑚貝砂灘間；水芫花灌叢身影倒映於平靜無波的水面上，潔白柔細的白砂鋪陳水底。熱帶海岸旖旎風情，盡在不言中。
      </p>
    </div>
    <div class="detail-container">
      <div v-if="routeName === 'scenic-spot'" class="detail-container__info-section">
        <div class="info">
          <span class="title">開放時間：</span>
          06:00-19:00
        </div>
        <div class="info">
          <span class="title">服務電話：</span>
          886-3-9545114
        </div>
        <div class="info">
          <span class="title">景點地址：</span>
          <a href="https://www.google.com/maps/search/?api=1&query={ PositionLat }%2C{ PositionLon }" target="_blank">臺東縣951綠島鄉溫泉路256號</a>
        </div>
        <div class="info">
          <span class="title">官方網站：</span>
          <a href="https://www.cjwine.com/" target="_blank">https://www.cjwine.com/</a>
        </div>
        <div class="info">
          <span class="title">票價資訊：</span>
          免費，露營活動另計。
        </div>
        <div class="info">
          <span class="title">注意事項：</span>
          1、紫坪上方的綠島露營區為生態保護區，禁止採集花木生物，並請維護環境整潔，讓這片美景能留與後代子孫。2、露營區目前已於2009年委由「東方之泉有限股份公司」經營，      聯絡電...
        </div>
      </div>
      <div v-else-if="routeName === 'activity'" class="detail-container__info-section">
        <div class="info">
          <span class="title">活動時間：</span>
          2021/02/19 00:00 - 2021/02/28 00:00
        </div>
        <div class="info">
          <span class="title">聯絡電話：</span>
          886-3-9545114
        </div>
        <div class="info">
          <span class="title">主辦單位：</span>
          苗栗市公所、苗栗市民代表會
        </div>
        <div class="info">
          <span class="title">活動地點：</span>
          <a href="https://www.google.com/maps/search/?api=1&query={ PositionLat }%2C{ PositionLon }" target="_blank">臺東縣951綠島鄉溫泉路256號</a>
        </div>
        <div class="info">
          <span class="title">官方網站：</span>
          <a href="https://www.cjwine.com/" target="_blank">https://www.cjwine.com/</a>
        </div>
        <div class="info">
          <span class="title">活動費用：</span>
          免費。
        </div>
        <div class="info">
          <span class="title">注意事項：</span>
          小心火燭
        </div>
      </div>
      <div v-else-if="routeName === 'restaurant'" class="detail-container__info-section">
        <div class="info">
          <span class="title">營業時間：</span>
          上午11:00~14:30下午17:00~21:00
        </div>
        <div class="info">
          <span class="title">聯絡電話：</span>
          886-49-2995096
        </div>
        <div class="info">
          <span class="title">餐廳地址：</span>
          <a href="https://www.google.com/maps/search/?api=1&query={ PositionLat }%2C{ PositionLon }" target="_blank">臺東縣951綠島鄉溫泉路256號</a>
        </div>
        <div class="info">
          <span class="title">官方網站：</span>
          <a href="https://www.cjwine.com/" target="_blank">https://www.cjwine.com/</a>
        </div>
      </div>
      <div class="detail-container__nearby-section">
        <div id="map" class="google-map"></div>
        <div class="nearby-btn-section">
          <div class="nearby-btn-title">周邊資訊：
          </div>
          <div class="nearby-btn-wrapper">
            <div class="nearby-scenic-spots-btn nearby-btn">
              <div class="nearby-btn-icon icon-scene"></div>
              <span>附近景點</span>
            </div>
            <div class="nearby-activities-btn nearby-btn">
              <div class="nearby-btn-icon icon-event"></div>
              <span>附近活動</span>
            </div>
            <div class="nearby-restaurants-btn nearby-btn">
              <div class="nearby-btn-icon icon-food"></div>
              <span>附近美食</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
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
  created() {
    this.insidePageData = { ...this.initialInsidePageData }
  },
  data() {
    return {
      routeName: this.$route.name,
      insidePageData: {},
      map: null,      
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
  },
  watch: {
    $route: function(to, from) {
      if (to.path !== from.path) {
        this.routeName = this.$route.name
      }
    },
    center() {
      this.initMap();
    }
  }
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
                cursor: pointer;
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