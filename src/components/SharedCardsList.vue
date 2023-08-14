<template>
  <div class="shared-cards-list-container">
     <div class="shared-cards-list-container__title">
      <h2>{{ title }}</h2>
      <router-link class="view-more" to="/home/search-scenic-spot">{{ subTitle }}
        <img src="../assets/images/icon/arrow-rightR.png" alt="">
      </router-link>
     </div>
     <div class="shared-cards-list-container__list">
      <div 
      v-for="card in cardList" :key="card.id"
      class="shared-cards-list-container__list__card-wrapper">
        <div class="shared-cards-list-container__list__card-wrapper__card-img">
          <img 
          :src="card.picture.PictureUrl1 || require(`@/assets/images/icon/${emptyImageUrl}`)"
          :alt="card.picture.PictureDescription1">
        </div>
        <div class="shared-cards-list-container__list__card-wrapper__card-info">
          <span class="title">{{ card.name }}</span>
          <span class="location"><img src="../assets/images/icon/spot.png" alt="spot-icon">{{ card.city }}</span>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  props: {
    initialTitle: {
      type: String
    },
    initialSubTitle: {
      type: String
    },
    initialCardList: {
      type: Array,
    }
  },
  created() {
    this.title = this.initialTitle
    this.subTitle = this.initialSubTitle
    this.cardList = this.initialCardList
  },
  data() {
    return {
      title: "",
      subTitle: "",
      cardList: [],
      emptyImageUrl: 'noImage-255x200.png'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/extend";
.shared-cards-list-container {
  margin: 20px 0 47px;
  &__title {
    @extend %cards-list-title;
  }
  &__list {
    display: flex;
    overflow: auto;
    margin-right: -15px;
    &__card-wrapper {
      &__card-img {
        border-radius: 20px;
        width: 220px;
        height: 160px;
        overflow: hidden;
        margin: 0 16px 6px 0;
        img {
          transition: all .2s ease-out;
        }
      }
      &__card-info {
        text-align: left;
        display: flex;
        flex-direction: column;
        span.title {
          font-size: 18px;
          font-weight: 700;
          color: $sub-font-color;
          margin-bottom: 4px;
        }
        span.location {
          color: $third-font-color;
          font-weight: 400;
          img {
            width: 16px;
            height: 16px;
            margin-right: 3px;
          }
        }
      }
    }
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .shared-cards-list-container {
    &__title {
      align-items: center;
      padding: 0 15px 0;
      h2 {
        font-size: 36px;
      }
    }
    &__list {
      &__card-wrapper {
        &__card-img {
          width: 255px;
          height: 200px;
          margin: 0 30px 10px 0;
        }
        &__card-info {
          span.title {
            font-size: 22px;
            margin-bottom: 6px;
          }
        }
      }
      &__card-wrapper:hover {
        cursor: pointer;
        
          img {
            transform: scale(1.1);
          }
        
      }
    }
  }
}
</style>