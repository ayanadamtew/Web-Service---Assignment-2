const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "Missing Authorization header" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Malformed Authorization header" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      logger.info(`JWT verify error: ${err.message}`);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = payload;
    next();
  });
};

module.exports = authMiddleware;
