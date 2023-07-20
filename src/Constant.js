require("dotenv").config();
const CryptoJS = require("crypto-js");
const date = require("date-and-time");
const jwt_decode = require("jwt-decode");

const SERVER_PORT = process.env.PORT;
const KEYCLOAL_SERVER_URL = process.env.KEYCLOAL_SERVER_URL;
const KEYCLOAL_PROD_SERVER_URL = process.env.KEYCLOAL_PROD_SERVER_URL;
const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
const KEYCLOAK_PROD_REALM = process.env.KEYCLOAK_PROD_REALM;
const KEYCLOAK_PROD_CLIENT_ID = process.env.KEYCLOAK_PROD_CLIENT_ID;
const KEYCLOAK_PROD_CLIENT_SECRET = process.env.KEYCLOAK_PROD_CLIENT_SECRET;
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
const KEYCLOAK_GRANT_TYPE = process.env.KEYCLOAK_GRANT_TYPE;
const KEYCLOAK_ADMIN_CHECKER = process.env.KEYCLOAK_ADMIN_CHECKER;
const KEYCLOAK_ADMIN_MAKER = process.env.KEYCLOAK_ADMIN_MAKER;
const KEYCLOAK_ADMIN_SUPPORT = process.env.KEYCLOAK_ADMIN_SUPPORT;
const KEYCLOAK_REDEMPTION_PARTNER = process.env.KEYCLOAK_REDEMPTION_PARTNER;
const KEYCLOAK_APP_PARTNER = process.env.KEYCLOAK_APP_PARTNER;
const KEYCLOAK_GRANT_TYPE_AUTH = process.env.KEYCLOAK_GRANT_TYPE_AUTH;
const API_BASE_URL_DEV = process.env.API_BASE_URL_DEV;
const API_BASE_URL_UAT = process.env.API_BASE_URL_UAT;
const API_BASE_URL_INDUAT = process.env.API_BASE_URL_INDUAT;
const API_BASE_URL_INDUS_PROD = process.env.API_BASE_URL_INDUS_PROD;
const API_TIER = process.env.API_TIER;
const API_RULE_POST = process.env.API_RULE_POST;
const API_RULE_GET = process.env.API_RULE_GET;
const API_EXPIRY = process.env.API_EXPIRY;
const API_PAGE_SIZE = process.env.API_PAGE_SIZE;
const API_LEDGER = process.env.API_LEDGER;
const API_CUSTOMER = process.env.API_CUSTOMER;
const ENCRYPT_SECRECT_KEY = process.env.ENCRYPT_SECRECT_KEY;
const ENCRYPT_PROD_SECRECT_KEY = process.env.ENCRYPT_PROD_SECRECT_KEY;
const API_MASTERCONFIG = process.env.API_MASTERCONFIG;
const API_TYPES = process.env.API_TYPES;
const API_RULE_TIER_MAPPING_POST = process.env.API_RULE_TIER_MAPPING_POST;
const API_RULE_TIER_MAPPING_GET = process.env.API_RULE_TIER_MAPPING_GET;
const API_CONFIG_GET = process.env.API_CONFIG_GET;
const API_CONFIG_POST = process.env.API_CONFIG_POST;
const API_MYOP_POST = process.env.API_MYOP_POST;
const API_MYOP_GET = process.env.API_MYOP_GET;
const API_MCC = process.env.API_MCC;
const API_HOME = process.env.API_HOME;
const API_BALANCE_GET = process.env.API_BALANCE_GET;
const API_REFERRAL_GET = process.env.API_REFERRAL_GET;
const API_EXTERNAL_EVENT_POST = process.env.API_EXTERNAL_EVENT_POST;
const API_MYOP_CUSTOM_PUT_GET = process.env.API_MYOP_CUSTOM_PUT_GET;
const API_REDEEM_POST = process.env.API_REDEEM_POST;
const API_REVERSAL_POST = process.env.API_REVERSAL_POST;
const API_SINGLE_RULE_TIER_MAPPING_POST =
  process.env.API_SINGLE_RULE_TIER_MAPPING_POST;
