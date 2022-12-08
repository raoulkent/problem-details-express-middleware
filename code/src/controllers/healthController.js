import { getSomething } from "../lib/handle-health-request.js";

const health = (req, res) => {
  const { logger, body } = req;
  logger.info("/health api called");
  res.status(200);
  return res.send(getSomething(body, logger));
};

export default health;
export { health };
