const roles = require("../Static/role");
const Users = require("../Models/users");

//Roles
const rolePublic = roles[1].toString();
const roleAdmin = roles[0].toString();

exports.findAll = function (req, res) {
  Users.findAll((err, user) => {
    if (err) {
      console.log("Error retrieving data");
      res.status(500).send({
        error: true,
        message: "Some error occured, please try agin..." || err.message,
      });
    } else {
      console.log("retrieving success!", user);
      res.status(200).send({
        error: false,
        users: user,
      });
    }
  });
};

exports.create = function (req, res) {
  const user = new Users(req.body, roleAdmin);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "No empty users allowed",
    });
  } else {
    Users.create(user, function (err, user) {
      if (err) throw err;
      res.json({
        error: false,
        message: "user created !!",
      });
      //res.send(user);
    });
  }
};

exports.findById = function (req, res) {
  let id = req.params.id;
  Users.findById(id, function (err, user) {
    if (err) {
      res.status(500).send({
        error: true,
        message: `No retrieve user with id ${req.params.id}`,
      });
    } else
      res.send({
        error: false,
        message: "user retrieved with id :" + id,
      });
  });
};
exports.update = function (req, res) {
  let id = req.params.id;
  const user = new Users(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "You nedd to provide fields for update user",
    });
  }
  Users.update(id, user, function (err, user) {
    if (err) {
      res.status(500).send({
        error: true,
        message: "Error :" + err,
      });
    } else {
      res.send({
        error: false,
        message: "User updated",
      });
    }
  });
};
exports.delete = function (req, res) {
  let id = req.params.id;
  Users.delete(id, function (err, user) {
    if (err) {
      res.status(500).send({
        error: true,
        message: "Error " + err,
      });
    } else {
      res.send({
        error: false,
        message: "user deleted ",
      });
    }
  });
};
