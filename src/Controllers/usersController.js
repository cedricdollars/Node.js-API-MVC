const { hashSync, genSaltSync } = require("bcrypt");
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
  const data = req.body;
  const salt = genSaltSync(5);
  data.password = hashSync(data.password, salt);
  const user = new Users(data, roleAdmin);
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
  const id = req.params.id;
  Users.findById(id, function (err, user) {
    if (err) {
      res.status(500).send({
        error: true,
        message: "Server internal error",
      });
    }
    if (user.lenght < 0) {
      return res.status(404).send({
        Not_found_exception: "Not found id specified",
      });
    }
    return res.send({
      error: false,
      user: user,
    });
  });
};
exports.update = function (req, res) {
  let id = req.params.id;
  const data = req.body;
  const salt = genSaltSync(5);
  data.password = hashSync(data.password, salt);
  const user = new Users(req.body, roleAdmin);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message: "You nedd to provide fields for update user",
    });
  }
  Users.update(id, user, function (err, data) {
    if (err) {
      return res.status(500).send({
        error: true,
        message: "Error :" + err,
      });
    }
    if (!data) {
      return res.status(400).send({
        error: true,
        message: "Failed to update user",
      });
    }
    return res.send({
      error: false,
      message: "User updated",
    });
  });
};
exports.delete = function (req, res) {
  let id = req.params.id;
  Users.delete(id, function (err, user) {
    if (err) {
      return res.status(500).send({
        error: true,
        message: "Error " + err,
      });
    }
    return res.send({
      error: false,
      message: "user deleted ",
    });
  });
};
