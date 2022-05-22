require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { error404, generalError } = require("./middlewares/errors");
const usersRouters = require("./routers/usersRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.static("uploads"));
app.use(express.json());

app.use("/users", usersRouters);

app.use(error404);
app.use(generalError);

module.exports = app;
