require("dotenv").config();
const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");
const CryptoJS = require("crypto-js");
const key = utils.CRYTO_ENCRYPT_KEY;
const ivvar = utils.CRYTO_IV_KEY;

const ReversalPostURL = async (req, res, next) => {
  try {
    const decryptstring = req.body.entity_id;
    const value = decryptstring
      .toString()
      .replace(/\-/g, "+")
      .replace(/\_/g, "/");
    const decryptedStringHex = CryptoJS.AES.decrypt(value, key, {
      iv: ivvar,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decrypted_entity_id = decryptedStringHex.toString(CryptoJS.enc.Utf8);
    let data = {
      entity_id: decrypted_entity_id,
      ex_txn_id: req.body.ex_txn_id,
      channel_id: req.body.channel_id,
      points_to_reverse: req.body.points_to_reverse,
      reversal_reason: req.body.reversal_reason,
    };
    if (decrypted_entity_id == "") {
      res
        .status(409)
        .send(
          statusObject.Error_json(
            `${statusObject.HTTP_CODES_415}`,
            `${statusObject.HTTP_415_MSG}`,
            `${statusObject.HTTP_415_DESC}`
          )
        );
    } else {
      let response = await axiosInstance({
        method: "post",
        url: `/${utils.API_REVERSAL_POST}`,
        headers: { "content-type": "application/json" },
        data: data,
      });
      res.json(response.data);
    }
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { ReversalPostURL };
