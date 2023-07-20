const utils = require("../../Constant");
const axiosInstance = require("../../axiosBase");
const statusObject = require("../../statusCodes");
const CryptoJS = require("crypto-js");
const key = utils.CRYTO_ENCRYPT_KEY;
const key1 = utils.CRYTO_ENCRYPT_KEY;
const ivvar1 = utils.CRYTO_IV_KEY;
const ivvar = utils.CRYTO_IV_KEY;

const RedeemPostURL = async (req, res, next) => {
  try {
    //entity id encryption
    const encryptedstring = req.body.entity_id;
    const value = encryptedstring
      .toString()
      .replace(/\-/g, "+")
      .replace(/\_/g, "/");
    const encryptedStringHex = CryptoJS.AES.decrypt(value, key, {
      iv: ivvar,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decrypted_entity_id = encryptedStringHex.toString(CryptoJS.enc.Utf8);
    //account number encryption
    const encruptAccNo = req.body.customer_account_number;
    const AccNovalue = encruptAccNo
      .toString()
      .replace(/\-/g, "+")
      .replace(/\_/g, "/");
    const encryptedAccNo = CryptoJS.AES.decrypt(AccNovalue, key1, {
      iv: ivvar1,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decrypted_acc_no = encryptedAccNo.toString(CryptoJS.enc.Utf8);
    console.log("decrypted_acc_no", decrypted_acc_no);
    let data = {
      entity_id: decrypted_entity_id,
      ex_txn_id: req.body.ex_txn_id,
      channel_id: req.body.channel_id,
      points_to_redeem: req.body.points_to_redeem,
      redemption_reason: req.body.redemption_reason,
      is_cash_redemption: req.body.is_cash_redemption,
      customer_account_number: decrypted_acc_no,
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
    } else if (decrypted_acc_no === "") {
      res
        .status(409)
        .send(
          statusObject.Error_json(
            `${statusObject.HTTP_CODES_415}`,
            `${statusObject.HTTP_415_ACC_MSG}`,
            `${statusObject.HTTP_415_ACC_DESC}`
          )
        );
    } else {
      const response = await axiosInstance({
        method: "post",
        url: "/api/v1/redeem",
        data: data,
      });
      res.json(response.data);
    }
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { RedeemPostURL };
