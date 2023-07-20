require("dotenv").config();
const utils = require("../../Constant");
const statusObject = require("../../statusCodes");
const axiosInstance = require("../../axiosBase");
const CryptoJS = require("crypto-js");
const key = utils.CRYTO_ENCRYPT_KEY;
const ivvar = utils.CRYTO_IV_KEY;
const customerDetailsGetURL = async (req, res) => {
  try {
    // const decryptstring = req.params.entity_id;
    // const value = decryptstring
    //   .toString()
    //   .replace(/\-/g, "+")
    //   .replace(/\_/g, "/");
    // const decryptedStringHex = CryptoJS.AES.decrypt(value, key, {
    //   iv: ivvar,
    //   mode: CryptoJS.mode.CBC,
    //   padding: CryptoJS.pad.Pkcs7,
    // });
    // const decrypted_entity_id = decryptedStringHex.toString(CryptoJS.enc.Utf8);
    // if (decrypted_entity_id == "") {
    //   res
    //     .status(409)
    //     .send(
    //       statusObject.Error_json(
    //         `${statusObject.HTTP_CODES_415}`,
    //         `${statusObject.HTTP_415_MSG}`,
    //         `${statusObject.HTTP_415_DESC}`
    //       )
    //     );
    //   console.log("decrypt is empty");
    // } else {
    // }
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_CUSTOMER}/${req.params.entity_id}`,
      headers: { "content-type": "application/json" },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};
const DecryptGetURL = async (req, res) => {
  try {
    const valueStringHex = req.params.entity_id;
    const encryptedStringHex = CryptoJS.AES.encrypt(valueStringHex, key, {
      iv: ivvar,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const data = encryptedStringHex
      .toString()
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    res.json({ data: data });
  } catch (error) {
    console.log("errore", error);
    res.send(error);
  }
};
const ledgerGetURL = async (req, res) => {
  utils.page_Details = `${req.params.pageNo}/${req.params.pageSize}`;
  try {
    const date_id = `${req.params.from_date}/${req.params.to_date}`;
    const decryptstring = req.params.entity_id;
    const value = decryptstring.toString();
    //decrypt process for the base64url
    // .replace(/\-/g, "+")
    // .replace(/\_/g, "/");
    // const decryptedStringHex = CryptoJS.AES.decrypt(value, key, {
    //   iv: ivvar,
    //   mode: CryptoJS.mode.CBC,
    //   padding: CryptoJS.pad.Pkcs7,
    // });
    // const decrypted_entity_id = decryptedStringHex.toString(CryptoJS.enc.Utf8);
    // if (decrypted_entity_id == "") {
    //   res
    //     .status(409)
    //     .send(
    //       statusObject.Error_json(
    //         `${statusObject.HTTP_CODES_415}`,
    //         `${statusObject.HTTP_415_MSG}`,
    //         `${statusObject.HTTP_415_ACC_DESC}`
    //       )
    //     );
    // } else {
    // }
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_LEDGER}/${value}/${date_id}/${utils.page_Details}`,
      headers: {
        "content-type": "application/json",
      },
    });
    var format_data = response.data;
    res.send(format_data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { customerDetailsGetURL, DecryptGetURL, ledgerGetURL };
