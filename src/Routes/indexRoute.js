const router = require("express").Router();
const userRoute = require("./userRoutes");
const parkingRoute = require("./parkingRoutes");
const authRoute = require("./authRoutes");

router.use(userRoute);
router.use(parkingRoute);
router.use(authRoute);

module.exports = router;
