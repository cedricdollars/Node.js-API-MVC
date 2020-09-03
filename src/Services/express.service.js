const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const port = process.env.PORT;
const app = express();

//middleware
app.use((req, res, next) => {
  bodyParser.urlencoded({ extended: false });
  next();
});

app.use(cors());
exports.start = () => {
  app.listen(port || 4000, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
      process.exit(-1);
    }
    console.log(`🚀 Server is running on http://localhost/${port}`);
  });
};
