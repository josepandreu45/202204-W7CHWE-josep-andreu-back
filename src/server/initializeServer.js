require("dotenv").config();
const debug = require("debug")("socialnetwork:server");
const app = require("./index");

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(`server listen on port ${port}`);
  });
  server.on("error", (error) => {
    debug("error on server");
    if (error.code === "EADDRINUSE") {
      debug(`Port ${port} is in use`);
    }
  });
};

module.exports = initializeServer;
