exports.getSomething = (requestBody, logger) => {
  let calledWith;
  try {
    calledWith = JSON.stringify(requestBody);
  } catch (e) {
    calledWith = 'empty';
    logger.error(e.message);
  }
  logger.info(`handle-health-request called with ${calledWith}`);
  return ({ status: 'OK' });
};
