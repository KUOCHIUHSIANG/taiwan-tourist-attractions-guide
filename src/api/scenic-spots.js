import { apiHelper } from "../utils/helpers";

export default {
  getPopularScenicSpots() {
    return apiHelper.get("/ScenicSpot?$top=4&$skip=4");
  },
  getCityScenicSpots(city) {
    return apiHelper.get(
      `/ScenicSpot/${city}?$top=1&$select=ScenicSpotID,ScenicSpotName,Picture,City`
    );
  },
  getScenicSpotsByKeyword({ keyword }) {
    return apiHelper.get(
      `/ScenicSpot?$filter=contains(ScenicSpotName,'${keyword}')&$top=30&$select=ScenicSpotID,ScenicSpotName,City,Picture`
    );
  },
  getScenicSpotsByCity({ city, keyword }) {
    return apiHelper.get(
      `/ScenicSpot/${city}?$top=30&$select=ScenicSpotID,ScenicSpotName,City,Picture&$filter=contains(ScenicSpotName,'${keyword}')`
    );
  },
  getScenicSpotsByTheme({ theme, keyword }) {
    return apiHelper.get(
      `/ScenicSpot?$top=30&$select=ScenicSpotID,ScenicSpotName,City,Picture&$filter=contains(ScenicSpotName,'${keyword}') and contains(Class1, '${theme}') or contains(ScenicSpotName,'${keyword}')  and contains(Class2, '${theme}') or contains(ScenicSpotName,'${keyword}')  and contains(Class3, '${theme}')`
    );
  },
  getScenicSpotsByCityAndTheme({ city, theme, keyword }) {
    return apiHelper.get(
      `/ScenicSpot/${city}?$top=30&$select=ScenicSpotID,ScenicSpotName,City,Picture&$filter=contains(ScenicSpotName,'${keyword}') and contains(Class1, '${theme}') or contains(ScenicSpotName,'${keyword}')  and contains(Class2, '${theme}') or contains(ScenicSpotName,'${keyword}')  and contains(Class3, '${theme}')`
    );
  },
  getScenicSpot({ id }) {
    return apiHelper.get(`/ScenicSpot?$filter=ScenicSpotID eq '${id}'`);
  },
  getNearbyScenicSpots(id, lat, lng, amount) {
    return apiHelper.get(
      `/ScenicSpot?$select=ScenicSpotID, ScenicSpotName, City, Picture&$top=${amount}&$spatialFilter=nearby(${lat}, ${lng} , 5000)&$filter=ScenicSpotID ne '${id}'`
    );
  },
};