const db = require("../Config/db.config");

//constructeur
const Users = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.admin = user.admin;
};

Users.prototype.create = function (newUser, result) {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log(`error while creating user :${err}`);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
