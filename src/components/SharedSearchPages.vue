<template>
  <div class="shared-search-pages-container">
    <div class="index-title">
      <span>首頁</span>
      <span v-if="routeName === 'search-scenic-spot'">探索景點</span>
      <span v-else-if="routeName === 'search-activity'">節慶活動</span>
      <span v-else-if="routeName === 'search-restaurant'">品嚐美食</span>
    </div>
    <div class="input-container">
      <div class="dropdown dropdown-city">
        <input
          type="checkbox"
          name="dropdown-toggle"
          id="dropdown-city-toggle"
          ref="dropdownCityToggle"
          class="dropdown-toggle"
        />
        <div class="dropdown-value">
          <label for="dropdown-city-toggle">
            {{ cityDropdownValue }}
            <div class="arrow-down">
              <img src="../assets/images/icon/arrow-down.png" alt="" />
            </div>
            <div class="arrow-up">
              <img src="../assets/images/icon/arrow-up.png" alt="" />
            </div>
          </label>
        </div>
        <ul class="sub-dropdown sub-dropdown-city">
          <li
            v-for="city in cities"
            :key="city.id"
            @click="cityDropdownHandler(city.name)"
            class="sub-dropdown-item"
          >
            {{ city.name }}
          </li>
        </ul>
      </div>
      <div
        v-if="routeName === 'search-activity'"
        class="dropdown dropdown-date"
      >
        <date-picker
          v-model="monthDropdownValue"
          type="month"
          placeholder="選擇月份"
          value-type="format"
        ></date-picker>
      </div>
      <div class="dropdown dropdown-theme">
        <input
          type="checkbox"
          name="dropdown-toggle"
          id="dropdown-theme-toggle"
          class="dropdown-toggle"
          ref="dropdownThemeToggle"
        />
        <div class="dropdown-value">
          <label
            v-if="routeName === 'search-restaurant'"
            for="dropdown-theme-toggle"
          >
            {{ foodThemeDropdownValue }}
            <div class="arrow-down">
              <img src="../assets/images/icon/arrow-down.png" alt="" />
            </div>
            <div class="arrow-up">
              <img src="../assets/images/icon/arrow-up.png" alt="" />
            </div>
          </label>
          <label v-else for="dropdown-theme-toggle">
            {{ themeDropdownValue }}
            <div class="arrow-down">
              <img src="../assets/images/icon/arrow-down.png" alt="" />
            </div>
            <div class="arrow-up">
              <img src="../assets/images/icon/arrow-up.png" alt="" />
            </div>
          </label>
        </div>
        <ul v-if="routeName === 'search-scenic-spot'" class="sub-dropdown">
          <li
            v-for="theme in scenicTheme"
            :key="theme.id"
            @click="themeDropdownHandler(theme.name)"
            class="sub-dropdown-item"
          >
            {{ theme.name }}
          </li>
        </ul>
        <ul v-else-if="routeName === 'search-activity'" class="sub-dropdown">
          <li
            v-for="theme in activityTheme"
            :key="theme.id"
            @click="themeDropdownHandler(theme.name)"
            class="sub-dropdown-item"
          >
            {{ theme.name }}
          </li>
        </ul>
        <ul v-else-if="routeName === 'search-restaurant'" class="sub-dropdown">
          <li
            v-for="theme in foodTheme"
            :key="theme.name"
            @click="themeDropdownHandler(theme.name)"
            class="sub-dropdown-item"
          >
            {{ theme.name }}
          </li>
        </ul>
      </div>
      <div class="keyword">
        <input
          type="text"
          name="keyword"
          id="keyword"
          :placeholder="placeholderFilter"
          v-model="SearchKeyword"
        />
      </div>
      <button @click="searchHandler()" class="search-btn">
        <img src="../assets/images/icon/search.png" alt="search-button" />
        <span>搜尋</span>
      </button>
    </div>
    <div v-if="!isSearched" class="theme-container">
      <div
        v-if="routeName === 'search-restaurant'"
        class="theme-container__title"
      >
        熱門分類
      </div>
      <div v-else class="theme-container__title">熱門主題</div>
      <div
        v-if="routeName === 'search-scenic-spot'"
        class="theme-container__theme-wrapper"
      >
        <div
          v-for="theme in scenicTheme.slice(1)"
          :key="theme.id"
          class="theme-container__theme-wrapper__theme-name"
          :style="{ backgroundImage: 'url(' + themBgFilter(theme.url) + ')' }"
        >
          {{ theme.name }}
        </div>
      </div>
      <div
        v-else-if="routeName === 'search-activity'"
        class="theme-container__theme-wrapper"
      >
        <div
          v-for="theme in activityTheme.slice(1)"
          :key="theme.id"
          class="theme-container__theme-wrapper__theme-name"
          :style="{ backgroundImage: 'url(' + themBgFilter(theme.url) + ')' }"
        >
          {{ theme.name }}
        </div>
      </div>
      <div
        v-if="routeName === 'search-restaurant'"
        class="theme-container__theme-wrapper"
      >
        <div
          v-for="theme in foodTheme.slice(1)"
          :key="theme.id"
          class="theme-container__theme-wrapper__theme-name"
          :style="{ backgroundImage: 'url(' + themBgFilter(theme.url) + ')' }"
        >
          {{ theme.name }}
        </div>
      </div>
    </div>
    <div v-if="isSearched" class="result-container">
      <div class="result-container__title">
        搜尋結果
        <span class="result-counter">
          共有
          <span class="result-counter__amount">{{
            resultList.length
          }}</span>
          筆
        </span>
      </div>
      <div v-if="resultList.length === 0" class="result-container__no-result">
        <div class="no-result-img">
          <img src="../assets/images/icon/nofound80.png" alt="">
        </div>
        <p>目前查無資料</p>
        <p>請重新搜尋</p>
      </div>
      <div v-else class="result-container__result">
        <div
          v-for="card in resultList"
          :key="card.id"
          class="result-container__result__card-wrapper"
        >
          <div class="result-container__result__card-wrapper__card-img">
            <img
              :src="
                card.picture.PictureUrl1 ||
                require(`@/assets/images/icon/${emptyImageUrl}`)
              "
              :alt="card.picture.PictureDescription1 || '未提供'"
            />
          </div>
          <div class="result-container__result__card-wrapper__card-info">
            <span class="title">{{ card.name }}</span>
            <span class="location"
              ><img src="../assets/images/icon/spot.png" alt="spot-icon" />{{
                card.city
              }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "../assets/scss/datepicker.scss";
import { mapState } from 'vuex';

let dummyResultData = [
  {
    ScenicSpotID: "C1_315080500H_000073",
    ScenicSpotName: "帆船鼻大草原",
    Address: "臺東縣951綠島鄉溫泉路167號",
    Picture: {
      PictureUrl1: "https://www.eastcoast-nsa.gov.tw/image/29072/640x480",
      PictureDescription1: "鳥瞰帆船鼻大草原",
    },
    SrcUpdateTime: "2023-08-17T01:43:16+08:00",
    UpdateTime: "2023-08-17T02:22:01+08:00",
  },
  {
    ScenicSpotID: "C1_315080500H_000098",
    ScenicSpotName: "哈巴狗與睡美人岩",
    Address: "臺東縣951綠島鄉環島公路8公里處",
    Picture: {
      PictureUrl1: "https://www.eastcoast-nsa.gov.tw/image/29064/640x480",
      PictureDescription1: "哈巴狗與睡美人岩的美麗海灣",
    },
    SrcUpdateTime: "2023-08-17T01:43:16+08:00",
    UpdateTime: "2023-08-17T02:22:01+08:00",
  },
  {
    ScenicSpotID: "C1_315080500H_000167",
    ScenicSpotName: "柴口浮潛區",
    Address: "臺東縣951綠島鄉環島公路2公里處",
    Picture: {
      PictureUrl1: "https://www.eastcoast-nsa.gov.tw/image/29042/640x480",
      PictureDescription1: "柴口十分適合新手來體驗浮潛",
    },
    SrcUpdateTime: "2023-08-17T01:43:16+08:00",
    UpdateTime: "2023-08-17T02:22:01+08:00",
  },
  {
    ScenicSpotID: "C1_376540000A_000365",
    ScenicSpotName: "石朗潛水區",
    Address: "臺東縣951綠島鄉環島公路17公里處路旁",
    Picture: {},
    SrcUpdateTime: "2023-08-17T01:43:16+08:00",
    UpdateTime: "2023-08-17T02:22:01+08:00",
  },
];

export default {
  components: {
    DatePicker,
  },
  props: {
    initialRouteName: {
      type: String,
    },
    initialSearchKeyword: {
      type: String
    },
    initialResultList: {
      type: Array
    }
  },
  created() {
    this.routeName = this.initialRouteName;
    if(this.initialSearchKeyword && this.initialResultList) {
      this.resultList = this.initialResultList
      this.SearchKeyword = this.initialSearchKeyword
      this.isSearched = true
    } 
  },
  data() {
    return {
      routeName: "",
      cityDropdownValue: "全部縣市",
      themeDropdownValue: "全部主題",
      monthDropdownValue: null,
      foodThemeDropdownValue: "全部分類",
      SearchKeyword: "",
      scenicTheme: [
        {
          id: 0,
          name: "全部主題",
          url: "",
        },
        {
          id: 1,
          name: "自然風景類",
          url: "theme-scene-bg-1.png",
        },
        {
          id: 2,
          name: "觀光工廠類",
          url: "theme-scene-bg-2.png",
        },
        {
          id: 3,
          name: "遊憩類",
          url: "theme-scene-bg-3.png",
        },
        {
          id: 4,
          name: "休閒農業類",
          url: "theme-scene-bg-4.png",
        },
        {
          id: 5,
          name: "生態類",
          url: "theme-scene-bg-5.png",
        },
        {
          id: 6,
          name: "溫泉類",
          url: "theme-scene-bg-6.png",
        },
        {
          id: 7,
          name: "古蹟類",
          url: "theme-scene-bg-7.png",
        },
      ],
      activityTheme: [
        {
          id: 0,
          name: "全部主題",
          url: "",
        },
        {
          id: 1,
          name: "節慶活動",
          url: "theme-event-bg-1.png",
        },
        {
          id: 2,
          name: "自行車活動",
          url: "theme-event-bg-2.png",
        },
        {
          id: 3,
          name: "遊憩活動",
          url: "theme-event-bg-3.png",
        },
        {
          id: 4,
          name: "產業文化活動",
          url: "theme-event-bg-4.png",
        },
        {
          id: 5,
          name: "年度活動",
          url: "theme-event-bg-5.png",
        },
        {
          id: 6,
          name: "四季活動",
          url: "theme-event-bg-6.png",
        },
      ],
      foodTheme: [
        {
          id: 0,
          name: "全部分類",
          url: "",
        },
        {
          id: 1,
          name: "地方特產",
          url: "theme-food-bg-1.png",
        },
        {
          id: 2,
          name: "中式美食",
          url: "theme-food-bg-2.png",
        },
        {
          id: 3,
          name: "甜點冰品",
          url: "theme-food-bg-3.png",
        },
        {
          id: 4,
          name: "異國料理",
          url: "theme-food-bg-4.png",
        },
        {
          id: 5,
          name: "伴手禮",
          url: "theme-food-bg-5.png",
        },
        {
          id: 6,
          name: "素食",
          url: "theme-food-bg-6.png",
        },
      ],
      resultList: [],
      emptyImageUrl: "noImage-255x200.png",
      isSearched: false,
    };
  },
  methods: {
    cityDropdownHandler(cityName) {
      this.$refs.dropdownCityToggle.checked = false;
      this.cityDropdownValue = cityName;
    },
    themeDropdownHandler(theme) {
      this.$refs.dropdownThemeToggle.checked = false;
      if (this.routeName === "search-restaurant") {
        this.foodThemeDropdownValue = theme;
      } else {
        this.themeDropdownValue = theme;
      }
    },
    searchHandler() {
      let keyword = this.SearchKeyword.trim();
      let theme = "";
      if (!keyword) {
        this.SearchKeyword = "";
        return;
      }
      if (this.routeName === "search-restaurant") {
        theme = this.foodThemeDropdownValue;
      } else if (
        this.routeName === "search-scenic-spot" ||
        this.routeName === "search-activity"
      ) {
        theme = this.themeDropdownValue;
      }
      if (this.routeName === "search-activity") {
        if (!this.monthDropdownValue) {
          this.monthDropdownValue = "選擇月份";
          console.log(
            `城市: ${this.cityDropdownValue}, 類別: ${theme}, 年月份: ${this.monthDropdownValue}, 關鍵字: ${keyword}`
          );
          this.fetchResultList();
        } else {
          let dateValue = this.monthDropdownValue.split("-");
          let year = dateValue[0];
          let month = dateValue[1];

          console.log(
            `城市: ${this.cityDropdownValue}, 類別: ${theme}, 年月份: ${year} 年 ${month}, 關鍵字: ${keyword}`
          );
          this.fetchResultList();
        }
      } else {
        console.log(
          "城市: " + this.cityDropdownValue + ", 類別: " + theme,
          ", 關鍵字: " + keyword
        );
        this.fetchResultList();
      }
      this.SearchKeyword = "";
    },
    themBgFilter(bgUrl) {
      return require(`@/assets/images/pic/${bgUrl}`);
    },
    //記得拆分景點、活動、餐廳的fetch methods
    fetchResultList() {
      this.resultList = dummyResultData.map((result) => ({
        id: result.ScenicSpotID,
        name: result.ScenicSpotName,
        city: result.City ? result.City : "未提供",
        picture: result.Picture,
      }));
    },
  },
  computed: {
    ...mapState(['cities']),
    placeholderFilter() {
      let placeholder = "";
      if (this.routeName === "search-scenic-spot") {
        placeholder = "你想去哪裡？請輸入關鍵字";
      } else if (this.routeName === "search-activity") {
        placeholder = "想找有趣的？請輸入關鍵字";
      } else if (this.routeName === "search-restaurant") {
        placeholder = "你想吃什麼？請輸入關鍵字";
      }
      return placeholder;
    },
  },
  watch: {
    initialRouteName(newValue) {
      this.routeName = newValue;
      this.resultList = [];
      this.SearchKeyword = '';
      this.isSearched = false
    },
    // initialSearchKeyword(newValue) {
    //   this.SearchKeyword = newValue;
    // },
    initialResultList(newValue) {
      if(newValue.length > 0 ) {
        this.SearchKeyword = '';
      } 
      this.resultList = newValue;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/extend";

.shared-search-pages-container {
  text-align: left;
  .index-title {
    @extend %index-title;
  }
  .input-container {
    margin: 16px 0 24px;
    .dropdown {
      @extend %search-section-form-style;
      margin: 0 auto;
      position: relative;
      input.dropdown-toggle {
        display: none;
      }
      input.dropdown-toggle:checked ~ .dropdown-value {
        label {
          .arrow-down {
            display: none;
          }
          .arrow-up {
            display: block;
          }
        }
      }
      input.dropdown-toggle:checked ~ ul.sub-dropdown {
        transform: scale(1, 1);
      }
      .dropdown-value {
        position: relative;
        text-align: left;
        label {
          width: 345px;
          height: 50px;
          padding: 11px 0 11px 30px;
          color: $main-color;
          font-weight: 500;
          cursor: pointer;
          .arrow-down,
          .arrow-up {
            position: absolute;
            top: calc(50% - 8px);
            right: 20px;
            width: 16px;
            height: 16px;
            img {
              display: block;
            }
          }
          .arrow-up {
            display: none;
          }
        }
      }
      ul.sub-dropdown {
        position: absolute;
        top: calc(100% + 7px);
        left: -1px;
        z-index: 1;
        width: 345px;
        max-height: 250px;
        overflow: auto;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        margin: 0 auto;
        transform: scale(1, 0);
        transform-origin: top;
        transition: transform 0.2s ease-out;
        color: $third-font-color;
        background: #ffffff;
        text-align: left;
        line-height: 28px;
        cursor: pointer;
        li.sub-dropdown-item {
          padding: 10px 0 11px 30px;
          &:hover {
            background: #7f977b33;
          }
        }
        li.sub-dropdown-item:not(:last-child) {
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
    .dropdown-city,
    .dropdown-date {
      margin-bottom: 7px;
    }
    .dropdown-date {
      border: unset;
    }
    .keyword {
      width: 345px;
      margin: 7px auto;
      input {
        @extend %search-section-form-style;
        background: #f9f9f9;
        padding: 11px 0 11px 30px;
        &::placeholder {
          color: $placeholder-color;
          font-weight: 400;
        }
        &:focus {
          outline: none !important;
          border: 1px solid #e6e6e6;
          box-shadow: 0 0 6px $main-light;
        }
      }
    }
    button.search-btn {
      @extend %search-section-form-style;
      display: block;
      margin: 0 auto;
      border: 0;
      background: $main-color;
      letter-spacing: 31px;
      text-indent: 31px;
      img {
        width: 17px;
        height: 17px;
        object-fit: contain;
        object-position: bottom;
      }
      span {
        color: #ffffff;
        font-weight: 700;
        margin-left: 1rem;
      }
      &:hover {
        background: $third-color;
      }
    }
  }
  .theme-container {
    &__title {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 0.72px;
      margin-bottom: 16px;
    }
    &__theme-wrapper {
      display: flex;
      flex-wrap: wrap;
      column-gap: 15px;
      row-gap: 12px;
      margin-bottom: 60px;
      &__theme-name {
        width: 165px;
        height: 80px;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 16px;
        color: #fff;
        font-weight: 700;
        letter-spacing: 0.48px;
        text-align: center;
        line-height: 80px;
      }
    }
  }
  .result-container {
    &__title {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 0.72px;
      margin-bottom: 8px;
      span.result-counter {
        color: $third-font-color;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.42px;
        &__amount {
          color: $hash-tag;
        }
      }
    }
    &__result {
      margin-bottom: 180px;
      &__card-wrapper {
        margin-bottom: 21px;
        &__card-img {
          width: 345px;
          height: 160px;
          border-radius: 20px;
          overflow: hidden;
        }
        &__card-info {
          text-align: left;
          display: flex;
          flex-direction: column;
          span.title {
            font-size: 18px;
            font-weight: 700;
            color: $sub-font-color;
            letter-spacing: 0.54px;
            margin: 6px 0;
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
    &__no-result {
      text-align: center;
      margin-bottom: 67px;
      .no-result-img {
        width: 80px;
        height: 80px;
        margin: 64px auto 11px;
      }
      p {
        color: $main-color;
        font-size: 20px;
        font-weight: 700;
        line-height: 34px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .shared-search-pages-container {
    .index-title {
      font-size: 16px;
      line-height: 28px;
      padding-left: 5px;
    }
    .input-container {
      margin: 40px 0 60px;
      padding: 0 15px;
      display: flex;
      column-gap: 15px;
      .dropdown {
        width: unset;
        margin: unset;
        flex: 1;
        .dropdown-value {
          label {
            width: 100%;
          }
        }
      }
      .dropdown-date {
        .mx-datepicker {
          width: unset;
        }
      }
      .keyword {
        margin: unset;
        flex-basis: 30%;
        input {
          width: 100%;
        }
      }
      button.search-btn {
        width: unset;
      }
    }
    .theme-container {
      &__title {
        font-size: 36px;
        letter-spacing: 1.08px;
        margin-bottom: 12px;
      }
      &__theme-wrapper {
        column-gap: 30px;
        margin-bottom: 120px;
        &__theme-name {
          width: 255px;
          height: 124px;
          border-radius: 24px;
          font-size: 24px;
          letter-spacing: 0.72px;
          line-height: 124px;
        }
      }
    }
    .result-container {
      &__title {
        font-size: 36px;
        letter-spacing: 1.08px;
        margin-bottom: 12px;
        span.result-counter {
          font-size: 18px;
          letter-spacing: 0.54px;
        }
      }
      &__result {
        margin-bottom: 250px;
        display: flex;
        flex-wrap: wrap;
        row-gap: 36px;
        column-gap: 30px;
        &__card-wrapper {
          margin: unset;
          &__card-img {
            width: 255px;
            height: 200px;
          }
          &__card-info {
            span.title {
              font-size: 22px;
              letter-spacing: 0.66px;
              margin-top: 10px;
            }
          }
        }
      }
      &__no-result {
        margin-bottom: 130px;
        .no-result-img {
          margin-top: 80px;
        }
      }
    }
  }
}
</style>
