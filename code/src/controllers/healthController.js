import { getSomething } from '../lib/handle-health-request.js';

const health = (req, res) => {
  const { logger, healthService, body } = req;
  logger.info('/health api called');
  res.status(200);
  return res.send(getSomething(body, logger));
};

export { health };
