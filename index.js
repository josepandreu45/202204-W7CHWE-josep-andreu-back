require("dotenv").config();

const initializeServer = require("./src/server/initializeServer");

initializeServer(process.env.PORT || 3000);