const API_SINGLE_RULE_POST = process.env.API_SINGLE_RULE_POST;
const CRYTO_ENCRYPT_KEY = CryptoJS.enc.Base64.parse(
  `${process.env.ENCRYPT_SECRECT_KEY}`
);
const CRYTO_ENCRYPT_PROD_KEY = CryptoJS.enc.Base64.parse(
  `${process.env.ENCRYPT_PROD_SECRECT_KEY}`
);
const CRYTO_IV_KEY = CryptoJS.enc.Hex.parse(0);
const page_Details = ``;
const acc_token_string = "";
const ROLE_ALL_USER = (token, request) => {
  return (
    token.hasRole(`${process.env.KEYCLOAK_ADMIN_MAKER}`) ||
    token.hasRole(`${process.env.KEYCLOAK_ADMIN_CHECKER}`) ||
    token.hasRole(`${process.env.KEYCLOAK_ADMIN_SUPPORT}`) ||
    token.hasRole(`${process.env.KEYCLOAK_APP_PARTNER}`) ||
    token.hasRole(`${process.env.KEYCLOAK_REDEMPTION_PARTNER}`)
  );
};
const ROLE_MAKER_USER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_MAKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_MAKER}`;
    }
  } else {
    return null;
  }
};
const ROLE_CHECKER_USER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_CHECKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_CHECKER}`;
    }
  } else {
    return null;
  }
};
const ROLE_MAKE_CHECK_USER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_MAKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_MAKER}`;
    } else if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_CHECKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_CHECKER}`;
    }
  } else {
    return null;
  }
};
const ROLE_MAKE_SUPPORT_USER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_MAKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_MAKER}`;
    } else if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_SUPPORT}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_SUPPORT}`;
    }
  } else {
    return null;
  }
};
const ROLE_MAKE_CHECKER_SUPPORT_USER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_MAKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_MAKER}`;
    } else if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_SUPPORT}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_SUPPORT}`;
    } else if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_CHECKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_CHECKER}`;
    }
  } else {
    return null;
  }
};
const ROLE_APP_PARTNER_USER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_APP_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_APP_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_APP_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_APP_PARTNER}`;
    }
  } else {
    return null;
  }
};
const ROLE_APP_PARTNER_SUPPORT_USER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_APP_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_APP_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_APP_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_APP_PARTNER}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_SUPPORT}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_SUPPORT}`;
    }
  } else {
    return null;
  }
};
const ROLE_REDEMPTION_USER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_REDEMPTION_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`;
    }
  } else {
    return null;
  }
};
const ROLE_APP_REDEMPTION_USER = (token, request) => {
  if (
    token?.content?.azp === `${process.env.KEYCLOAK_REDEMPTION_PARTNER}` ||
    `${process.env.KEYCLOAK_APP_PARTNER}`
  ) {
    return (
      token.hasRole(`${process.env.KEYCLOAK_REDEMPTION_PARTNER}`) ||
      token.hasRole(`${process.env.KEYCLOAK_APP_PARTNER}`)
    );
  } else {
    return null;
  }
};
const ROLE_APP_REDEEM = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_REDEMPTION_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_APP_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_APP_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_APP_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_APP_PARTNER}`;
    }
  } else {
    return null;
  }
};
const ROLE_APP_REDEEM_SUPPORT = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_REDEMPTION_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_APP_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_APP_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_APP_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_APP_PARTNER}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_SUPPORT}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_SUPPORT}`;
    }
  } else {
    return null;
  }
};
const ROLE_APP_SUPPORT = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_SUPPORT}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_SUPPORT}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_APP_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_APP_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_APP_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_APP_PARTNER}`;
    }
  } else {
    return null;
  }
};
const ROLE_APP_MAKER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_MAKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_MAKER}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_APP_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_APP_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_APP_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_APP_PARTNER}`;
    }
  } else {
    return null;
  }
};

