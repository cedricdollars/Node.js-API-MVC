const router = require("express").Router();
const auth = require("../Middleware/verifyToken");
let parkingController = require("../Controllers/parkingController");

router.post("/parking/add", auth, parkingController.create);
router.get("/parking/", parkingController.getAll);
router.get("/parking/:id", parkingController.findByUser);
router.patch("/parking/:id", parkingController.updatePlace);

module.exports = router;
