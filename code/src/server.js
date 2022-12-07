import { initialize, use } from '@oas-tools/core';

import express from 'express';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import path from 'path';

// const { config } = require('./oastools.config');

export default (server, { logger, healthService }) => {
  if (!logger) {
    throw Error('Logger not loaded');
  }

  server.use(express.json());

  server.use((req, _res, next) => {
    req.logger = logger;
    req.healthService = healthService; // TODO: Change me section to correspond to your service.

    if (req.body && req.body.message && req.body.message.data) {
      req.body = JSON.parse(
        Buffer.from(req.body.message.data, 'base64').toString().trim()
      );
    }

    next();
  });

  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const config = {
    logger: {
      level: 'info',
      customLogger: logger,
    },
    oasFile: path.join(__dirname, './api/oas-file.yaml'),
    middleware: {
      router: {
        controllers: path.join(__dirname, 'controllers'),
      },
      validator: {
        strict: true,
      },
    },
  };

  return new Promise((resolve) => {
    use(helmet());

    initialize(server, config).then(() => resolve(server));
  });
};
