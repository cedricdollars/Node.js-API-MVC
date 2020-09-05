const router = require("express").Router();
const auth = require("../Middleware/verifyToken");
let parkingController = require("../Controllers/parkingController");

router.post("/parking/add", auth, parkingController.create);

module.exports = router;
