// simple wrapper around console / winston (expandable)
const { createLogger, format, transports } = require("winston");
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    // add File transports here if desired: new transports.File({ filename: 'combined.log' })
  ],
});

module.exports = logger;
