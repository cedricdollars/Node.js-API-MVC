const Parking = require("../Models/parking");

exports.create = function (req, res) {
  let parking = new Parking(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "We need to have all fields to create new place",
    });
  } else {
    Parking.create(parking, function (err, place) {
      if (err) {
        console.log("Internal error");
        return;
      } else {
        console.log("Done!");
        res.status(200).send({
          error: false,
          message: "A new place was created, you can park 🚖",
        });
      }
    });
  }
};
