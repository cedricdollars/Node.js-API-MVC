require("rootpath")();
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const usersRoutes = require("../Routes/userRoutes");

const port = process.env.PORT;
const app = express();

//parse request of  content-type application/x-www-form-urlencoded
app.use((req, res, next) => {
  bodyParser.urlencoded({ extended: true });
  next();
});

//parse request of content-type application/json
app.use(bodyParser.json());

app.use("/api/v1/", usersRoutes);

app.use(cors());
exports.start = () => {
  app.listen(port || 4000, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
      process.exit(-1);
    }
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
};
