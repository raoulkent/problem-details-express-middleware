import { createLogger, format, transports } from 'winston';

import { LoggingWinston } from '@google-cloud/logging-winston';

const consoleLogger = new transports.Console({
  format: format.combine(format.colorize(), format.simple()),
});

const stackdriverLogger = new LoggingWinston({
  projectId: process.env.PROJECT_ID,
  serviceContext: {
    service: 'timeCards-invoker',
  },
});

export default createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: ((env) => {
    if (env === 'development') {
      return [consoleLogger];
    }

    return [consoleLogger, stackdriverLogger];
  })(process.env.NODE_ENV),
});
