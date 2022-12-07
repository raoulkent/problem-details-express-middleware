const failsSometimes = () =>
  new Promise((resolve, reject) => {
    const random = Math.random();
    if (random > 0.5) {
      resolve();
    }
    reject(new Error('Random error'));
  });

exports.getSomething = (requestBody, logger) => {
  let calledWith;
  try {
    failsSometimes();
    calledWith = JSON.stringify(requestBody);
  } catch (e) {
    calledWith = 'empty';
    logger.error(e.message);
  }
  logger.info(`handle-health-request called with ${calledWith}`);
  return { status: 'OK' };
};
