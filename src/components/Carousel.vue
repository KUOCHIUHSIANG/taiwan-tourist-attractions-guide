<template>
  <div class="carousel-container">
    <div
      id="scenic-spot-carousel"
      class="carousel slide scenic-spot-carousel"
      data-bs-interval="false"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#scenic-spot-carousel"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
          ref="indicatorPrev"
          @click="btnPrevDisable()"
        ></button>
        <button
          type="button"
          data-bs-target="#scenic-spot-carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          @click="btnReset()"
        ></button>
        <button
          type="button"
          data-bs-target="#scenic-spot-carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          @click="btnReset()"
        ></button>
        <button
          type="button"
          data-bs-target="#scenic-spot-carousel"
          data-bs-slide-to="3"
          aria-label="Slide 4"
          @click="btnReset()"
        ></button>
        <button
          type="button"
          data-bs-target="#scenic-spot-carousel"
          data-bs-slide-to="4"
          aria-label="Slide 5"
          @click="btnReset()"
        ></button>
        <button
          type="button"
          data-bs-target="#scenic-spot-carousel"
          data-bs-slide-to="5"
          aria-label="Slide 6"
          ref="indicatorNext"
          @click="btnNextDisable()"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="(card, index) in cardList"
          :key="card.id"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <img
            v-if="
              card.picture.PictureUrl1 ||
              card.picture.PictureUrl2 ||
              card.picture.PictureUrl3
            "
            v-default-img="
              card.picture.PictureUrl1 ||
              card.picture.PictureUrl2 ||
              card.picture.PictureUrl3
            "
            class="d-block w-100"
            :alt="card.picture.PictureDescription1"
          />
          <img
            v-else
            :src="require(`@/assets/images/icon/${emptyImageUrl}`)"
            class="d-block w-100"
            alt="未提供"
          />
          <div class="carousel-caption">
            <span>{{ card.city }} ｜ {{ card.name }}</span>
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
      <button
        @click="btnPrevDisable()"
        :class="{ disabled: btnPrev }"
        class="carousel-control-prev d-none d-md-block"
        type="button"
        data-bs-target="#scenic-spot-carousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        @click="btnNextDisable()"
        :class="{ disabled: btnNext }"
        class="carousel-control-next d-none d-md-block"
        type="button"
        data-bs-target="#scenic-spot-carousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "../assets/css/vue-loading.css";

export default {
  components: {
    Loading,
  },
  props: {
    initialCardList: {
      type: Array,
    },
  },
  data() {
    return {
      cardList: [],
      btnPrev: true,
      btnNext: false,
      emptyImageUrl: "noImage-255x200.png",
      isLoading: true,
      fullPage: false,
    };
  },
  methods: {
    btnPrevDisable() {
      this.btnNext = false;
      let prev = this.$refs.indicatorPrev.classList.contains("active");
      if (prev) {
        this.btnPrev = true;
      } else {
        this.btnPrev = false;
      }
    },
    btnNextDisable() {
      this.btnPrev = false;
      let next = this.$refs.indicatorNext.classList.contains("active");
      if (next) {
        this.btnNext = true;
      } else {
        this.btnNext = false;
      }
    },
    btnReset() {
      this.btnPrev = false;
      this.btnNext = false;
    },
  },
  watch: {
    initialCardList(newValue) {
      this.cardList = newValue;
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-container {
  margin: 38px 0 24px;
  .scenic-spot-carousel {
    width: 345px;
    margin: 0 auto;
    .carousel-indicators {
      margin: 0;
      align-items: center;
      justify-content: flex-end;
      padding: 0 21px 10px 0;
      button {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #c4c4c4;
        opacity: unset;
        &.active {
          width: 10px;
          height: 10px;
          background-color: #ffffff;
        }
      }
    }
    .carousel-inner {
      border-radius: 16px;
      width: 345px;
      height: 185px;
      margin: 0 auto;
      .carousel-item {
        height: 100%;
        img {
          filter: brightness(85%);
        }
        .carousel-caption {
          padding: 0;
          top: 45%;
          bottom: unset;
          font-weight: 700;
        }
      }
    }
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .carousel-container {
    margin: 36px 0;
    .scenic-spot-carousel {
      width: 100%;
      .carousel-indicators {
        padding: 0 40px 25px 0;
        button {
          width: 16px;
          height: 16px;
          margin-right: 7px;
          margin-left: 7px;
          &.active {
            width: 20px;
            height: 20px;
          }
        }
      }
      .carousel-inner {
        border-radius: 24px;
        width: 100%;
        height: 400px;
        .carousel-item {
          .carousel-caption {
            font-size: 28px;
          }
        }
      }
      button {
        opacity: unset;
        .carousel-control-next-icon {
          background-image: url("../assets/images/icon/carousel-arrow-right.png");
        }
        .carousel-control-prev-icon {
          background-image: url("../assets/images/icon/carousel-arrow-left.png");
        }
        .carousel-control-next-icon,
        .carousel-control-prev-icon {
          width: 40px;
          height: 40px;
        }
        &:hover {
          .carousel-control-next-icon {
            background-image: url("../assets/images/icon/carousel-arrow-right-hover.png");
          }
          .carousel-control-prev-icon {
            background-image: url("../assets/images/icon/carousel-arrow-left-hover.png");
          }
        }
        &.disabled {
          pointer-events: none;
          .carousel-control-next-icon {
            background-image: url("../assets/images/icon/carousel-arrow-right-disable.png");
          }
          .carousel-control-prev-icon {
            background-image: url("../assets/images/icon/carousel-arrow-left-disable.png");
          }
        }
      }
    }
  }
}
</style>
