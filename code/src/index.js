import { createServer as _createServer } from 'http';
import express from 'express';
import logger from './config/logger.js';
import serverInit from './server.js';

const expressInstance = express();

const serverPort = process.env.PORT || 3002;

const server = () =>
  serverInit(expressInstance, {
    logger,
  });

const createServer = () =>
  new Promise((resolve, _reject) => {
    _createServer(expressInstance).listen(serverPort, resolve);
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
