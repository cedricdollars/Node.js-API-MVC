require("rootpath")();
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const apiRouter = require("../Routes/indexRoute");
const port = process.env.PORT;
const app = express();

let helmet = require("helmet");

app.use((req, res, next) => {
  bodyParser.urlencoded({ extended: true });
  next();
});

app.use(helmet());

app.use(bodyParser.json());

//Routes
app.use("/api/v1", apiRouter);

app.use(cors());

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
//Gestion des erreurs
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

exports.start = () => {
  app.listen(port || 4000, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
      process.exit(1);
    }
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
};
