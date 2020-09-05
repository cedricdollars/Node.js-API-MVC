const connect = require("./src/Config/db.config");
const App = require("./src/Express/express");

//On lance la connexion à la db
connect;
App.start();
