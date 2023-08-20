<template>
  <div class="home-container">
    <SearchSection />
    <Carousel />
    <Activities :initial-recent-activities="recentActivities" />
    <SharedCardsList :initial-card-list="popularScenicSpots"
    :initial-title="popularScenicSpotsTitle"
    :initial-sub-title="popularScenicSpotsSubTitle"/>
    <SharedCardsList :initial-card-list="popularRestaurants"
    :initial-title="popularRestaurantsTitle"
    :initial-sub-title="popularRestaurantsSubTitle"/>
  </div>
</template>

<script>
import SearchSection from '../components/SearchSection.vue';
import Carousel from '../components/Carousel.vue';
import Activities from '../components/Activities.vue';
import SharedCardsList from '../components/SharedCardsList.vue';


// 近期活動考慮抓取當月活動並且結束日期要大於今日
let dummyRecentActivities = [
  {
    ActivityID: "C2_315080000H_081030",
    ActivityName: "東石海之夏",
    StartTime: "2023-08-01T00:00:00+08:00",
    EndTime: "2023-08-14T00:00:00+08:00",
    Picture: {
        PictureUrl1: "https://www.taiwan.net.tw/att/event/8bac3a16-9584-42c3-ac42-c975cb357cd3.jpg",
        PictureDescription1: "「東石海之夏」夏夜濱海煙火表演，結合聲光音樂共同匯演，絢麗煙火吸引大批觀賞人潮",
        PictureUrl2: "https://www.taiwan.net.tw/att/event/5c334a8c-edbf-4b7a-a610-d2e9bf02d766.jpg",
        PictureDescription2: "「東石海之夏」流行音樂演唱會，邀請熱門音樂歌手或樂團表演，吸引大批年輕族群參加，享受夏夜音樂搖滾",
        PictureUrl3: "https://www.taiwan.net.tw/att/event/e5fa120b-3625-4390-bf08-a8755b17178a.jpg",
        PictureDescription3: "「東石海之夏」為本縣暑期濱海觀光指標性活動，以夏季海洋觀光為主題，每年暑假都吸引眾多親子戲水及青少年玩樂打卡旅遊人潮"
    },
    City: "嘉義縣",
    SrcUpdateTime: "2023-08-11T01:45:05+08:00",
    UpdateTime: "2023-08-11T03:22:01+08:00"
  },
  {
    ActivityID: "C2_315080000H_081018",
    ActivityName: "義魄千秋-全國義民祭在新竹縣",
    StartTime: "2023-08-01T00:00:00+08:00",
    EndTime: "2023-08-31T00:00:00+08:00",
    Picture: {
        PictureUrl1: "https://www.taiwan.net.tw/att/event/c9d5d232-3288-4504-9764-cdf97ffc8a2c.jpg",
        PictureDescription1: "新埔褒忠義民廟義民祭祭祀大典熱鬧展開",
        PictureUrl2: "https://www.taiwan.net.tw/att/event/7fba3082-f0c7-4003-ba35-3375646e9a3f.jpg",
        PictureDescription2: "挑擔奉飯儀式",
        PictureUrl3: "https://www.taiwan.net.tw/att/event/e8cad7bf-42e3-44df-8a19-710948b417a9.jpg",
        PictureDescription3: "放水燈儀式"
    },
    City: "新竹縣",
    SrcUpdateTime: "2023-08-11T01:45:05+08:00",
    UpdateTime: "2023-08-11T03:22:01+08:00"
  },
  {
    ActivityID: "C2_315080800H_006158",
    ActivityName: "2023花蓮縣金針花季活動",
    StartTime: "2023-08-01T00:00:00+08:00",
    EndTime: "2023-09-30T23:59:59+08:00",
    Picture: {},
    City: "花蓮縣",
    SrcUpdateTime: "2023-08-11T01:45:05+08:00",
    UpdateTime: "2023-08-11T03:22:01+08:00"
  },
  {
    ActivityID: "C2_371020000A_003346",
    ActivityName: "Tracy的奇幻旅程",
    StartTime: "2023-08-01T08:00:00+08:00",
    EndTime: "2023-09-30T17:30:00+08:00",
    Picture: {},
    City: "金門縣",
    SrcUpdateTime: "2023-08-11T01:45:05+08:00",
    UpdateTime: "2023-08-11T03:22:01+08:00"
  }
]

