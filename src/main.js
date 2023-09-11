import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";



Vue.config.productionTip = false

let imageIsExist = function (url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = function () {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    }
    img.onerror = function() {
      resolve(false);
      img = null;
    }
    img.src = url
  })
}

Vue.directive('default-img', async function (el, binding) {
  let defaultImg =
    require("@/assets/images/icon/noImage-255x200.png");
  let newLoadImg = binding.value;
  
  if (newLoadImg) {
    let exist = await imageIsExist(newLoadImg);
    if (exist) {
      el.setAttribute('src', newLoadImg)
    } else {
      el.setAttribute("src", defaultImg);
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Toast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
});