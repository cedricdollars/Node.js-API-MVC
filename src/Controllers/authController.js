const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { UserLogin } = require("../Services/userServices");
const { secretKey } = require("../Config/auth.config");

exports.register = async (req, res) => {
  try {
    const { body } = req;
    const data = {
      email: body.email,
      password: body.password,
    };
    const users = Users.create(data, function () {});
  } catch (error) {}
};

exports.login = (req, res) => {
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
};