// 景點跟美食考慮採用隨機抓取四個縣市並fetch其API
let dummyPopularScenicSpots = [
  {
    ScenicSpotID: "C1_315081200H_000002",
    ScenicSpotName: "石壁染織工坊DIY",
    City: "苗栗縣",
    Picture: {
      PictureUrl1: "https://www.trimt-nsa.gov.tw/Content/Uploads/StrollArea/Detail/944c4998-746b-4628-806f-554face73a65.jpg",
      PictureDescription1: "石壁染織工坊DIY"
    },
  },
  {
    ScenicSpotID: "C1_315081400H_000030",
    ScenicSpotName: "拉芙蘭藝術村",
    City: "高雄市",
    Picture: {
    },
  },
  {
    ScenicSpotID: "C1_315081600H_000031",
    ScenicSpotName: "李萬居在地精神啟蒙館",
    City: "雲林縣",
    Picture: {
      PictureUrl1: "https://swcoast-nsa.travel/image/36442/640x480",
      PictureDescription1: "李萬居故居原是茅草屋，後改建成磚造房屋，現將閒置空間改建為具有文化教育與休憩娛樂功能的精神啟蒙館"
    },
  },
  {
    ScenicSpotID: "C1_315081500H_000009",
    ScenicSpotName: "福德水車公園生態園區",
    City: "新北市",
    Picture: {
    },
  }
]
let dummyPopularRestaurants = [
  {
    RestaurantID: "C3_315081500H_000202",
    RestaurantName: "狸小路燒肉專賣店",
    Picture: {},
    City: "基隆市",
    SrcUpdateTime: "2023-08-11T01:45:39+08:00",
    UpdateTime: "2023-08-11T03:22:01+08:00"
  },
  {
    RestaurantID: "C3_315081100H_000020",
    RestaurantName: "大城黑糖饅頭",
    Picture: {
      PictureUrl1: "https://www.sunmoonlake.gov.tw/image/399/640x480",
      PictureDescription1: "黑糖饅頭"
    },
    City: "南投縣",
    SrcUpdateTime: "2023-08-11T01:45:39+08:00",
    UpdateTime: "2023-08-11T03:22:01+08:00"
  },
  {
    RestaurantID: "C3_315080500H_000165",
    RestaurantName: "釣魚人餐廳",
    Picture: {
      PictureUrl1: "https://www.eastcoast-nsa.gov.tw/image/41576/640x480",
      PictureDescription1: "釣魚人"
    },
    City: "臺東縣",
    SrcUpdateTime: "2023-08-11T01:45:39+08:00",
    UpdateTime: "2023-08-11T03:22:01+08:00"
  },
  {
    RestaurantID: "C3_397000000A_000266",
    RestaurantName: "康家小燒餅店",
    Picture: {},
    City: "高雄市",
    SrcUpdateTime: "2023-08-11T01:45:39+08:00",
    UpdateTime: "2023-08-11T03:22:01+08:00"
  },
]


export default {
  components: {
    SearchSection,
    Carousel,
    Activities,
    SharedCardsList
  },
  created() {
    this.fetchRecentActivities()
    this.fetchPopularScenicSpots()
    this.fetchPopularRestaurants()
  },
  data() {
    return {
      popularScenicSpotsTitle: "熱門打卡景點",
      popularScenicSpotsSubTitle: "查看更多活動",
      popularRestaurantsTitle: "一再回訪美食",
      popularRestaurantsSubTitle: "查看更多美食",
      popularScenicSpots: [],
      popularRestaurants: [],
      recentActivities: []
    }
  },
  methods: {
    fetchRecentActivities() {
      // 連API要記得抓取 Address欄位，避免可能沒有City欄位，這邊只要利用三元運算子避免City不存在，可參考ScenicSpot頁面的fetchNearbyScenicSpots
      this.recentActivities = dummyRecentActivities.map((activity) => ({
        id: activity.ActivityID,
        name: activity.ActivityName,
        city: activity.City,
        picture: activity.Picture,
        startTime: activity.StartTime,
        endTime: activity.EndTime
      }))
    },
    fetchPopularScenicSpots() {
      // 連API要記得抓取 Address欄位，避免可能沒有City欄位，這邊只要利用三元運算子避免City不存在，可參考ScenicSpot頁面的fetchNearbyScenicSpots
      this.popularScenicSpots = dummyPopularScenicSpots.map((scenicSpot) => ({
        id: scenicSpot.ScenicSpotID,
        name: scenicSpot.ScenicSpotName,
        city: scenicSpot.City,
        picture: scenicSpot.Picture
      }))
    },
    fetchPopularRestaurants() {
     // 連API要記得抓取 Address欄位，避免可能沒有City欄位，這邊只要利用三元運算子避免City不存在，可參考ScenicSpot頁面的fetchNearbyScenicSpots
      this.popularRestaurants = dummyPopularRestaurants.map((restaurant) => ({
        id: restaurant.RestaurantID,
        name: restaurant.RestaurantName,
        city: restaurant.City,
        picture: restaurant.Picture
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  margin: 70px 15px 72px;
}

@media screen and (min-width: 768px) {
  .home-container {
    margin: 162px 45px 120px;
    max-width: 1200px;
  }
}
</style>