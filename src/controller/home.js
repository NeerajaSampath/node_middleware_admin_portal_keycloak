require("dotenv").config();
const utils = require("../Constant");
const statusObject = require("../statusCodes");
const axiosInstance = require("../axiosBase");
const homeGetURL = async (req, res) => {
  try {
    const date_id = `${req.params.from_date}/${req.params.to_date}`;
    let response = await axiosInstance({
      method: "get",
      url: `/${utils.API_HOME}/${date_id}`,
      headers: { "content-type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.log("error", error);
    statusObject.errorFn(error, res);
  }
};
module.exports = { homeGetURL };
