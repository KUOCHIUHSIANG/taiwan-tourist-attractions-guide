<template>
  <div class="search-section-container">
    <div class="left-wrapper">
      <p class="search-main-title">
        探索<span class="highlight">台灣之美</span>
      </p>
      <p class="search-main-title">讓我們更親近這片土地</p>
      <p class="search-sub-title">
        <img src="../assets/images/icon/spot-solid.png" alt="spot-icon">
        台灣旅遊景點導覽<span>Taiwan Travel Guide</span>
      </p>
    </div>
    <div class="right-wrapper">
      <div class="dropdown">
        <input type="checkbox" name="dropdown-toggle" id="dropdown-toggle"
        ref="dropdownToggle"
        class="dropdown-toggle" >
        <div class="dropdown-value">
          <label for="dropdown-toggle">
            {{ dropdownValue }}
            <div class="arrow-down">
              <img src="../assets/images/icon/arrow-down.png" alt="">
            </div>
            <div class="arrow-up">
              <img src="../assets/images/icon/arrow-up.png" alt="">
            </div>
          </label> 
        </div>
        <ul class="sub-dropdown">
          <li v-for="(option, index) in dropdownOptions"
          :key="index"
          @click="dropdownHandler(option)"
          class="sub-dropdown-item">{{ option }}</li>
        </ul>
      </div>
      <div class="keyword">
        <input type="text" name="keyword" id="keyword" placeholder="你想去哪裡？請輸入關鍵字"
        v-model.trim="SearchKeyword"
        @keypress.enter="searchHandler()"
        >
      </div>
      <button
        @click="searchHandler()"
        class="search-btn">
        <img src="../assets/images/icon/search.png" alt="search-button">
        <span>搜尋</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownValue: "探索景點",
      dropdownOptions: [
        "探索景點",
        "節慶活動",
        "品嚐美食"
      ],
      SearchKeyword: ""
    }
  },
  methods: {
    dropdownHandler(option) {
      this.$refs.dropdownToggle.checked = false
      this.dropdownValue = option
    },
    searchHandler() {
      let keyword = this.SearchKeyword
      if (!keyword) {
        this.$toast.warning("請輸入關鍵字!", {
          timeout: 1500
        })
        this.SearchKeyword = ''
        return
      } else {
        if(this.dropdownValue === '探索景點') {
          this.$router.push({ name: "search-scenic-spot", query: { keyword } })
        } else if (this.dropdownValue === '節慶活動') {
          this.$router.push({ name: "search-activity", query: { keyword } })
        } else {
          this.$router.push({ name: "search-restaurant", query: { keyword } })
        }
        this.SearchKeyword = ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/extend";

.search-section-container {
  .left-wrapper {
    letter-spacing: .03em;
    p.search-main-title {
      color: $main-font-color;
      font-size: 28px;
      font-weight: 300;
      line-height: 40.54px;
      span.highlight {
        position: relative;
      }
      span.highlight::after {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        content: ' ';
        width: 112px;
        border-bottom: 2px solid $highlight;
        border-radius: 10px;
      }
    }
    p.search-sub-title {
      color: $third-font-color;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin: 14px 0 35px;
      img {
        width: 15px;
        height: 18px;
        vertical-align: sub;
      }
      span {
        font-family: "Playfair Display", sans-serif;
        font-size: 12px;
        font-weight: 700;
        margin-left: 4px;
      }
    }
  }
  .right-wrapper {
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
          .arrow-down, .arrow-up {
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
        height: 150px;
        border: 1px solid #E5E5E5;
        border-radius: 6px;
        margin: 0 auto;
        transform: scale(1, 0);
        transform-origin: top;
        transition: transform 0.2s ease-out;
        color: $sub-font-color;
        background: #FFFFFF;
        text-align: left;
        line-height: 28px;
        cursor: pointer;
        li.sub-dropdown-item {
          padding: 10px 0 11px 30px;
          &:hover {
            background:  #7f977b33;
          }
        }
        li.sub-dropdown-item:nth-child(2) {
          border-top: 1px solid #E5E5E5;
          border-bottom: 1px solid #E5E5E5;
        }
      }
    }
    .keyword {
      margin: 7px 0;
      input {
        @extend %search-section-form-style;
        background: #F9F9F9;
        padding: 11px 0 11px 30px;
        &::placeholder {
          color: $placeholder-color;
          font-weight: 400;
        }
        &:focus {
          outline: none !important;
          border: 1px solid #E6E6E6;
          box-shadow: 0 0 6px $main-light;
        }
      }
    }
    button.search-btn {
      @extend %search-section-form-style;
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
        color: #FFFFFF;
        font-weight: 700;
        margin-left: 1rem;
      }
      &:hover {
        background: $third-color;
      }
    }
  }
}
// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .search-section-container {
    .left-wrapper {
      p.search-main-title {
        font-size: 48px;
        line-height: 69.5px;
        span.highlight::after {
          left: 8px;
          width: 187px;
        }
      }
      p.search-sub-title {
        font-size: 20px;
        line-height: 28.96px;
        img {
          vertical-align: baseline;
        }
        span {
          font-size: 18px;
          margin-left: 8px;
        }
      }
    }
  }
}

@media screen and (min-width: 803px) {
  .search-section-container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    .left-wrapper {
      margin-right: 77px;
    }
  }
}
</style>