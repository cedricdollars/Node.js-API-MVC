const db = require("../Config/db.config");

//constructeur
const Users = function (user, role) {
  this.email = user.email;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.password = user.password;
  this.role = role;
};
let insertID = 1;
Users.create = function (newUser, result) {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    insertID += 1;
    if (err) {
      console.log(`error while creating user :${err}`);
      result(err, null);
    } else {
      console.log("User created :", { id: insertID, ...newUser });
      result(null, { id: insertID, ...newUser });
    }
  });
};
//Retrieve one user
Users.findById = function (id, result) {
  db.query("SELECT * FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log(`An error occured : ${err}`);
      result(err, null);
    } else {
      console.log("User found ");
      result(null, res);
    }
  });
};
//Retrieve all users
Users.findAll = function (result) {
  db.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log(`Error : ${err}`);
      result(err, null);
    } else {
      console.log(`Users : ${res}`);
      result(null, res);
    }
  });
};

//Update user
Users.update = function (id, result, user) {
  db.query(
    "UPDATE users SET admin= ?, email=?, firstname=?, lastname=?, password=? WHERE id=?",
    [user.email, user.firstname, user.lastname, user.password],
    (err, res) => {
      if (err) {
        console.log("Error while updaing", err);
        result(err, null);
      } else {
        console.log("successfull updated user :", { id: id, ...user });
        console.log(res, null);
      }
    }
  );
};

//Delete user
Users.delete = function (id, result) {
  db.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log(`Error delete : ${err}`);
      result(err, null);
    } else {
      console.log(`Deleted user with id : ${id}`);
      result(res, null);
    }
  });
};
module.exports = Users;
