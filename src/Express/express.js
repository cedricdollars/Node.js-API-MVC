require("rootpath")();
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const apiRouter = require("../Routes/indexRoute");
const port = process.env.PORT;
const app = express();

let helmet = require("helmet");

//traduit les requêtes pour les types d'en-tête  application/x-www-form-urlencoded
app.use((req, res, next) => {
  bodyParser.urlencoded({ extended: true });
  next();
});

app.use(helmet());
//Traduit les requêtes pour les types d'en-tête application/json
app.use(bodyParser.json());

app.use("/api/v1", apiRouter);
app.use(cors());

exports.start = () => {
  app.listen(port || 4000, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
      process.exit(1);
    }
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
};
