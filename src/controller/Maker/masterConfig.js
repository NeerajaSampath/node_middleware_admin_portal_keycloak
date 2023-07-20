require("dotenv").config();
const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");

const masterConfigGetURL = async (req, res) => {
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_MASTERCONFIG}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const masterConfigAllGetURL = async (req, res) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_MASTERCONFIG}/${utils.page_Details}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const masterConfigPostURL = async (req, res, next) => {
  try {
    let data = {
      configId: req.body.configId,
      isInstant: req.body.isInstant,
      isRoundOffPoints: req.body.isRoundOffPoints,
      isReversalAllowed: req.body.isReversalAllowed,
      isPartialReversal: req.body.isPartialReversal,
      isPointAccrualLimit: req.body.isPointAccrualLimit,
      reverseCount: req.body.reverseCount,
      isTierUpgradeInstant: req.body.isTierUpgradeInstant,
      tierDowngradeDurationByMonths: req.body.tierDowngradeDurationByMonths,
      isMYOPEnabled: req.body.isMYOPEnabled,
      currency: req.body.currency,
      channelId: req.body.channelId,
      tenant: req.body.tenant,
      isCashRedemptionEnabled: req.body.isCashRedemptionEnabled,
      cashConverstionFactor: req.body.cashConverstionFactor,
      debitAccount: req.body.debitAccount,
      narrationFormat1: req.body.narrationFormat1,
      narrationFormat2: req.body.narrationFormat2,
      tierUpgradeBy: req.body.tierUpgradeBy,
      tierDowngradeBy: req.body.tierDowngradeBy,
      isPrecisionEnabled: req.body.isPrecisionEnabled,
      precisionValue: req.body.precisionValue,
      refId: req.body.refId,
    };
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_MASTERCONFIG}`,
      headers: { "content-type": "application/json" },
      data: req.body,
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
const masterConfigEnablePutURL = async (req, res, next) => {
  try {
    let response = await axiosInstance({
      method: "put",
      url: `${utils.API_MASTERCONFIG}/${req.params.config_id}/${req.params.is_active}`,
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
  masterConfigGetURL,
  masterConfigAllGetURL,
  masterConfigPostURL,
  masterConfigEnablePutURL,
};
