const db = require("../Config/db.config");

//constructeur parking
const Parking = function (parking) {
  this.avaibility = parking.avaibility ? 1 : 0; // 1 et 0 sont des booléens
  this.floor = parking.floor;
  this.started_usage = parking.started_usage
    ? parking.started_usage
    : new Date();
  this.ended_usage = parking.started_usage ? parking.started_usage : new Date();
  this.user_id = parking.user_id;
};

//Création d'une place dans le parking
Parking.create = function (parking, result) {
  db.query("INSERT INTO parking SET ? ", parking, (err, res) => {
    if (err) {
      console.log("Error while creating a new place in parking");
      return result(err, null);
    } else {
      console.log("parking created!!", parking);
      return result(null, res);
    }
  });
};

//Recherche des  places libres
Parking.findDisponibility = function (callback) {
  db.query("SELECT * FROM parking WHERE avaibility = ?", [true], (err, res) => {
    if (err) {
      console.log(err.sqlMessage);
      return callback(err, null);
    }
    if (res) {
      return callback(null, res);
    }
  });
};

//afficher une place par utilisateur
Parking.findByUser = function (id, callback) {
  db.query(
    "SELECT * FROM parking INNER JOIN users u ON parking.user_id = ? where avaibility = 1",
    [id],
    function (err, res) {
      if (err) {
        console.log("Eror : ", err.sqlMessage);
        return callback(err, null);
      }
      if (res.length) {
        return callback(null, res);
      }
      callback({ kind: "not_found" }, null);
    }
  );
};
// Réassigner une place à un utilisateur
Parking.update = function (num_place, parking, result) {
  db.query(
    "UPDATE parking SET avaibility=?, user_id=? WHERE num_place = ? AND avaibility = 1",
    [parking.avaibility, parking.user_id, num_place],
    (err, res) => {
      if (err) {
        console.log("Error : ", err.sqlMessage);
        return result(err, null);
      }
      console.log(
        `You have assigned this place to the user with id ${parking.user_id}`
      );
      return result(null, res);
    }
  );
};

// Affichage du temps d'occupation dans le parking
module.exports = Parking;
