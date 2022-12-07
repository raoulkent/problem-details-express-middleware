module.exports.health = (req, res) => {
  const { logger, healthService, body } = req;
  logger.info('/health api called');
  res.status(200);
  return res.send(healthService.getSomething(body, logger));
};
