const Parking = require("../Models/parking");

exports.create = function (req, res, next) {
  let parking = new Parking(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "We need to have all fields to create new place",
    });
  } else {
    Parking.create(parking, function (err, place) {
      if (err) {
        return res.status(500).send({
          error: true,
          message: "Internal error",
        });
      } else {
        console.log("Done!");
        return res.status(200).send({
          error: false,
          message: "A new place was created, you can park 🚖",
        });
      }
    });
  }
};
exports.getAll = function (req, res) {
  const id = req.params.num_place;
  Parking.findDisponibility((err, data) => {
    if (err) {
      return res.status(500).send({
        error: true,
        message: "Internal error",
      });
    }
    console.log(data);
    return res.status(200).send({
      error: false,
      message: "Numéros de places disponibles :" + Object.keys(data),
    });
  });
};

exports.findByUser = function (req, res) {
  const id = req.params.id;
  Parking.findByUser(id, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          Not_found_exception: "id not found",
        });
      } else {
        return res.status(500).send({
          error: true,
          message: "Server internal error",
        });
      }
    }
    return res.status(200).send({
      error: false,
      message:
        "le numéro de place de cet utilisateur est : " + result[0].num_place,
    });
  });
};

//

exports.updatePlace = function (req, res) {
  let num_place = req.params.id;
  const data = req.body;
  const updatedPlace = new Parking(data);
  if (data.constructor === Object && Object.keys(data).length === 0) {
    res.status(400).send({
      error: true,
      message: "You need to provide fields to update information",
    });
    return;
  }
  Parking.update(num_place, updatedPlace, (err, result) => {
    if (err) throw err;
    if (!result) {
      res.status(400).send({
        error: true,
        message: "Failed to update informations",
      });
      return;
    }
    //  console.log(`la place numéro ${num_place} a été modifié`);

    return res.send({
      error: false,
      code: 201,
      message: `La place numéro ${num_place} a été réassigné à l'utilisateur ${updatedPlace.user_id}`,
    });
  });
};
