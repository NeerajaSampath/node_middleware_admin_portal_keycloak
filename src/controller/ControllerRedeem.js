const express = require("express");
const router = express.Router();
const keycloak = require("../config/keycloakConfig.js");
const utils = require("../Constant");
const Ledger = require("./SupportPortal/ledgerConfig");
const Bal = require("./ExternalPartners/FetchBalance");
const Reversal = require("./ExternalPartners/Reversal");
const Redeem = require("./ExternalPartners/Redeem");

router.get(
  `/customer/:entity_id`,
  keycloak.keycloakServerAuth.protect(utils.ROLE_SUPPORT_APP_REDEEM),
  Ledger.customerDetailsGetURL
);
router.get(
  "/balance/:entity_id",
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_REDEEM_SUPPORT),
  Bal.FetchBalGetURL
);
router.post(
  "/reversal",
  keycloak.keycloakServerAuth.protect(utils.ROLE_REDEMPTION_USER),
  Reversal.ReversalPostURL
);
router.post(
  "/redeem",
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_REDEEM),
  Redeem.RedeemPostURL
);

module.exports = router;
