import { getSomething } from "../lib/handle-health-request.js";

const health = (req, res) => {
  const { logger } = req;
  logger.info("/health api called");
  const something = getSomething(req, logger);
  res.status(200);
  return res.send(something);
};

export default health;
export { health };
