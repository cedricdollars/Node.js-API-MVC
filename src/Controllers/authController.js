const jwt = require("jsonwebtoken");
const db = require("../Config/db.config");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { UserLogin, UserRegister } = require("../Services/userServices");
const { secretKey } = require("../Config/auth.config");
const roles = require("../Static/role");

// Enregistrement
exports.register = async (req, res) => {
  const body = req.body;
  try {
    db.query(
      "SELECT COUNT(*) as uc FROM users WHERE email = ?",
      body.email,
      function (err, res) {
        if (err) {
          console.log(err);
        } else {
          if (res[0].uc > 0) {
            let error = Object.assign(
              {},
              { error: true, message: "This email is already exists !" }
            );
            return res.send(error);
          } else {
          }
        }
      }
    );
    const body = req.body;
    UserRegister(body, (err, user) => {});
  } catch (error) {}
};

// authentification avec JWT
exports.login = (req, res) => {
  try {
    const body = req.body;
    UserLogin(body.email, (err, user) => {
      console.log(user);
      if (err) {
        console.log(err);
      }
      if (!user) {
        res.status(400).send({
          error: true,
          message: "Invalid email or password",
        });
      }
      const isValidPassword = compareSync(body.password, user.password);
      if (isValidPassword) {
        let payload = {
          id: user.id,
          role: user.role,
        };
        const usertoken = jwt.sign(payload, secretKey, {
          expiresIn: "1h",
        });
        return res.status(200).send({
          error: false,
          message: "login successfully",
          token: usertoken,
        });
      } else {
        return res.send({
          error: true,
          code: 401,
          message: "Invalid Email or Password",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
