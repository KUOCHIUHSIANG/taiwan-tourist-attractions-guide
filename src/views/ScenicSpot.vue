<template>
  <div class="scenic-spot-container">
    <SharedPage :initial-inside-page-data="scenicSpot"
    :center="{lat, lng}"
    />
    <SharedCardsList 
    :initial-card-list="nearbyScenicSpots"
    :initial-title="nearByScenicSpotsTitle"
    :initial-sub-title="nearByScenicSpotsSubTitle" />
  </div>
</template>

<script>
import SharedPage from '../components/SharedPageForInsidePages.vue'
import SharedCardsList from '../components/SharedCardsList.vue';

let dummyScenicSpotData = [
  {
    ScenicSpotID: "C1_315080500H_000068",
    ScenicSpotName: "紫坪",
    DescriptionDetail: "紫坪位在綠島最南方，緊鄰「綠島露營區」。從露營區旁的步道，可通往海岸邊的潟湖「紫坪」。「紫坪」是一處由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。外海儘管浪濤洶湧，內湖依然波平如鏡，宛若沉睡的湖水，清淺的躺在外珊瑚礁岩與內珊瑚貝砂灘間；水芫花灌叢身影倒映於平靜無波的水面上，潔白柔細的白砂鋪陳水底。熱帶海岸旖旎風情，盡在不言中。",
    Phone: "886-8-9672026",
    Address: "臺東縣951綠島鄉溫泉路256號",
    OpenTime: "全天候開放",
    City: "臺東縣", // 可能不存在
    Class1: "自然風景類", // 可能不存在，宜蘭的可能三個類別都一樣
    Class2: "都會公園類", // 可能不存在
    Class3: "其他", // 可能不存在 
    WebsiteUrl: "https://www.cjwine.com/",// 可能不存在 
    Picture: {
      PictureUrl1: "https://www.eastcoast-nsa.gov.tw/image/426/640x480",
      PictureDescription1: "這是綠島露營區的階梯"
    },
    Position: {
      PositionLon: 121.49990844726562,
      PositionLat: 22.633939743041992,
      GeoHash: "wsn2ub3s3"
    },
    TicketInfo: "免費，露營活動另計。",
    Remarks: "1、紫坪上方的綠島露營區為生態保護區，禁止採集花木生物，並請維護環境整潔，讓這片美景能留與後代子孫。2、露營區目前已於2009年委由「東方之泉有限股份公司」經營，      聯絡電...",
    SrcUpdateTime: "2023-08-14T01:39:27+08:00",
    UpdateTime: "2023-08-14T03:22:01+08:00"
  }
]
let dummyNearbyScenicSpotsData = [
  {
      ScenicSpotID: "C1_315080500H_000073",
      ScenicSpotName: "帆船鼻大草原",
      Address: "臺東縣951綠島鄉溫泉路167號",
      Picture: {
          PictureUrl1: "https://www.eastcoast-nsa.gov.tw/image/29072/640x480",
          PictureDescription1: "鳥瞰帆船鼻大草原"
      },
      SrcUpdateTime: "2023-08-17T01:43:16+08:00",
      UpdateTime: "2023-08-17T02:22:01+08:00"
  },
  {
      ScenicSpotID: "C1_315080500H_000098",
      ScenicSpotName: "哈巴狗與睡美人岩",
      Address: "臺東縣951綠島鄉環島公路8公里處",
      Picture: {
          PictureUrl1: "https://www.eastcoast-nsa.gov.tw/image/29064/640x480",
          PictureDescription1: "哈巴狗與睡美人岩的美麗海灣"
      },
      SrcUpdateTime: "2023-08-17T01:43:16+08:00",
      UpdateTime: "2023-08-17T02:22:01+08:00"
  },
  {
      ScenicSpotID: "C1_315080500H_000167",
      ScenicSpotName: "柴口浮潛區",
      Address: "臺東縣951綠島鄉環島公路2公里處",
      Picture: {
          PictureUrl1: "https://www.eastcoast-nsa.gov.tw/image/29042/640x480",
          PictureDescription1: "柴口十分適合新手來體驗浮潛"
      },
      SrcUpdateTime: "2023-08-17T01:43:16+08:00",
      UpdateTime: "2023-08-17T02:22:01+08:00"
  },
  {
      ScenicSpotID: "C1_376540000A_000365",
      ScenicSpotName: "石朗潛水區",
      Address: "臺東縣951綠島鄉環島公路17公里處路旁",
      Picture: {},
      SrcUpdateTime: "2023-08-17T01:43:16+08:00",
      UpdateTime: "2023-08-17T02:22:01+08:00"
  }
]

export default {
  components: {
    SharedPage,
    SharedCardsList
  },
  created() {
    this.fetchScenicSpot();
    this.fetchNearbyScenicSpots();
    this.getDimensions();
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions)
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions)
  },
  data() {
    return {
      scenicSpot: {},
      nearbyScenicSpots: [],
      nearByScenicSpotsTitle: "還有這些不能錯過的景點",
      nearByScenicSpotsSubTitle: "更多景點",
      lat: 0,
      lng: 0,
      screenWidth: document.documentElement.clientWidth,
    }
  },
  methods: {
    fetchScenicSpot() {
      // 記得注意每個欄位是否可能為空的狀況 ex:City和Class1
      const [scenicSpotData] = dummyScenicSpotData
      this.scenicSpot = {
        id: scenicSpotData.ScenicSpotID,
        name: scenicSpotData.ScenicSpotName,
        description: scenicSpotData.DescriptionDetail,
        phone: scenicSpotData.Phone,
        address: scenicSpotData.Address,
        openTime: scenicSpotData.OpenTime,
        city: scenicSpotData.City ? scenicSpotData.City : scenicSpotData.Address.slice(0, 3),
        class1: scenicSpotData.Class1,
        class2: scenicSpotData.Class2,
        class3: scenicSpotData.Class3,
        websiteUrl: scenicSpotData.WebsiteUrl,
        picture: scenicSpotData.Picture,
        position: scenicSpotData.Position,
        ticketInfo: scenicSpotData.TicketInfo,
        remarks: scenicSpotData.Remarks,
      }
      this.lat = this.scenicSpot.position.PositionLat
      this.lng = this.scenicSpot.position.PositionLon
      this.nearByScenicSpotsSubTitle = `更多${ this.scenicSpot.city }景點`
    },
    fetchNearbyScenicSpots() {
      this.nearbyScenicSpots = dummyNearbyScenicSpotsData.map((scenicSpot)=> ({
        id: scenicSpot.ScenicSpotID,
        name: scenicSpot.ScenicSpotName,
        city: scenicSpot.City ? scenicSpot.City : scenicSpot.Address.slice(0, 3),
        picture: scenicSpot.Picture
      }))
    },
    getDimensions() {
      this.screenWidth = document.documentElement.clientWidth
      if (this.screenWidth < 768) {
        this.nearByScenicSpotsTitle = "還有這些不能錯過"
        this.nearByScenicSpotsSubTitle = "查看更多景點" 
      } else  {
        this.nearByScenicSpotsTitle = "還有這些不能錯過的景點"
        this.nearByScenicSpotsSubTitle = `更多${ this.scenicSpot.city }景點`
      }
    }
  },  
}
</script>

<style lang="scss" scoped>
.scenic-spot-container {
  padding: 88px 15px 0;
  margin-bottom: 71px;
}

@media screen and (min-width: 768px) {
  .scenic-spot-container {
    padding: 140px 45px 0;
    margin-bottom: 120px;
  }
}
</style>