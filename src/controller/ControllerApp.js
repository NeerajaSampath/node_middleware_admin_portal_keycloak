const express = require("express");
const router = express.Router();
const keycloak = require("../config/keycloakConfig.js");
const utils = require("../Constant");
const Ledger = require("./SupportPortal/ledgerConfig");
const ReferralList = require("./ExternalPartners/ReferralList");
const Myop = require("./Maker/myopConfig");
const ExternalEvents = require("./ExternalPartners/ExternalEvent");
const MyopCustomMap = require("./ExternalPartners/MYOPCustomMapping");

router.get(
  `/ledger/:entity_id/:from_date/:to_date/:pageNo/:pageSize`,
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_SUPPORT),
  Ledger.ledgerGetURL
);
router.get(
  "/referral/:entity_id/:pageNo/:pageSize",
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_PARTNER_USER),
  ReferralList.ReferralListGetURL
);
router.post(
  "/myop/configs",
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_MAKER),
  Myop.myopPostURL
);
router.get(
  "/myop/:pageNo/:pageSize",
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_MAKER_CHECKER),
  Myop.myopGetURL
);
router.post(
  "/events",
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_PARTNER_USER),
  ExternalEvents.ExternalEventPostURL
);
router.put(
  "/customer/myop",
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_PARTNER_USER),
  MyopCustomMap.MyopCustomPutURL
);
router.get(
  "/customer/myop/:entity_id",
  keycloak.keycloakServerAuth.protect(utils.ROLE_APP_PARTNER_SUPPORT_USER),
  MyopCustomMap.MyopCustomGetURL
);

module.exports = router;
