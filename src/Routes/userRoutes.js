const router = require("express").Router();

let usersController = require("../Controllers/usersController");

router.get("/users", usersController.findAll);
router.get("/users/:id", usersController.findById);
router.post("/users/add", usersController.create);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.delete);
router.post("/users/login");

module.exports = router;
