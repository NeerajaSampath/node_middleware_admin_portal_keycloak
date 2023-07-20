const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const utils = require("./Constant");
const loginRoute = require("./routes/loginrouter");
const keycloak = require("./config/keycloakConfig.js");
const Controller = require("./controller/controller");
const app_controller = require("./controller/ControllerApp");
const redeem_controller = require("./controller/ControllerRedeem");
const morgan = require("morgan");
const ErrorHandle = require("./Errorhandle");
const statusObject = require("./statusCodes");
const cors = require("cors");
const session = require("express-session");

const PORT = utils.SERVER_PORT || 8080;
//cors allow
CorsOriginURL = [
  "http://localhost:3000",
  "https://uat-indusind.m2pfintech.com",
  "https://dev-loyalty.m2pfintech.com",
  "https://uat-loyalty.m2pfintech.com",
];

app.use(
  cors({
    origin: CorsOriginURL,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  })
);
//getting status code in console [dev purpose]
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//middleware function
//login api config routing
app.use("/api/v1", loginRoute);
const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
//keycloak middleware config for other api
app.use(keycloak.keycloak.middleware());
app.use("/api/v1", Controller);
app.use(keycloak.keycloakServerAuth.middleware());
app.use("/api/v1", app_controller);
app.use("/api/v1", redeem_controller);
//error handling
app.use(ErrorHandle);
//404 error handling 404
app.use((req, res, next) => {
  res.status(404);
  res.send(
    statusObject.Error_json(
      `${statusObject.HTTP_CODES_404}`,
      "File not found",
      "File not found"
    )
  );
});
//server up
app.get("/", function (req, res) {
  res.send("Server is up!");
});
app.listen(PORT, () => {
  console.log(`server started on : ${PORT}`);
});
