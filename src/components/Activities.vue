<template>
  <div class="activities-container">
    <div class="activities-title">
      <h2>近期活動</h2>
      <router-link class="view-more" to="/home/search-activity"
        >查看更多活動
        <img src="../assets/images/icon/arrow-rightR.png" alt="" />
      </router-link>
    </div>
    <div class="activities-list" style="position: relative">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        @click="getActivityHandler(card.id)"
        class="activities-list__card"
      >
        <div class="card-img">
          <img
            v-default-img="card.picture.PictureUrl1"
            :alt="card.picture.PictureDescription1"
          />
        </div>
        <div class="card-info">
          <div class="card-info__title">
            <span class="date-range">{{ cardDateFilter[index] }}</span>
            <p class="title">
              {{ cardTitleFilter[index] }}
            </p>
          </div>
          <div class="card-info__location">
            <p class="location">
              <img src="../assets/images/icon/spot.png" alt="spot-icon" />
              {{ card.city }}
            </p>
            <p class="more-info">
              詳細介紹
              <img src="../assets/images/icon/arrow-rightG.png" alt="" />
            </p>
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
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "../assets/css/vue-loading.css";

export default {
  components: {
    Loading,
  },
  props: {
    initialRecentActivities: {
      type: Array,
    },
  },
  created() {
    this.cardTitleFilter;
  },
  mounted() {
    window.addEventListener("resize", this.getDimensions);
  },
  unmounted() {
    window.removeEventListener("resize", this.getDimensions);
  },
  data() {
    return {
      cards: [],
      screenWidth: document.documentElement.clientWidth,
      emptyImageUrl: "noImage-160x160.png",
      isLoading: true,
      fullPage: false,
    };
  },
  methods: {
    getDimensions() {
      this.screenWidth = document.documentElement.clientWidth;
    },
    getActivityHandler(id) {
      this.$router.push({ path: `/home/search-activity/${id}` });
    },
  },
  computed: {
    cardTitleFilter() {
      // 字數超過28要改成... >28
      // 字數超過15要改成... >15
      return this.cards.map((card) => {
        if (this.screenWidth < 768 && card.name.length > 15) {
          let newName = card.name.slice(0, 14) + "...";

          return newName;
        } else if (this.screenWidth >= 768 && card.name.length > 28) {
          let newName = card.name.slice(0, 27) + "...";

          return newName;
        } else {
          return card.name;
        }
      });
    },
    cardDateFilter() {
      return this.cards.map((card) => {
        let startTime = card.startTime.slice(0, 10).replace(/-/g, "/");
        let endTime = card.endTime.slice(0, 10).replace(/-/g, "/");
        let newTime = startTime + " - " + endTime;
        return newTime;
      });
    },
  },
  watch: {
    initialRecentActivities(newValue) {
      this.cards = newValue;
      this.isLoading = false
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/extend";

.activities-container {
  .activities-title {
    @extend %cards-list-title;
    padding-left: 4px;
    max-width: 400px;
  }
  .activities-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__card {
      cursor: pointer;
      min-width: 345px;
      margin-bottom: 1rem;
      border-radius: 8px;
      display: flex;
      .card-img {
        width: 90px;
        height: 62px;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        overflow: hidden;
      }
      .card-info {
        padding: 0 16px;
        text-align: left;
        &__title {
          span.date-range {
            font-size: 12px;
            color: $third-font-color;
          }
          p.title {
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.15px;
          }
        }
        &__location {
          p.location {
            color: $third-font-color;
            font-size: 11px;
          }
          p.location > img,
          p.more-info {
            display: none;
          }
        }
      }
    }
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .activities-container {
    .activities-title {
      max-width: unset;
      align-items: center;
      padding: 0 15px 0;
      h2 {
        font-size: 36px;
      }
    }
    .activities-list {
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 30px;
      &__card {
        margin-bottom: 12px;
        border-radius: 12px;
        border: 1px solid #e5e5e5;
        background-color: #f9f9f9;
        .card-img {
          min-width: 160px;
          height: 160px;
          border: 0;
          border-right: 1px solid #e5e5e5;
          border-radius: 12px 0 0 12px;
          img {
            transition: all 0.2s ease-out;
          }
        }
        .card-info {
          padding: 18px 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &__title {
            span.date-range {
              font-size: 16px;
            }
            p.title {
              font-size: 22px;
              letter-spacing: 0.66px;
            }
          }
          &__location {
            display: flex;
            align-items: center;
            justify-content: space-between;
            p.location > img,
            p.more-info {
              display: block;
            }
            p.location > img,
            p.more-info > img {
              height: 16px;
              width: 16px;
            }
            p.location,
            p.more-info {
              display: inline-flex;
              align-items: center;
            }
            p.location {
              column-gap: 3px;
              font-size: 16px;
            }
            p.more-info {
              color: $main-color;
            }
          }
        }
      }
      &__card:hover {
        .card-img {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .activities-container {
    .activities-list {
      &__card {
        width: 48%;
        .card-info {
          width: 100%;
          padding: 8px 30px;
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .activities-container {
    .activities-list {
      &__card {
        .card-info {
          padding: 18px 30px;
        }
      }
    }
  }
}
</style>
