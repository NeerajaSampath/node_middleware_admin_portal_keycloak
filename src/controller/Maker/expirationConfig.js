require("dotenv").config();
const utils = require("../../Constant");
const statusObject = require("../../statusCodes");
const axiosInstance = require("../../axiosBase");

const expiryGetURL = async (req, res) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_EXPIRY}/${utils.page_Details}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};
const expiryPostURL = async (req, res, next) => {
  try {
    let data = JSON.stringify({
      expiration_id: req.body.expiration_id,
      is_yearly: req.body.is_yearly,
      is_monthly: req.body.is_monthly,
      is_days: req.body.is_days,
      duration: req.body.duration,
    });
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_EXPIRY}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
    res.send(error);
  }
};

module.exports = { expiryGetURL, expiryPostURL };
