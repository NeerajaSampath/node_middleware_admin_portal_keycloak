require("dotenv").config();
const axios = require("axios");
const qs = require("qs");
const utils = require("../Constant");
const statusObject = require("../statusCodes");

const loginURL = async (req, res, next) => {
  try {
    let data = {
      username: req.body.username,
      password: req.body.password,
      client_id: utils.KEYCLOAK_PROD_CLIENT_ID,
      client_secret: utils.KEYCLOAK_CLIENT_SECRET,
      grant_type: utils.KEYCLOAK_GRANT_TYPE,
    };
    let response = await axios({
      method: "post",
      url: `${utils.KEYCLOAL_SERVER_URL}/realms/${utils.KEYCLOAK_PROD_REALM}/protocol/openid-connect/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
    });
    utils.acc_token_string = response.data.refresh_token;
    res.json(response.data);
  } catch (error) {
    statusObject.errorFn(error, res);
  }
};
const refreshTokenURL = async (req, res, next) => {
  try {
    let data = {
      client_id: utils.KEYCLOAK_PROD_CLIENT_ID,
      client_secret: utils.KEYCLOAK_CLIENT_SECRET,
      grant_type: `refresh_token`,
      refresh_token: req.body.refresh_token,
    };
    let response = await axios({
      method: "post",
      url: `${utils.KEYCLOAL_SERVER_URL}/realms/${utils.KEYCLOAK_PROD_REALM}/protocol/openid-connect/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
    });
    res.send(response.data);
  } catch (error) {
    statusObject.errorFn(error, res);
  }
};

const AuthTokenURL = async (req, res, next) => {
  try {
    let data = {
      client_id: req.body.client_id,
      client_secret: req.body.client_secret,
      grant_type: `${utils.KEYCLOAK_GRANT_TYPE_AUTH}`,
    };
    let response = await axios({
      method: "post",
      url: `${utils.KEYCLOAL_SERVER_URL}/realms/${utils.KEYCLOAK_PROD_REALM}/protocol/openid-connect/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};

module.exports = { loginURL, refreshTokenURL, AuthTokenURL };
