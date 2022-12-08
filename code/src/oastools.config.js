import logger from "./config/logger.js";
import modernHttpErrorMiddleware from "./middlewares/modern-http-error.middleware.js";

export default {
  logger: {
    level: "info",
    customLogger: logger,
  },
  middleware: {
    error: {
      customHandler: modernHttpErrorMiddleware,
    },
    router: {
      controllers: "src/controllers",
    },
    validator: {
      strict: true,
    },
  },
};
