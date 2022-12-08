import { BaseError } from "../errors/errors.js";

export default (err, send) => {
  // eslint-disable-next-line no-unused-vars
  const { stack: _, ...httpResponse } = BaseError.httpResponse(err);
  const { status } = httpResponse;
  if (err instanceof BaseError) {
    send(status, httpResponse);
  }
};
