import Vue from 'vue'
import Vuex from 'vuex'
import authorizationAPI from "../api/authorization";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cities: [
      {
        id: 0,
        name: "全部縣市",
        engName: "all",
      },
      {
        id: 1,
        name: "臺北市",
        engName: "Taipei",
      },
      {
        id: 2,
        name: "新北市",
        engName: "NewTaipei",
      },
      {
        id: 3,
        name: "基隆市",
        engName: "Keelung",
      },
      {
        id: 4,
        name: "宜蘭縣",
        engName: "YilanCounty",
      },
      {
        id: 5,
        name: "桃園市",
        engName: "Taoyuan",
      },
      {
        id: 6,
        name: "新竹縣",
        engName: "HsinchuCounty",
      },
      {
        id: 7,
        name: "新竹市",
        engName: "Hsinchu",
      },
      {
        id: 8,
        name: "苗栗縣",
        engName: "MiaoliCounty",
      },
      {
        id: 9,
        name: "臺中市",
        engName: "Taichung",
      },
      {
        id: 10,
        name: "彰化縣",
        engName: "ChanghuaCounty",
      },
      {
        id: 11,
        name: "南投縣",
        engName: "NantouCounty",
      },
      {
        id: 12,
        name: "雲林縣",
        engName: "YunlinCounty",
      },
      {
        id: 13,
        name: "嘉義縣",
        engName: "ChiayiCounty",
      },
      {
        id: 14,
        name: "嘉義市",
        engName: "Chiayi",
      },
      {
        id: 15,
        name: "臺南市",
        engName: "Tainan",
      },
      {
        id: 16,
        name: "高雄市",
        engName: "Kaohsiung",
      },
      {
        id: 17,
        name: "屏東縣",
        engName: "PingtungCounty",
      },
      {
        id: 18,
        name: "花蓮縣",
        engName: "HualienCounty",
      },
      {
        id: 19,
        name: "臺東縣",
        engName: "TaitungCounty",
      },
      {
        id: 20,
        name: "澎湖縣",
        engName: "PenghuCounty",
      },
      {
        id: 21,
        name: "金門縣",
        engName: "KinmenCounty",
      },
      {
        id: 22,
        name: "連江縣",
        engName: "LienchiangCounty",
      },
    ],
    screenWidth: document.documentElement.clientWidth,
  },
  mutations: {},
  actions: {
    async getToken() {
      try {
        const { data } = await authorizationAPI.getApiToken();

        localStorage.setItem("access-token", data.access_token);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
