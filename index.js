require("dotenv").config();
const debug = require("debug")("socialnetwork:root");
const initializeServer = require("./src/server/initializeServer");

const conectDB = require("./src/database/index");

(async () => {
  try {
    await conectDB(process.env.MONGODB_STRING);
    await initializeServer(process.env.SERVER_PORT || 3000);
  } catch (error) {
    debug("Error ocurred");
  }
})();
