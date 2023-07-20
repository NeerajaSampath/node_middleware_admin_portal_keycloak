require("dotenv").config();
const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");

const ruleGetURL = async (req, res) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_RULE_GET}/${utils.page_Details}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};
const PerruleGetURL = async (req, res) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_RULE_GET}/${req.params.id}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};
const MultirulePostURL = async (req, res, next) => {
  try {
    let data = {
      ruleConfigDtoList: req.body.ruleConfigDtoList,
    };
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_RULE_POST}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const SinglerulePostURL = async (req, res, next) => {
  try {
    let data = {
      rule_config_id: req.body.rule_config_id,
      name: req.body.name,
      txn_type: req.body.txn_type,
      txn_sub_type: req.body.txn_sub_type,
      is_points_by_percentage: req.body.is_points_by_percentage,
      is_points_by_value: req.body.is_points_by_value,
      base_points: req.body.base_points,
      min_value: req.body.min_value,
      max_value: req.body.max_value,
      is_first_scan: req.body.is_first_scan,
      is_campaign: req.body.is_campaign,
      multiplier: req.body.multiplier,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      mcc_code: req.body.mcc_code,
      is_yearly: req.body.is_yearly,
      is_monthly: req.body.is_monthly,
      is_days: req.body.is_days,
      duration: req.body.duration,
      is_referral: req.body.is_referral,
      is_per_referral: req.body.is_per_referral,
      is_milestone: req.body.is_milestone,
      mile_stone_points: req.body.mile_stone_points,
      is_batch: req.body.is_batch,
      is_recurring: req.body.is_recurring,
      is_initial_setup: req.body.is_initial_setup,
      is_event: req.body.is_event,
      is_enabled: req.body.is_enabled,
      mcc_ids: req.body.mcc_ids,
      refId: req.body.refId,
      is_reversal: req.body.is_reversal,
      is_cashback: req.body.is_cashback,
    };
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_SINGLE_RULE_POST}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const ruleEnablePutURL = async (req, res, next) => {
  try {
    let response = await axiosInstance({
      method: "put",
      url: `${utils.API_SINGLE_RULE_POST}/${req.params.config_id}/${req.params.is_active}`,
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
  ruleGetURL,
  PerruleGetURL,
  MultirulePostURL,
  SinglerulePostURL,
  ruleEnablePutURL,
};
