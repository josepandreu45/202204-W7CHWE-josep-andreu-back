require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { error404, generalError } = require("./middlewares/errors");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(error404);
app.use(generalError);

module.exports = app;
