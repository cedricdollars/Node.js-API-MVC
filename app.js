const connect = require("./src/Config/db.config");
const appExpress = require("./src/Express/express.service");

//On lance la connexion à la db
connect;
appExpress.start();
