const db = require("../Config/db.config");

//constructeur parking
const Parking = function (parking) {
  this.avaibility = parking.avaibility ? parking.avaibility : false;
  this.floor = parking.floor;
  this.started_usage = new Date();
  this.ended_usage = new Date();
};

//Création d'une place dans le parking

Parking.create = function (parking, result) {
  db.query("INSERT INTO parking SET ? ", parking, (err, res) => {
    if (err) {
      console.log("Error while creating a new parking");
      return result(err, null);
    } else {
      console.log("parking created!!", parking);
      return result(null, res);
    }
  });
};
//Recherche d'une place libre
Parking.findOne = function (avaibility, result) {
  db.query(
    "SELECT * FROM parking WHERE avaibility = ?",
    avaibility,
    (err, res) => {
      if (err) {
        console.log("An error occured");
      } else {
        if (avaibility !== false) {
          console.log(`a place of numero ${avaibility} is free`);
          result(null, res);
        } else {
          console.log("This place is not free");
          result(null, res);
        }
      }
    }
  );
};
//Rechercher une place par utilisateur
Parking.findByUser = function (num_place, result) {
  db.query(
    "SELECT firstname, lastname FROM users INNER JOIN parking ON users.id = ?",
    num_place,
    function (err, res) {
      if (err) {
        console.log("An error occured");
      } else {
        console.log("the number of place is :", num_place);
        result(null, result);
      }
    }
  );
};
module.exports = Parking;
