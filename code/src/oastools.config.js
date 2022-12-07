const path = require('path');
const logger = require('./config/logger');

const config = {
  logger: {
    level: 'info',
    customLogger: logger,
  },
  oasFile: path.join(__dirname, './oas-file.yaml'),
  middleware: {
    router: {
      controllers: path.join(__dirname, 'controllers'),
    },
    validator: {
      strict: true,
    },
  },
};

module.exports = config;
