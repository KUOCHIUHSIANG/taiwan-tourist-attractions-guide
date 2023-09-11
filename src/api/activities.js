import { apiHelper } from "../utils/helpers";

export default {
  getRecentActivities({ year, month, day }) {
    let dueMonth = 0;
    if (month === 12) {
      dueMonth = 1;
    } else {
      dueMonth = month + 1;
    }
    return apiHelper.get(
      `/Activity?$orderby=StartTime asc&$top=4&$filter=year(StartTime) eq ${year} and month(StartTime) ge ${month} and month(StartTime) le ${dueMonth} and day(EndTime) ge ${day} and Picture/PictureUrl1 ne null&$select=ActivityID,ActivityName,StartTime,EndTime,Picture,City, Address`
    );
  },
  getRecentActivitiesByCity({ year, month, day, city }) {
    let dueMonth = 0;
    if (month === 12) {
      dueMonth = 1;
    } else {
      dueMonth = month + 1;
    }
    return apiHelper.get(
      `/Activity/${city}?$orderby=StartTime asc&$top=4&$filter=year(StartTime) eq ${year} and month(StartTime) ge ${month} and month(StartTime) le ${dueMonth} and day(EndTime) ge ${day} and Picture/PictureUrl1 ne null&$select=ActivityID,ActivityName,Picture,City, Address`
    );
  },
  getActivitiesByKeyword({ keyword }) {
    return apiHelper.get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?$filter=contains(ActivityName,'${keyword}')&$top=30&$select=ActivityID,ActivityName,City,Picture`
    );
  },
  getActivity({ id }) {
    return apiHelper.get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?$filter=ActivityID eq '${id}'`
    );
  },
};

