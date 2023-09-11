import axios from 'axios'
import store from "./../store";

const baseURL = "https://tdx.transportdata.tw/api/basic/v2/Tourism";

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      store.dispatch("getToken");
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);


export const apiHelper = axiosInstance;