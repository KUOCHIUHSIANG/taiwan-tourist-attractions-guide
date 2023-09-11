import { apiHelper } from "../utils/helpers";

export default {
  getPopularScenicSpots() {
    return apiHelper.get(
      "https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$top=4&$skip=4"
    );
  },
  getCityScenicSpots(city) {
    return apiHelper.get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${city}?$top=1&$select=ScenicSpotID,ScenicSpotName,Picture,City`
    );
  },
  getScenicSpotsByKeyword({ keyword }) {
    return apiHelper.get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$filter=contains(ScenicSpotName,'${keyword}')&$top=30&$select=ScenicSpotID,ScenicSpotName,City,Picture`
    );
  },
  getScenicSpot({ id }) {
    return apiHelper.get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$filter=ScenicSpotID eq '${id}'`
    );
  },
  getNearbyScenicSpots(id, lat, lng) {
    return apiHelper.get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$select=ScenicSpotID, ScenicSpotName, City, Picture&$top=4&$spatialFilter=nearby(${lat}, ${lng} , 5000)&$filter=ScenicSpotID ne '${id}'`
    );
  }
};