var session = require("express-session");
var Keycloak = require("keycloak-connect");
const utils = require("../Constant");

const memoryStore = new session.MemoryStore();

const keycloakConfig = {
  realm: utils.KEYCLOAK_PROD_REALM,
  serverUrl: utils.KEYCLOAL_SERVER_URL,
  grantType: utils.KEYCLOAK_GRANT_TYPE,
};
//other client keycloak config :
const keycloakConfigServer = {
  serverUrl: utils.KEYCLOAL_SERVER_URL,
  realm: utils.KEYCLOAK_PROD_REALM,
  grantType: utils.KEYCLOAK_GRANT_TYPE_AUTH,
};

const keycloak = new Keycloak(
  { scope: "openid", store: memoryStore },
  keycloakConfig
);
const keycloakServerAuth = new Keycloak(
  { scope: "openid", store: memoryStore },
  keycloakConfigServer
);

module.exports = { keycloak, keycloakServerAuth };
