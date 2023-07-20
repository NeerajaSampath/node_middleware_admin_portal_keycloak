require("dotenv").config();
const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");

const mccGetURL = async (req, res) => {
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_MCC}`,
      headers: { "content-type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const mccPostURL = async (req, res, next) => {
  try {
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_MCC}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { mccGetURL, mccPostURL };
