const express = require("express");
const axios = require("axios");
const router = express.Router();
const logger = require("../utils/logger");

// Data transformation helper
function transformOpenWeatherResponse(data) {
  const kmsToKph = (mps) => Number((mps * 3.6).toFixed(2));
  const kelvinToC = (k) => Number((k - 273.15).toFixed(2));
  const kelvinToF = (k) => Number((((k - 273.15) * 9) / 5 + 32).toFixed(2));

  return {
    location: `${data.name}, ${data.sys && data.sys.country}`,
    tempC: kelvinToC(data.main.temp),
    tempF: kelvinToF(data.main.temp),
    feels_likeC: kelvinToC(data.main.feels_like),
    description: data.weather && data.weather[0] && data.weather[0].description,
    humidity: data.main.humidity,
    windKph: kmsToKph(data.wind.speed),
    sunrise: data.sys ? new Date(data.sys.sunrise * 1000).toISOString() : null,
    sunset: data.sys ? new Date(data.sys.sunset * 1000).toISOString() : null,
    raw: data, // include raw for debugging / screenshots
  };
}

// GET /api/weather?city=Addis Ababa
router.get("/", async (req, res, next) => {
  try {
    const city = req.query.city;
    if (!city)
      return res
        .status(400)
        .json({ error: "city query parameter is required" });

    // Use OpenWeatherMap current weather endpoint
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey)
      return res
        .status(500)
        .json({ error: "Server misconfigured: WEATHER_API_KEY missing" });

    const url = `https://api.openweathermap.org/data/2.5/weather`;
    logger.info(`Requesting weather for city="${city}" from provider`);
    const resp = await axios.get(url, { params: { q: city, appid: apiKey } });

    const transformed = transformOpenWeatherResponse(resp.data);
    res.json({ success: true, data: transformed });
  } catch (err) {
    // Propagate details for non-200 external responses
    if (err.response) {
      logger.error(
        `External API error: ${err.response.status} ${err.response.data}`
      );
      return res
        .status(err.response.status)
        .json({ error: "External provider error", details: err.response.data });
    }
    next(err);
  }
});

module.exports = router;
