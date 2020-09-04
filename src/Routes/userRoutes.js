require("rootpath")();
const express = require("express");
const routes = express.Router();

let usersController = require("../Controllers/usersController");

routes.get("/users", usersController.findAll);
routes.get("/users/:id", usersController.findById);
routes.post("/users/add", usersController.create);
routes.put("/users/:id", usersController.update);
routes.delete("/users/:id", usersController.delete);

module.exports = routes;
