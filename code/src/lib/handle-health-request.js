import { AuthError } from "../errors/errors.js";

const failsSometimes = () =>
  new Promise((resolve, reject) => {
    const random = Math.random();
    if (random > 0.5) {
      resolve();
    }
    reject(new AuthError("Random error"));
  });

export default function getSomething(requestBody, logger) {
  let calledWith;
  try {
    failsSometimes();
    calledWith = JSON.stringify(requestBody);
  } catch (e) {
    calledWith = "empty";
    logger.error(e.message);
  }
  logger.info(`handle-health-request called with ${calledWith}`);
  return { status: "OK" };
}

export { getSomething };
