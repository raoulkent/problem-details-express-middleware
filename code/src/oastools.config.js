import path from "path";
import { fileURLToPath } from "url";

import logger from "./config/logger.js";
import { BaseError } from "./errors/errors.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  logger: {
    level: "info",
    customLogger: logger,
  },
  oasFile: path.join(dirname, "./api/oas-file.yaml"),
  middleware: {
    error: {
      customHandler: (err, send) => {
        logger.info(
          `Error is instanceOf BaseError: ${err instanceof BaseError}`
        );
        logger.info(`Error is: ${JSON.stringify(err)}`);
        logger.info("------------------");
        const { stack: _, ...rest } = BaseError.httpResponse(err);
        if (err instanceof BaseError) {
          send(rest.status, rest);
        }
      },
    },
    router: {
      controllers: path.join(dirname, "controllers"),
    },
    validator: {
      strict: true,
    },
  },
};
