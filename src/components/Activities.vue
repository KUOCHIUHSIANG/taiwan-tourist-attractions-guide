<template>
  <div class="activities-container">
    <div class="activities-title">
      <h2>近期活動</h2>
      <router-link class="view-more" to="/home/search-scenic-spot">查看更多活動
        <img src="../assets/images/icon/arrow-rightR.png" alt="">
      </router-link>
    </div>
    <div class="activities-list">
      <div v-for="(card, index) in cards" :key="card.id"
        class="activities-list__card">
        <div class="card-img">
          <img src="https://www.taiwan.net.tw/att/event/32664653-b656-4e7f-bb6d-ed1b726fa3b9.jpg" alt="萬人泳渡盛況">
        </div>
        <div class="card-info">
          <div class="card-info__title">
            <span class="date-range">{{ card.date }}</span>
            <p class="title">
              {{ cardTitleFilter[index] }}
            </p>
          </div>
          <div class="card-info__location">
            <p class="location">
              <img src="../assets/images/icon/spot.png" alt="spot-icon">
              新北市
            </p>
            <p class="more-info">
              詳細介紹
              <img src="../assets/images/icon/arrow-rightG.png" alt="">
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.cardTitleFilter
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions)
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions)
  },
  data() {
    return {
      cards: [
        { 
          id: "0",
          date:"2021/10/30 - 2021/11/13",
          title: '2021 日月潭花火音樂嘉年華'
        },
        {
          id: "1",
          date:"2022/05/25 - 2022/06/20",
          title: '202 花火音樂嘉年華（字數限制）'
        },
        {
          id: "2",
          date:"2023/01/30 - 2023/03/17",
          title: '2023 日月澎湖金門媽祖音樂伽年華（字數限制）舞六七八九'
        },
        {
          id: "3",
          date:"2024/01/30 - 2024/03/17",
          title: '2024 韓國釜山金門媽祖音樂伽年華（字數限制）舞六七八九'
        },
      ],
      screenWidth: document.documentElement.clientWidth
    };
  },
  methods: {
    getDimensions() {
      this.screenWidth = document.documentElement.clientWidth
    }
  },
  computed: {
    cardTitleFilter() {
      // 字數超過28要改成... >28
      // 字數超過15要改成... >15
      return this.cards.map((card) => {
        if(this.screenWidth < 768 && card.title.length > 15) {
          let newTitle = card.title.slice(0,14) + "..."
          console.log(newTitle + "...")
          return newTitle
        } else if (this.screenWidth >= 768 && card.title.length > 28) {
          let newTitle = card.title.slice(0,27) + "..."
          console.log(newTitle + "...")
          return newTitle
        } else {
          return card.title
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/extend";

.activities-container {
  margin: 0 15px 0;
  .activities-title {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 auto 10px;
    padding: 0 4px;
    max-width: 400px;
    h2 {
      font-size: 24px;
      font-weight: 300;
    }
    a.view-more {
      @extend %view-more-style;
      img {
        width: 16px;
        height: 15px;
      }
    }

  }
  .activities-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__card {
      min-width: 345px;
      margin-bottom: 1rem;
      border-radius: 8px;
      display: flex;
      .card-img {
        width: 90px;
        height: 62px;
        border: 1px solid #E5E5E5;
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
          p.location > img, p.more-info {
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
  margin: 0 60px 0;
  .activities-title {
    max-width: 1100px;
    align-items: center;
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
      border: 1px solid #E5E5E5;
      background-color: #F9F9F9;
      .card-img {
        min-width: 160px;
        height: 160px;
        border: 0;
        border-right: 1px solid #E5E5E5;
        border-radius: 12px 0 0 12px;
        img {
          transition: all .2s ease-out;
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
          p.location > img, p.more-info {
            display: block;
          }
          p.location > img, p.more-info > img {
            height: 16px;
            width: 16px;
          }
          p.location, p.more-info {
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
      cursor: pointer;
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