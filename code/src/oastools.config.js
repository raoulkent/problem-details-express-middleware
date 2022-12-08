import path from "path";
import { fileURLToPath } from "url";

import logger from "./config/logger.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  logger: {
    level: "info",
    customLogger: logger,
  },
  oasFile: path.join(dirname, "./api/oas-file.yaml"),
  middleware: {
    router: {
      controllers: path.join(dirname, "controllers"),
    },
    validator: {
      strict: true,
    },
  },
};
