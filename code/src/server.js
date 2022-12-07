const bodyParser = require('body-parser');
const oasT = require('@oas-tools/core');
const helmet = require('helmet');
const path = require('path');
// const { config } = require('./oastools.config');

module.exports = (server, { logger, healthService }) => {
  if (!healthService) {
    // TODO: Change me section to correspond to your service.
    throw Error('healthService publisher not loaded');
  }
  if (!logger) {
    throw Error('Logger not loaded');
  }

  server.use(
    bodyParser.json({
      strict: false,
    })
  );

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
    oasT.use(helmet());

    oasT.initialize(server, config).then(() => resolve(server));
  });
};
