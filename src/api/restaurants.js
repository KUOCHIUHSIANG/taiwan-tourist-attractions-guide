import { apiHelper } from "../utils/helpers";

export default {
  getPopularRestaurants() {
    return apiHelper.get("/Restaurant?$top=4");
  },
  getRestaurantsByKeyword({ keyword }) {
    return apiHelper.get(
      `/Restaurant?$filter=contains(RestaurantName,'${keyword}')&$top=30&$select=RestaurantID,RestaurantName,City,Picture`
    );
  },
  getRestaurantsByCity({ city, keyword }) {
    return apiHelper.get(
      `/Restaurant/${city}?$filter=contains(RestaurantName,'${keyword}')&$top=30&$select=RestaurantID,RestaurantName,City,Picture`
    );
  },
  getRestaurantsByTheme({ theme, keyword }) {
    return apiHelper.get(
      `/Restaurant?$top=30&$select=RestaurantID,RestaurantName,City,Picture&$filter=contains(RestaurantName,'${keyword}') and contains(Class, '${theme}')`
    );
  },
  getRestaurantsByCityAndTheme({ city, theme, keyword }) {
    return apiHelper.get(
      `/Restaurant/${city}?$top=30&$select=RestaurantID,RestaurantName,City,Picture&$filter=contains(RestaurantName,'${keyword}') and contains(Class, '${theme}')`
    );
  },
  getRestaurant({ id }) {
    return apiHelper.get(`/Restaurant?$filter=RestaurantID eq '${id}'`);
  },
  getNearbyRestaurants(id, lat, lng, amount) {
    return apiHelper.get(
      `/Restaurant?$select=RestaurantID, RestaurantName, City, Picture&$top=${amount}&$spatialFilter=nearby(${lat}, ${lng} , 5000)&$filter=RestaurantID ne '${id}'`
    );
  },
};
