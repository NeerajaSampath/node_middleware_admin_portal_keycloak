require("dotenv").config();
const utils = require("../../Constant");
const statusObject = require("../../statusCodes");
const axiosInstance = require("../../axiosBase");
const CryptoJS = require("crypto-js");
const key = utils.CRYTO_ENCRYPT_KEY;
const ivvar = utils.CRYTO_IV_KEY;
const ExternalEventPostURL = async (req, res) => {
  try {
    const decryptstring = req.body.entityId;
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
      entityId: decrypted_entity_id,
      txnType: req.body.txnType,
      txnOrigin: req.body.txnOrigin,
      acquirerId: req.body.txnOrigin,
      extTxnId: req.body.txnOrigin,
      amount: req.body.amount,
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
        url: `${utils.API_EXTERNAL_EVENT_POST}`,
        headers: { "content-type": "application/json" },
        data: data,
      });
      res.json(response.data);
    }
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { ExternalEventPostURL };
