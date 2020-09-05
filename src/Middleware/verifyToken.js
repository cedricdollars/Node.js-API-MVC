const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  let privateKey = process.env.SECRET_KEY;
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send({
      authenticate: false,
      message: "Missing token",
    });
  }
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: {
          code: 401,
          message: "Unauthorize",
        },
      });
    }
    req.user = decoded;
    next();
  });
}
module.exports = verifyToken;
