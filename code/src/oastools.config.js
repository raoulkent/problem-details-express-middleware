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
        // eslint-disable-next-line no-unused-vars
        const { stack: _, ...httpResponse } = BaseError.httpResponse(err);
        const { status } = httpResponse;
        if (err instanceof BaseError) {
          send(status, httpResponse);
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
