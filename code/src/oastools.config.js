import path from "path";
import { fileURLToPath } from "url";

import logger from "./config/logger.js";
import modernHttpErrorMiddleware from "./middlewares/modern-http-error.middleware.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
      controllers: path.join(dirname, "controllers"),
    },
    validator: {
      strict: true,
    },
  },
};
