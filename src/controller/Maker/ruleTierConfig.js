require("dotenv").config();
const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");

const ruleTierGetURL = async (req, res) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_RULE_TIER_MAPPING_GET}/${utils.page_Details}`,
      headers: { "content-type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const PerruleTierGetURL = async (req, res) => {
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_RULE_TIER_MAPPING_GET}/${req.params.id}`,
      headers: { "content-type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const multiruleTierPostURL = async (req, res, next) => {
  try {
    let data = {
      ruleTierMappingDtoList: req.body.ruleTierMappingDtoList,
    };
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_RULE_TIER_MAPPING_POST}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const SingleruleTierPostURL = async (req, res, next) => {
  try {
    let data = {
      ruleTierMappingKeyDto: req.body.ruleTierMappingKeyDto,
      points: req.body.points,
      isEnabled: req.body.isEnabled,
      refferPoints: req.body.refferPoints,
      refId: req.body.refId,
    };
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_SINGLE_RULE_TIER_MAPPING_POST}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const ruleTierEnablePutURL = async (req, res, next) => {
  try {
    let response = await axiosInstance({
      method: "put",
      url: `${utils.API_SINGLE_RULE_TIER_MAPPING_POST}/${req.params.config_id}/${req.params.is_active}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};

module.exports = {
  ruleTierGetURL,
  PerruleTierGetURL,
  multiruleTierPostURL,
  SingleruleTierPostURL,
  ruleTierEnablePutURL,
};
