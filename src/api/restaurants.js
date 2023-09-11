import { apiHelper } from "../utils/helpers";

export default {
  getPopularRestaurants() {
    return apiHelper.get(
      "https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?$top=4"
    );
  },
  getRestaurantsByKeyword({ keyword }) {
    return apiHelper.get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?$filter=contains(RestaurantName,'${keyword}')&$top=30&$select=RestaurantID,RestaurantName,City,Picture`
    );
  },
};
