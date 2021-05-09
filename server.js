const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PORT = process.env.PORT || 4000;
const API_SERVICE_URL = `https://api.rawg.io/api/`;

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://gamesearch-app.herokuapp.com/"
  );
  next();
});

app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.send("Running");
});

app.use(
  "/games",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
  })
);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
