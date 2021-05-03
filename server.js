require("dotenv").config();
const express = require("express");
const request = require("request");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://api.rawg.io/api/");
  next();
});

app.get("/games", (req, res) => {
  request(
    {
      url: `https://api.rawg.io/api/games?key=${process.env.KEY}&search=${
        req.query.query
      }&search_precise=true&search_exact=${req.query.exact}&page=${
        req.query.page
      }&page_size=${req.query.resultsPerPage}&ordering=${req.query.sortBy}${
        req.query.genres ? `&genres=${req.query.genres}` : ``
      }${req.query.platforms ? `&platforms=${req.query.platforms}` : ``}${
        req.query.stores ? `&stores=${req.query.stores}` : ``
      }`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: "error" });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
