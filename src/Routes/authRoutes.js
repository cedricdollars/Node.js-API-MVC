const router = require("express").Router();
const authController = require("../Controllers/authController");

//route login
router.post("/users/login", authController.login);

//route register
router.post("/users/register", authController.register);

module.exports = router;
