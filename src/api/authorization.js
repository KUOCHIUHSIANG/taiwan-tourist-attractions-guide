import axios from "axios";

const parameter = {
  grant_type: "client_credentials",
  client_id: "p833795p-f5fed3ec-98f9-44db",
  client_secret: "4e25e8d6-a18e-47ac-bc4a-d3104f7881f1",
};

export default {
  getApiToken() {
    return axios({
      method: "post",
      url: "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
      dataType: "JSON",
      data: parameter,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
  },
};
