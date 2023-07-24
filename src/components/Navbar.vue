<template>
  <nav class="nav-container">
    <input ref="hamburger" type="checkbox" id="nav-toggle" class="nav-toggle d-none">
    <div class="logo-wrapper">
      <div class="logo-wrapper__logo-mobile">
        <router-link to="/">
          <img src="../assets/images/icon/logo-mobile.png" alt="logo">
        </router-link>
      </div>
      <div class="logo-wrapper__logo-desktop">
        <router-link to="/">
          <img src="../assets/images/icon/logo-desktop.png" alt="logo">
        </router-link>
      </div>
    </div>
    <div class="hamburger-wrapper" >
      <label for="nav-toggle" class="nav-toggle-label">
        <div class="hamburger"></div>
      </label>
    </div>
    <div class="nav-list-container">
      <div class="nav-list-container__logo-mobile">
        <router-link to="/">
          <img src="../assets/images/icon/logo-mobile.png" alt="logo">
        </router-link>
      </div>
      <ul class="nav-list-container__nav-list">
        <li class="nav-list-container__nav-list__nav-item">
          <router-link to="/home/search-scenic-spot">探索景點</router-link>
        </li>
        <li class="nav-list-container__nav-list__nav-item">
          <router-link to="/home/search-activity">節慶活動</router-link>
        </li>
        <li class="nav-list-container__nav-list__nav-item">
          <router-link to="/home/search-restaurant">品嚐美食</router-link>
        </li>
      </ul>
    </div>
    <div class="bg-filter"></div>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$refs.hamburger.addEventListener('change', this.hiddenBg)
  },
  beforeDestroy() {
    this.$refs.hamburger.removeEventListener('change', this.hiddenBg)
  },
  methods: {
    hiddenBg() {
      if(this.$refs.hamburger.checked) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  text-align: center;
  height: 64px;
  width: 100%;
  min-width: 375px;
  padding: 21px 0;
  background-color: #FFFFFF;
  .logo-wrapper {
    width: 118px;
    height: 30px;
    margin: 0 auto;
    &__logo-desktop {
      display: none;
    }
  }
  .nav-toggle:checked ~ .logo-wrapper {
    display: none;
  }
  .nav-toggle:checked ~ .bg-filter {
    width: 100%;
    height: 100vh;
    opacity: 1;
    transition: opacity .2s ease-out .15s;
  }
  .nav-toggle:checked ~ .hamburger-wrapper {
    .nav-toggle-label {
      .hamburger {
        width: 50px;
        height: 50px;
        background-image: url('../assets/images/icon/hamburger-close.png');
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
  .nav-toggle:checked ~ .nav-list-container {
    transform: scale(1, 1);
    transition: transform .2s ease-out .15s;
    .nav-list-container__logo-mobile,
    .nav-list-container__nav-list {
      opacity: 1;
      transition: opacity 1s ease-out .15s;
    }
  }
  .hamburger-wrapper {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 99;
    width: 50px;
    height: 50px;
    .nav-toggle-label {
      .hamburger {
        width: 50px;
        height: 50px;
        background-image: url('../assets/images/icon/hamburger.png');
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
  }
  .nav-list-container {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 8;
    background-color: #FFFFFF;
    border-bottom-left-radius: 30px;
    width: 276px;
    height: 330px;
    padding: 0 8px 32px;
    transform: scale(0, 1);
    transform-origin: right;
    transition: transform .2s ease-out;
    &__logo-mobile {
      padding: 17px 0 20px 30px;
      opacity: 0;
      transition: opacity .1s ease-out;
      text-align: left;
      img {
        width: 118px;
        height: 30px;
      }
    }
    &__nav-list {
      opacity: 0;
      transition: opacity .1s ease-out;
      li:nth-child(2) {
        border-top: 1px solid #E5E5E5;
        border-bottom: 1px solid #E5E5E5;
      } 
      &__nav-item {
        padding: 24px 0;
        font-size: 20px;
        font-weight: 400;
      }
    }
    a {
      color: $third-font-color;
    }
  }
  .bg-filter {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    backdrop-filter: blur(2px);
    opacity: 0;
    transition: opacity .2s;
  }
}

// Medium devices , > 768px
@media screen and (min-width: 768px) {
  .nav-container {
    height: 80px;
    max-width: 1200px;
    padding: 27px 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #E5E5E5;
    .logo-wrapper {
      width: 240px;
      height: 32px;
      margin: 0;
      &__logo-mobile {
        display: none;
      }
      &__logo-desktop {
        display: block;
      }
    }
    .hamburger-wrapper {
      display: none;
    }
    .nav-list-container {
      all: unset;
      &__logo-mobile { 
        display: none;
      }
      &__nav-list {
        opacity: 1;
        display: flex;
        li:nth-child(2) {
          border: 0;
          margin: 0 20px;
        }
        &__nav-item {
          padding: 0;
          font-size: 18px;
          a.router-link-exact-active {
            color: $main-color;
          }
          a:hover {
            color: $main-color;
            text-decoration: underline $highlight;
            text-underline-offset: 8px;
            text-decoration-thickness: 2px;
          }
        }
      }
    }
  }
}

</style>