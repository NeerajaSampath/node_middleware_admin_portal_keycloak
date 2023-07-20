require("dotenv").config();
const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");

const typesGetURL = async (req, res) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_TYPES}/${utils.page_Details}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const typesPostURL = async (req, res, next) => {
  try {
    let data = {
      typeId: req.body.typeId,
      typeName: req.body.typeName,
      displayName: req.body.displayName,
      subTypeConfigDTOS: req.body.subTypeConfigDTOS,
    };
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_TYPES}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { typesGetURL, typesPostURL };
