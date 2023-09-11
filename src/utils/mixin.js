export const mixinFilter = {
  filters: {
    formatTime(date) {
      const moment = require("moment");
      let newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
      return newDate;
    },
  },
};

export const mixinResize = {
  mounted() {
    window.addEventListener("resize", this.getDimensions);
  },
  unmounted() {
    window.removeEventListener("resize", this.getDimensions);
  },
  created() {
    this.getDimensions();
  },
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      nearByTitle: "還有這些不能錯過的景點",
      nearBySubTitle: "更多景點",
    };
  },
  methods: {
    getDimensions() {
      this.screenWidth = document.documentElement.clientWidth;

      if(this.screenWidth < 768) {
        this.nearByTitle = "還有這些不能錯過";
        if(this.$route.name === "scenic-spot") {
          this.nearBySubTitle = "查看更多景點";
        } else if (this.$route.name === "activity") {
          this.nearBySubTitle = "查看更多活動";
        } else {
          this.nearBySubTitle = "查看更多美食";
        }
      } else {
        if (this.$route.name === "scenic-spot") {
          this.nearByTitle = "還有這些不能錯過的景點";
          this.nearBySubTitle = this.scenicSpot
            .city ? `更多${this.scenicSpot.city}景點` : "更多景點";
        } else if (this.$route.name === "activity") {
          this.nearByTitle = "還有這些不能錯過的活動";
          this.nearBySubTitle = this.activity.city
            ? `更多${this.activity.city}活動` : "更多活動";
        } else {
          this.nearByTitle = "還有這些不能錯過的美食";
          this.nearBySubTitle = this.restaurant.city
            ? `更多${this.restaurant.city}美食`
            : "更多美食";
        }
      }
    },
  },
};
