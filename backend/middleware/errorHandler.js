const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.toString());
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
