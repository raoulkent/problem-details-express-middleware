import logger from "../config/logger.js";
import { BaseError } from "../errors/errors.js";

export default function errorMiddleware(err, _req, res, _next) {
  logger.info(`Error is instanceOf BaseError: ${err instanceof BaseError}`);
  logger.info(`Error is: ${JSON.stringify(err)}`);
  logger.info("------------------");
  if (err instanceof BaseError) {
    res.send(BaseError.httpResponse(err));
  }
}
