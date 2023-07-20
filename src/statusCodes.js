const date = require("date-and-time");
const HTTP_STATUSCODE_405 = 405;
const HTTP_STATUSCODE_404 = 404;
const HTTP_STATUSCODE_400 = 400;
const HTTP_STATUSCODE_401 = 401;
const HTTP_STATUSCODE_403 = 403;
const HTTP_STATUSCODE_409 = 409;
const HTTP_STATUSCODE_415 = 415;
const HTTP_STATUSCODE_500 = 500;
const HTTP_STATUSCODE_501 = 501;
const HTTP_STATUSCODE_503 = 503;
const HTTP_STATUSCODE_502 = 502;
const HTTP_STATUSCODE_504 = 504;

const HTTP_CODES_404 = "ERR000404";
const HTTP_CODES_405 = "ERR000405";
const HTTP_CODES_500 = "ERR000500";
const HTTP_CODES_401 = "ERR000401";
const HTTP_CODES_403 = "ERR000403";
const HTTP_CODES_415 = "ERR000415";
const HTTP_CODES_501 = "ERR000501";
const HTTP_CODES_502 = "ERR000502";
const HTTP_CODES_503 = "ERR000503";

const HTTP_415_MSG = "EntityId not encrypted properly";
const HTTP_415_DESC =
  "The entityid seems plain text or not encrypted propertly";
const HTTP_415_ACC_MSG = "Account Number not encrypted properly";
const HTTP_415_ACC_DESC =
  "The Account Number seems plain text or not encrypted propertly";

const Error_json = (codes, message, desc) => {
  const now = new Date();
  const timeStamp = date.format(now, "DD-MM-YYYY HH:mm:ss");
  return {
    timestamp: timeStamp,
    code: codes,
    status: "error",
    message: message,
    description: desc,
    data: null,
    pageable_response: null,
  };
};

const errorFn = (error, res) => {
  console.log("error from status object", error);
  // if (error.response.status === 503 || error.response.status === 502) {
  //   res.status(error.response.status).json(error.response.data);
  // } else
  if (error.response) {
    // The request was made, but the server responded with an error status
    res.status(error.response.status).json(error.response.data);
  } else if (error.request) {
    // The request was made, but no response was received
    res
      .status(500)
      .json(
        Error_json(
          `${HTTP_CODES_500}`,
          "Internal server error",
          "Internal server error"
        )
      );
  } else {
    // Something happened in setting up the request that triggered an error
    console.log("error slash", error);
    res
      .status(500)
      .json(
        Error_json(
          `${HTTP_CODES_500}`,
          "Internal server error",
          "Internal server error"
        )
      );
  }
  // if (error?.message == "Request failed with status code 409") {
  //   res.status(HTTP_STATUSCODE_409);
  //   res.json(error?.response?.data);
  // } else if (error?.message === "Request failed with status code 400") {
  //   res.status(HTTP_STATUSCODE_400).send(error.response.data);
  // } else if (error?.message === "Request failed with status code 404") {
  //   res.status(HTTP_STATUSCODE_404).send(error.response.data);
  // } else if (error?.message === "Request failed with status code 405") {
  //   res
  //     .status(HTTP_STATUSCODE_405)
  //     .send(
  //       Error_json(
  //         `${HTTP_CODES_405}`,
  //         "Method Not Allowed",
  //         "Method Not Allowed"
  //       )
  //     );
  // } else if (error?.message === "Request failed with status code 500") {
  //   res
  //     .status(HTTP_STATUSCODE_500)
  //     .send(
  //       Error_json(
  //         `${HTTP_CODES_500}`,
  //         "Internal Server Error",
  //         "Internal Server Error"
  //       )
  //     );
  // } else if (error?.message === "Request failed with status code 501") {
  //   res
  //     .status(HTTP_STATUSCODE_501)
  //     .send(
  //       Error_json(`${HTTP_CODES_501}`, "Not Implemented", "Not Implemented")
  //     );
  // } else if (error?.message === "Request failed with status code 503") {
  //   res
  //     .status(HTTP_STATUSCODE_503)
  //     .send(
  //       Error_json(
  //         `${HTTP_CODES_503}`,
  //         "503 Service Temporarily Unavailable",
  //         "503 Service Temporarily Unavailable"
  //       )
  //     );
  // } else if (error?.message === "Request failed with status code 502") {
  //   res
  //     .status(HTTP_STATUSCODE_502)
  //     .send(
  //       Error_json(
  //         `${HTTP_CODES_502}`,
  //         "502 Service Temporarily Unavailable",
  //         "502 Service Temporarily Unavailable"
  //       )
  //     );
  // } else if (error?.message === "Request failed with status code 401") {
  //   res
  //     .status(HTTP_STATUSCODE_401)
  //     .send(
  //       Error_json(
  //         `${HTTP_CODES_401}`,
  //         "Invalid Credentials",
  //         "Invalid Credentials"
  //       )
  //     );
  // } else if (error?.message === "Request failed with status code 415") {
  //   res
  //     .status(HTTP_STATUSCODE_415)
  //     .send(
  //       Error_json(
  //         `${HTTP_CODES_415}`,
  //         "Unsupported media type",
  //         "Unsupported media type"
  //       )
  //     );
  // } else {
  //   res.status(500).send(error);
  // }
};

module.exports = {
  HTTP_STATUSCODE_405,
  HTTP_STATUSCODE_400,
  HTTP_STATUSCODE_404,
  HTTP_STATUSCODE_409,
  HTTP_STATUSCODE_500,
  HTTP_STATUSCODE_503,
  HTTP_STATUSCODE_504,
  HTTP_CODES_404,
  HTTP_CODES_405,
  HTTP_CODES_401,
  HTTP_STATUSCODE_403,
  HTTP_STATUSCODE_401,
  HTTP_CODES_403,
  HTTP_STATUSCODE_415,
  HTTP_CODES_415,
  HTTP_CODES_501,
  HTTP_STATUSCODE_501,
  HTTP_415_DESC,
  HTTP_415_MSG,
  HTTP_415_ACC_MSG,
  HTTP_415_ACC_DESC,
  Error_json,
  errorFn,
};
