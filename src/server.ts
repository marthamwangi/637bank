"use strict";
import mongoose from "mongoose";
import config from "./config/config";
import app from "./app";
const logger = require("pino")();
/**CONNECT MONGO*/
(async function () {
  await mongoose.connect(config.mongoURL);
  app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  })
})();

