const express = require('express');
const router = express.Router();
const loginrouter = require("../controller/keycloakAPI");

router.post('/login', loginrouter.loginURL);
router.post('/refresh', loginrouter.refreshTokenURL);
router.post('/auth', loginrouter.AuthTokenURL);

module.exports = router;