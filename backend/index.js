require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");
const authRoutes = require("./routes/auth");
const weatherRoutes = require("./routes/weather");
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny")); 


app.get("/health", (req, res) =>
  res.json({ status: "ok", time: new Date().toISOString() })
);


app.use("/auth", authRoutes);


app.use("/api/weather", authMiddleware, weatherRoutes);


app.get("/api/docs", (req, res) => {
  res.json({
    endpoints: [
      {
        path: "/auth/login",
        method: "POST",
        body: { username: "string", password: "string" },
        description: "Returns JWT",
      },
      {
        path: "/api/weather?city=NAME",
        method: "GET",
        headers: { Authorization: "Bearer <token>" },
        description: "Returns transformed weather data",
      },
      { path: "/health", method: "GET", description: "Health check" },
    ],
  });
});


app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Weather backend running on port ${PORT}`);
});
