require("dotenv").config();
const date = require("date-and-time");
const utils = require("../../Constant");
const statusObject = require("../../statusCodes");
const axiosInstance = require("../../axiosBase");

const statusConfigGetURL = async (req, res) => {
  const statusId = `${req.params.status_id}`;
  try {
    //tier get all data api
    // let responseTier = await axiosInstance({
    //   method: "get",
    //   url: `${utils.API_TIER}/0/5000`,
    //   headers: { "content-type": "application/json" },
    // });
    // //rule get all data api
    // let responseRule = await axiosInstance({
    //   method: "get",
    //   url: `${utils.API_RULE_GET}/0/5000`,
    //   headers: { "content-type": "application/json" },
    // });
    // //ruletiermapping get all data api
    // let responseRuleTierMapp = await axiosInstance({
    //   method: "get",
    //   url: `${utils.API_RULE_TIER_MAPPING_GET}/0/5000`,
    //   headers: { "content-type": "application/json" },
    // });
    //status get api
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_CONFIG_GET}/${statusId}`,
      headers: { "content-type": "application/json" },
    });
    //destructuring the api response data
    // var status_formated_data = response?.data?.data;
    // var tier_get_data = responseTier?.data?.data;
    // var rule_get_data = responseRule?.data?.data;
    // var ruletiermap_get_data = responseRuleTierMapp?.data?.data;
    // var destructure_status_res_data =
    //   status_formated_data?.configStatusRequestList.flatMap((item) => {
    //     return {
    //       moduleName: item?.moduleName,
    //       uuidList: item?.uuidList,
    //       status: item.status,
    //     };
    //   });
    // //spliting the enable status in uuidlist field
    // var status_data = status_formated_data?.configStatusRequestList.flatMap(
    //   (item) =>
    //     item.uuidList.map((items) => {
    //       const lastIndex = items.lastIndexOf("-");
    //       const uuid_list_splice = items.slice(0, lastIndex);
    //       return uuid_list_splice;
    //     })
    // );
    // var status_data_mapping =
    //   status_formated_data?.configStatusRequestList.flatMap((item) => {
    //     if (item.moduleName == "RULE_TIER_MAPPING_CONFIG") {
    //       return item.uuidList.flatMap((items) => {
    //         const lastIndex = items.lastIndexOf("-");
    //         const uuid_list_splice = items.slice(0, lastIndex);
    //         return uuid_list_splice.split(/[_]+/);
    //       });
    //     } else {
    //       return;
    //     }
    //   });
    // //filter for tier get api
    // const filter_data_tier = tier_get_data
    //   ?.filter((typeid) => status_data.includes(typeid?.tier_id))
    //   .map((items) => items?.tier_name);
    // //filter for rule get api
    // const filter_data_rule = rule_get_data
    //   ?.filter((typeid) => status_data.includes(typeid?.rule_config_id))
    //   .map((items) => items?.name);
    // //filter for ruletier mapping get api
    // const filter_data_ruletiermapp = ruletiermap_get_data
    //   ?.filter((typeid) =>
    //     status_data_mapping.includes(
    //       typeid?.ruleTierMappingKeyDto?.ruleConfigId &&
    //         typeid?.ruleTierMappingKeyDto?.ruleTierMappingId &&
    //         typeid?.ruleTierMappingKeyDto?.tierId
    //     )
    //   )
    //   .map((items) => {
    //     return `${items?.ruleConfigDto?.name}, ${items?.tiersConfigDTO?.tier_name}`;
    //   });
    // const now = new Date();
    // const timeStamp = date.format(now, "DD-MM-YYYY HH:mm:ss");
    // res.send({
    //   timestamp: timeStamp,
    //   code: "MCS00001",
    //   status: "success",
    //   message: "SUCCESS",
    //   description: null,
    //   data: {
    //     configStatusRequestList: destructure_status_res_data.map((item) => {
    //       const rule_uuid = filter_data_rule.map(
    //         (element2, index) => `[${element2}]${item.uuidList[index]}`
    //       );
    //       const tier_uuid = filter_data_tier.map(
    //         (element2, index) => `[${element2}]${item.uuidList[index]}`
    //       );
    //       const ruletiermapping_uuid = filter_data_ruletiermapp.map(
    //         (element2, index) => `[${element2}]${item.uuidList[index]}`
    //       );
    //       return {
    //         moduleName: item.moduleName,
    //         uuidList:
    //           item.moduleName === "TIER_CONFIG"
    //             ? tier_uuid
    //             : item.moduleName === "MASTER_CONFIG"
    //             ? item.uuidList
    //             : item.moduleName === "RULE_CONFIG"
    //             ? rule_uuid
    //             : item.moduleName === "RULE_TIER_MAPPING_CONFIG"
    //             ? ruletiermapping_uuid
    //             : null,
    //         status: item.status,
    //       };
    //     }),
    //   },
    // });
    let formated_data = response.data;
    res.send(formated_data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};
const statusConfigPostURL = async (req, res, next) => {
  const statusId = `${req.params.status_id}`;
  try {
    let data = JSON.stringify({
      moduleName: req.body.moduleName,
      uuid: req.body.uuid,
      status: req.body.status,
      reason: req.body.reason,
    });
    let response = await axiosInstance({
      method: "post",
      url: `${utils.API_CONFIG_POST}/${statusId}`,
      headers: { "content-type": "application/json" },
      data: data,
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    // console.log(error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { statusConfigGetURL, statusConfigPostURL };
