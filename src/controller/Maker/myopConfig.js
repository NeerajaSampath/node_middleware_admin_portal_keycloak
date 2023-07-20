require("dotenv").config();
const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");

const myopGetURL = async (req, res) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_MYOP_GET}/${utils.page_Details}`,
      headers: { "content-type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const myopPostURL = async (req, res, next) => {
  try {
    let data = {
      brandId: req.body.brandId,
      brandName: req.body.brandName,
      merchants: req.body.merchants,
    };
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_MYOP_POST}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    // console.log("error",error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { myopGetURL, myopPostURL };
