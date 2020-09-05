const router = require("express").Router();

let parkingController = require("../Controllers/parkingController");

router.post("/parking/add", parkingController.create);

module.exports = router;
