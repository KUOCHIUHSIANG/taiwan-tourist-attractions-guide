(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d77e730"],{"30a0":function(t,e,i){"use strict";i("bd5e")},bd5e:function(t,e,i){},dcdd:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"scenic-spot-container"},[e("SharedPage",{attrs:{"initial-inside-page-data":t.scenicSpot,center:{lat:t.lat,lng:t.lng}}}),0!==t.nearbyScenicSpots.length?e("SharedCardsList",{attrs:{"initial-card-list":t.nearbyScenicSpots,"initial-title":t.nearByTitle,"initial-sub-title":t.nearBySubTitle}}):t._e()],1)},c=[],n=(i("14d9"),i("c8fe")),a=i("0204"),o=i("1fdf"),r=i("ac0d"),p=i("4360"),S={mixins:[r["b"]],components:{SharedPage:n["a"],SharedCardsList:a["a"]},created(){this.fetchScenicSpot(this.$route.params.ScenicSpotID)},data(){return{scenicSpot:{},nearbyScenicSpots:[],lat:0,lng:0}},methods:{async fetchScenicSpot(t){try{const e=await o["a"].getScenicSpot({id:t});if(0===e.data.length)return this.$toast.error("此景點不存在",{timeout:1500}),void this.$router.push({name:"search-scenic-spot"});const[i]=e.data;this.scenicSpot={id:i.ScenicSpotID,name:i.ScenicSpotName,description:i.DescriptionDetail,phone:i.Phone,address:i.Address?i.Address:"未提供",openTime:i.OpenTime,city:i.City?i.City:"未提供",class1:i.Class1,class2:i.Class2,class3:i.Class3,websiteUrl:i.WebsiteUrl,picture:i.Picture,position:i.Position,ticketInfo:i.TicketInfo,remarks:i.Remarks},this.lat=this.scenicSpot.position.PositionLat,this.lng=this.scenicSpot.position.PositionLon,this.fetchNearbyScenicSpots(this.scenicSpot.id,this.lat,this.lng)}catch(e){401===e.response.status?(p["a"].dispatch("getToken"),this.fetchScenicSpot(this.$route.params.ScenicSpotID)):console.log(e)}},async fetchNearbyScenicSpots(t,e,i){try{const s=4,c=await o["a"].getNearbyScenicSpots(t,e,i,s);this.nearbyScenicSpots=c.data.map(t=>({id:t.ScenicSpotID,name:t.ScenicSpotName,city:t.City?t.City:"未提供",picture:t.Picture})),this.nearbyScenicSpots=this.nearbyScenicSpots.filter(t=>t.id!==this.scenicSpot.id)}catch(s){401===s.response.status?(p["a"].dispatch("getToken"),this.fetchScenicSpot(this.$route.params.ScenicSpotID)):console.log(s)}}},watch:{scenicSpot(){this.getDimensions()}},beforeRouteUpdate(t,e,i){const{ScenicSpotID:s}=t.params;this.fetchScenicSpot(s),i()}},h=S,d=(i("30a0"),i("2877")),l=Object(d["a"])(h,s,c,!1,null,"1b0541f8",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-0d77e730.71ec6c21.js.map