var axios = require("axios");
const utils = require("./Constant");

var axiosInstance = axios.create({
  baseURL: `${utils.API_BASE_URL_DEV}`,
});
module.exports = axiosInstance;
