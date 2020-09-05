const router = require("express").Router();
let usersController = require("../Controllers/usersController");
let authController = require("../Controllers/authController");

router.get("/users", usersController.findAll);
router.get("/users/:id", usersController.findById);
router.post("/users/add", usersController.create);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.delete);
router.post("/users/login", authController.login);
router.post("/users/register", authController.register);

module.exports = router;
