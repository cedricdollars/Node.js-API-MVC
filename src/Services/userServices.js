const db = require("../Config/db.config");

exports.UserLogin = (email, data) => {
  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      console.log("Error");
      data(err);
    }
    return data(null, result[0]);
  });
};
