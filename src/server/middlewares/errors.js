require("dotenv").config();
const debug = require("debug")("socialnetwork:errors");
const chalk = require("chalk");

const error404 = (req, res) => {
  debug("error, not found");
  res.status(404).json({ msg: "error, not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  const errorCode = error.statusCode ?? 500;
  const errorMessage = error.statusCode ? error.customMessage : "server error";
  debug(chalk.red(`Error: ${error.message}`));
  res.status(errorCode).json({ msg: errorMessage });
};

module.exports = {
  error404,
  generalError,
};
