const http = require('http');
const express = require('express');
const logger = require('./config/logger');
const healthService = require('./lib/handle-health-request'); // TODO: Change me to your service. Add more rows if multiple services
const serverInit = require('./server');

const expressInstance = express();

const serverPort = process.env.PORT || 3002;

const server = () =>
  serverInit(expressInstance, {
    logger,
    healthService, // TODO: change me according to your service name.
  });

const createServer = () =>
  new Promise((resolve, _reject) => {
    http.createServer(expressInstance).listen(serverPort, resolve);
  });

const logServerReady = () => {
  logger.info('health service is up and running');
  logger.info(`Log level: ${process.env.LOG_LEVEL}`);
};

server()
  .then(createServer)
  .then(logServerReady)
  .catch((e) => {
    logger.error('Failed to start server', e);
  });
