const express = require("express");
const router = express.Router();
const keycloak = require("../config/keycloakConfig.js");
const Tier = require("./Maker/tierConfig");
const Rule = require("./Maker/ruleConfig");
const Expiry = require("./Maker/expirationConfig");
const Master = require("./Maker/masterConfig");
const Type = require("./Maker/typeConfig");
const RuleTier = require("./Maker/ruleTierConfig");
const Mcc = require("./Maker/mccConfig");
const Home = require("./home");
const statusConfig = require("./Checker/statusConfig");
const utils = require("../Constant");
const Ledger = require("./SupportPortal/ledgerConfig");

//maker
router.get(
  "/tiers/:pageNo/:pageSize",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECKER_SUPPORT_USER),
  Tier.tierGetURL
);
router.get(
  "/tiers/:id",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECKER_SUPPORT_USER),
  Tier.PertierGetURL
);
router.get(
  "/rule/configs/:pageNo/:pageSize",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECK_USER),
  Rule.ruleGetURL
);
router.get(
  "/rule/configs/:id",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECK_USER),
  Rule.PerruleGetURL
);
router.get(
  "/expirations/:pageNo/:pageSize",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECK_USER),
  Expiry.expiryGetURL
);
router.get(
  "/master/config",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECK_USER),
  Master.masterConfigGetURL
);
router.get(
  "/master/config/:pageNo/:pageSize",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECK_USER),
  Master.masterConfigAllGetURL
);
router.get(
  "/types/:pageNo/:pageSize",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Type.typesGetURL
);
router.get(
  "/rule/tier/page/:pageNo/:pageSize",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECK_USER),
  RuleTier.ruleTierGetURL
);
router.get(
  "/rule/tier/page/:id",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  RuleTier.PerruleTierGetURL
);
router.get(
  "/mcc",
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECK_USER),
  Mcc.mccGetURL
);
router.get(
  `/dashboard/ledger/:from_date/:to_date`,
  keycloak.keycloak.protect(utils.ROLE_MAKE_CHECK_USER),
  Home.homeGetURL
);
router.post(
  "/mcc",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Mcc.mccPostURL
);
router.post(
  "/rule/tiers",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  RuleTier.multiruleTierPostURL
);
router.post(
  "/rules/configs",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Rule.MultirulePostURL
);
router.post(
  "/rule/configs",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Rule.SinglerulePostURL
);
router.put(
  "/rule/configs/:config_id/:is_active",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Rule.ruleEnablePutURL
);
router.post(
  "/types",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Type.typesPostURL
);
router.post(
  "/expiration",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Expiry.expiryPostURL
);
router.post(
  "/tiers",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Tier.tierPostURL
);
router.put(
  "/tiers/:config_id/:is_active",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Tier.tierEnablePutURL
);
router.post(
  "/master/config",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Master.masterConfigPostURL
);
router.put(
  "/master/config/:config_id/:is_active",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  Master.masterConfigEnablePutURL
);

router.post(
  "/rule/tier",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  RuleTier.SingleruleTierPostURL
);
router.put(
  "/rule/tier/:config_id/:is_active",
  keycloak.keycloak.protect(utils.ROLE_MAKER_USER),
  RuleTier.ruleTierEnablePutURL
);

//checker portal
router.get(
  `/configs/status/:status_id`,
  keycloak.keycloak.protect(utils.ROLE_CHECKER_USER),
  statusConfig.statusConfigGetURL
);
router.post(
  `/configs/:status_id`,
  keycloak.keycloak.protect(utils.ROLE_CHECKER_USER),
  statusConfig.statusConfigPostURL
);

//support portal
router.get("/decryption/:entity_id", Ledger.DecryptGetURL);

module.exports = router;
