require("dotenv").config();
const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");

const tierGetURL = async (req, res, next) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_TIER}/${utils.page_Details}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};
const PertierGetURL = async (req, res, next) => {
  // utils.page_Details = `${req.p̊arams.id}`;
  console.log(req.params.id);
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_TIER}/${req.params.id}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};
const tierPostURL = async (req, res) => {
  try {
    let data = {
      tier_id: req.body.tier_id,
      tier_name: req.body.tier_name,
      points_min_limit: req.body.points_min_limit,
      points_max_limit: req.body.points_max_limit,
      amount_min_limit: req.body.amount_min_limit,
      amount_max_limit: req.body.amount_max_limit,
      multiplier: req.body.multiplier,
      expiration_config: req.body.expiration_config,
      redemption_config: req.body.redemption_config,
      accrual_config: req.body.accrual_config,
      isEnabled: req.body.isEnabled,
      refId: req.body.refId,
    };
    let response = await axiosInstance({
      method: "POST",
      url: `${utils.API_TIER}`,
      headers: { "content-type": "application/json", Accept: "*/*" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const tierEnablePutURL = async (req, res) => {
  try {
    let response = await axiosInstance({
      method: "put",
      url: `${utils.API_TIER}/${req.params.config_id}/${req.params.is_active}`,
      headers: { "content-type": "application/json", Accept: "*/*" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { tierGetURL, PertierGetURL, tierPostURL, tierEnablePutURL };
