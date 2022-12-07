const { transports, createLogger, format } = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const consoleLogger = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
});

const stackdriverLogger = new LoggingWinston({
  projectId: process.env.PROJECT_ID,
  serviceContext: {
    service: 'timeCards-invoker',
  },
});

module.exports = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: ((env) => {
    if (env === 'development') {
      return [consoleLogger];
    }

    return [
      consoleLogger,
      stackdriverLogger,
    ];
  })(process.env.NODE_ENV),
});