const ROLE_APP_MAKER_CHECKER = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_MAKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_MAKER}`;
    } else if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_CHECKER}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_CHECKER}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_APP_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_APP_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_APP_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_APP_PARTNER}`;
    }
  } else {
    return null;
  }
};
const ROLE_SUPPORT_APP_REDEEM = (token, request) => {
  const decoded = jwt_decode(token?.token);
  if (decoded?.azp === `${process.env.KEYCLOAK_PROD_CLIENT_ID}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_PROD_CLIENT_ID}`
      ]?.roles.includes(`${process.env.KEYCLOAK_ADMIN_SUPPORT}`)
    ) {
      return `${process.env.KEYCLOAK_ADMIN_SUPPORT}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_REDEMPTION_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_REDEMPTION_PARTNER}`;
    }
  } else if (decoded?.azp === `${process.env.KEYCLOAK_APP_PARTNER}`) {
    if (
      decoded?.resource_access[
        `${process.env.KEYCLOAK_APP_PARTNER}`
      ]?.roles.includes(`${process.env.KEYCLOAK_APP_PARTNER}`)
    ) {
      return `${process.env.KEYCLOAK_APP_PARTNER}`;
    }
  } else {
    return null;
  }
};

module.exports = {
  SERVER_PORT,
  KEYCLOAL_PROD_SERVER_URL,
  KEYCLOAK_PROD_CLIENT_SECRET,
  KEYCLOAK_PROD_CLIENT_ID,
  KEYCLOAK_PROD_REALM,
  API_BASE_URL_INDUS_PROD,
  KEYCLOAL_SERVER_URL,
  KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_GRANT_TYPE,
  KEYCLOAK_ADMIN_MAKER,
  KEYCLOAK_ADMIN_CHECKER,
  KEYCLOAK_ADMIN_SUPPORT,
  API_BASE_URL_DEV,
  API_TIER,
  API_RULE_POST,
  API_RULE_GET,
  API_EXPIRY,
  API_PAGE_SIZE,
  API_LEDGER,
  API_CUSTOMER,
  ENCRYPT_SECRECT_KEY,
  ENCRYPT_PROD_SECRECT_KEY,
  acc_token_string,
  CRYTO_ENCRYPT_KEY,
  CRYTO_ENCRYPT_PROD_KEY,
  CRYTO_IV_KEY,
  API_MASTERCONFIG,
  API_TYPES,
  API_RULE_TIER_MAPPING_POST,
  API_RULE_TIER_MAPPING_GET,
  API_MYOP_GET,
  API_MYOP_POST,
  API_MCC,
  API_HOME,
  API_BASE_URL_UAT,
  API_BASE_URL_INDUAT,
  page_Details,
  API_CONFIG_GET,
  API_CONFIG_POST,
  KEYCLOAK_GRANT_TYPE_AUTH,
  KEYCLOAK_REDEMPTION_PARTNER,
  API_BALANCE_GET,
  KEYCLOAK_APP_PARTNER,
  API_REFERRAL_GET,
  API_EXTERNAL_EVENT_POST,
  API_MYOP_CUSTOM_PUT_GET,
  API_REDEEM_POST,
  API_REVERSAL_POST,
  API_SINGLE_RULE_TIER_MAPPING_POST,
  API_SINGLE_RULE_POST,
  ROLE_MAKER_USER,
  ROLE_ALL_USER,
  ROLE_MAKE_CHECK_USER,
  ROLE_MAKE_SUPPORT_USER,
  ROLE_APP_PARTNER_USER,
  ROLE_REDEMPTION_USER,
  ROLE_APP_REDEMPTION_USER,
  ROLE_APP_REDEEM,
  ROLE_APP_MAKER,
  ROLE_SUPPORT_APP_REDEEM,
  ROLE_APP_SUPPORT,
  ROLE_MAKER_USER,
  ROLE_CHECKER_USER,
  ROLE_MAKE_CHECKER_SUPPORT_USER,
  ROLE_APP_MAKER_CHECKER,
  ROLE_APP_REDEEM_SUPPORT,
  ROLE_APP_PARTNER_SUPPORT_USER,
};
