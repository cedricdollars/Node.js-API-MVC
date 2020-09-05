const jwt = require("jsonwebtoken");
const { secretKey } = require("../Config/auth.config");

function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send({
      authenticate: false,
      message: "Missing token",
    });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        code: 401,
        message: "Access denied, Unauthorize!",
      });
    }
    req.user = decoded;
    next();
  });
}
module.exports = verifyToken;
