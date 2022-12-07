// import http from 'http';
const http = require("http");
// import express from 'express';
const express = require("express");
// import Logger from './config/logger';
const logger = require("./config/logger");
// import your service to handle the logic for a request
const healthService = require("./lib/handle-health-request"); // TODO: Change me to your service. Add more rows if multiple services
// import serverInit from './server';
const serverInit = require("./server");

const expressInstance = express();
expressInstance.disable("x-powered-by");

const serverPort = process.env.PORT || 3002;

const server = () =>
  serverInit(expressInstance, {
    logger,
    healthService, // TODO: change me according to your service name.
  });

/* eslint-disable no-unused-vars */
const createServer = () =>
  new Promise((resolve, reject) => {
    http.createServer(expressInstance).listen(serverPort, resolve);
  });
/* eslint-enable no-unused-vars */

const logServerReady = () => {
  logger.info("health service is up and running");
  logger.info(`Log level: ${process.env.LOG_LEVEL}`);
};

server()
  .then(createServer)
  .then(logServerReady)
  .catch((e) => {
    logger.error("Failed to start server", e);
  });
