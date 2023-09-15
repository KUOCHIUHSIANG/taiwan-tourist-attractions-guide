import { apiHelper } from "../utils/helpers";

export default {
  getRecentActivities({ year, month, day }) {
    let dueYear = Number(year);
    let dueMonth = 0;
    month = Number(month)
    if (month === 12) {
      dueMonth = 2;
      dueYear += 1;
    } else if (month === 11) {
      dueMonth = 1;
      dueYear += 1;
    } else {
      dueMonth = month + 2;
    }

    return apiHelper.get(
      `/Activity?$orderby=StartTime asc&$top=4&$select=ActivityID,ActivityName,StartTime,EndTime,Picture,City&$filter=date(EndTime) ge ${year}-${month}-${day} and date(EndTime) le ${dueYear}-${dueMonth}-30 and date(StartTime) ge ${year}-${
        month - 1
      }-01 and Picture/PictureUrl1 ne null`
    );
  },
  getRecentActivitiesByCity({ year, month, day, city }) {
    let dueYear = Number(year);
    let dueMonth = 0;
    month = Number(month);
    if (month === 12) {
      dueMonth = 2;
      dueYear += 1;
    } else if (month === 11) {
      dueMonth = 1;
      dueYear += 1;
    } else {
      dueMonth = month + 2;
    }

    return apiHelper.get(
      `/Activity/${city}?$orderby=StartTime asc&$top=4&$select=ActivityID,ActivityName,Picture,City&$filter=date(EndTime) ge ${year}-${month}-${day} and date(EndTime) le ${dueYear}-${dueMonth}-30 and date(StartTime) ge ${year}-${
        month - 1
      }-01 and Picture/PictureUrl1 ne null`
    );
  },
  getActivitiesByKeyword({ keyword }) {
    return apiHelper.get(
      `/Activity?$filter=contains(ActivityName,'${keyword}')&$top=30&$select=ActivityID,ActivityName,City,Picture`
    );
  },
  getActivitiesByCity({ city, keyword }) {
    return apiHelper.get(
      `/Activity/${city}?$filter=contains(ActivityName,'${keyword}')&$top=30&$select=ActivityID,ActivityName,City,Picture`
    );
  },
  getActivitiesByDate({ year, month, keyword }) {
    let dueYear = Number(year);
    let dueMonth = 0;
    month = Number(month);
    if (month === 12) {
      dueMonth = 2;
      dueYear += 1;
    } else if (month === 11) {
      dueMonth = 1;
      dueYear += 1;
    } else {
      dueMonth = month + 2;
    }
    return apiHelper.get(
      `/Activity?$orderby=StartTime asc&$top=30&$select=ActivityID,ActivityName,Picture,City&$filter=contains(ActivityName,'${keyword}') and date(EndTime) ge ${year}-${month}-01 and date(EndTime) le ${dueYear}-${dueMonth}-01 and date(StartTime) ge ${year}-${
        month - 1
      }-01`
    );
  },
  getActivitiesByTheme({ theme, keyword }) {
    return apiHelper.get(
      `/Activity?$filter=contains(Class1,'${theme}') and contains(ActivityName,'${keyword}') or contains(Class2,'${theme}') and contains(ActivityName,'${keyword}')&$top=30&$select=ActivityID,ActivityName,City,Picture`
    );
  },
  getActivitiesByCityAndDate({ city, year, month, keyword }) {
    let dueYear = Number(year);
    let dueMonth = 0;
    month = Number(month);
    if (month === 12) {
      dueMonth = 2;
      dueYear += 1;
    } else if (month === 11) {
      dueMonth = 1;
      dueYear += 1;
    } else {
      dueMonth = month + 2;
    }
    return apiHelper.get(
      `/Activity/${city}?$orderby=StartTime asc&$top=30&$select=ActivityID,ActivityName,Picture,City&$filter=contains(ActivityName,'${keyword}') and date(EndTime) ge ${year}-${month}-01 and date(EndTime) le ${dueYear}-${dueMonth}-01 and date(StartTime) ge ${year}-${
        month - 1
      }-01`
    );
  },
  getActivitiesByCityAndTheme({ city, theme, keyword }) {
    return apiHelper.get(
      `/Activity/${city}?$filter=contains(Class1,'${theme}') and contains(ActivityName,'${keyword}') or contains(Class2,'${theme}') and contains(ActivityName,'${keyword}')&$top=30&$select=ActivityID,ActivityName,City,Picture`
    );
  },
  getActivitiesByDateAndTheme({ year, month, theme, keyword }) {
    let dueYear = Number(year);
    let dueMonth = 0;
    month = Number(month);
    if (month === 12) {
      dueMonth = 2;
      dueYear += 1;
    } else if (month === 11) {
      dueMonth = 1;
      dueYear += 1;
    } else {
      dueMonth = month + 2;
    }
    return apiHelper.get(
      `/Activity?$orderby=StartTime asc&$top=30&$select=ActivityID,ActivityName,Picture,City&$filter=contains(ActivityName,'${keyword}') and contains(Class1,'${theme}') and date(EndTime) ge ${year}-${month}-01 and date(EndTime) le ${dueYear}-${dueMonth}-01 and date(StartTime) ge ${year}-${
        month - 1
      }-01 or contains(ActivityName,'${keyword}') and contains(Class2,'${theme}') and date(EndTime) ge ${year}-${month}-01 and date(EndTime) le ${dueYear}-${dueMonth}-01 and date(StartTime) ge ${year}-${
        month - 1
      }-01`
    );
  },
  getActivitiesByAllOption({ city, year, month, theme, keyword }) {
    let dueYear = Number(year);
    let dueMonth = 0;
    month = Number(month);
    if (month === 12) {
      dueMonth = 2;
      dueYear += 1;
    } else if (month === 11) {
      dueMonth = 1;
      dueYear += 1;
    } else {
      dueMonth = month + 2;
    }
    return apiHelper.get(
      `/Activity/${city}?$orderby=StartTime asc&$top=30&$select=ActivityID,ActivityName,Picture,City&$filter=contains(ActivityName,'${keyword}') and contains(Class1,'${theme}') and date(EndTime) ge ${year}-${month}-01 and date(EndTime) le ${dueYear}-${dueMonth}-01 and date(StartTime) ge ${year}-${
        month - 1
      }-01 or contains(ActivityName,'${keyword}') and contains(Class2,'${theme}') and date(EndTime) ge ${year}-${month}-01 and date(EndTime) le ${dueYear}-${dueMonth}-01 and date(StartTime) ge ${year}-${
        month - 1
      }-01`
    );
  },
  getActivity({ id }) {
    return apiHelper.get(`/Activity?$filter=ActivityID eq '${id}'`);
  },
  getNearbyActivities(id, year, month, day, lat, lng, amount) {
    let dueYear = Number(year);
    let dueMonth = 0;
    month = Number(month);
    if (month === 12) {
      dueMonth = 2;
      dueYear += 1;
    } else if (month === 11) {
      dueMonth = 1;
      dueYear += 1;
    } else {
      dueMonth = month + 2;
    }
    return apiHelper.get(
      `/Activity?$orderby=StartTime asc&$top=${amount}&$select=ActivityID,ActivityName,Picture,City&$filter=date(EndTime) ge ${year}-${month}-${day} and date(EndTime) le ${dueYear}-${dueMonth}-30 and date(StartTime) ge ${year}-${
        month - 1
      }-01 and Picture/PictureUrl1 ne null and ActivityID ne '${id}'&$spatialFilter=nearby(${lat}, ${lng}, 5000)`
    );
  },
};

