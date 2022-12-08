import oasTools from "@oas-tools/core";
import express from "express";
import helmet from "helmet";

import config from "./oastools.config.js";

export default (server, { logger, healthService }) => {
  if (!logger) {
    throw Error("Logger not loaded");
  }

  server.use(express.json());

  server.use((req, _res, next) => {
    req.logger = logger;
    req.healthService = healthService; // TODO: Change me section to correspond to your service.

    if (req.body && req.body.message && req.body.message.data) {
      req.body = JSON.parse(
        Buffer.from(req.body.message.data, "base64").toString().trim()
      );
    }

    next();
  });

  // const __filename = fileURLToPath(import.meta.url);

  // const __dirname = path.dirname(__filename);

  // const config = {
  //   logger: {
  //     level: 'info',
  //     customLogger: logger,
  //   },
  //   oasFile: path.join(__dirname, './api/oas-file.yaml'),
  //   middleware: {
  //     router: {
  //       controllers: path.join(__dirname, 'controllers'),
  //     },
  //     validator: {
  //       strict: true,
  //     },
  //   },
  // };

  return new Promise((resolve) => {
    oasTools.use(helmet());

    oasTools.initialize(server, config).then(() => resolve(server));
  });
};
