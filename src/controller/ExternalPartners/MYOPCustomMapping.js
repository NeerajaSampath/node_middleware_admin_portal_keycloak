require("dotenv").config();
const utils = require("../../Constant");
const statusObject = require("../../statusCodes");
const axiosInstance = require("../../axiosBase");
const CryptoJS = require("crypto-js");
const key = utils.CRYTO_ENCRYPT_KEY;
const ivvar = utils.CRYTO_IV_KEY;
const MyopCustomPutURL = async (req, res) => {
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
      channel_id: req.body.channel_id,
      entity_id: decrypted_entity_id,
      merchants: req.body.merchants,
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
        method: "put",
        url: `${utils.API_MYOP_CUSTOM_PUT_GET}`,
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
const MyopCustomGetURL = async (req, res) => {
  try {
    const decryptstring = req.params.entity_id;
    // const value = decryptstring.toString().replace(/\-/g, '+').replace(/\_/g, '/');
    // const decryptedStringHex = CryptoJS.AES.decrypt(value, key,
    //   {iv: ivvar,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7
    //   });
    // const decrypted_entity_id = decryptedStringHex.toString(CryptoJS.enc.Utf8);
    // if(decrypted_entity_id == ''){
    // res.status(409).send(statusObject.Error_json(`${statusObject.HTTP_CODES_415}`, `${statusObject.HTTP_415_MSG}`, `${statusObject.HTTP_415_DESC}`));
    // } else {
    // }
    let response = await axiosInstance({
      method: "get",
      url: `${utils.API_MYOP_CUSTOM_PUT_GET}/${decryptstring}`,
      headers: { "content-type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { MyopCustomPutURL, MyopCustomGetURL };
