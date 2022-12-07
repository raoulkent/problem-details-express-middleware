import { join } from 'path';
import logger from './config/logger';

const config = {
  logger: {
    level: 'info',
    customLogger: logger,
  },
  oasFile: join(__dirname, './oas-file.yaml'),
  middleware: {
    router: {
      controllers: join(__dirname, 'controllers'),
    },
    validator: {
      strict: true,
    },
  },
};

export default config;
