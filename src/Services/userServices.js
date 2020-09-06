const db = require("../Config/db.config");

exports.UserLogin = (email, data) => {
  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      console.log("Error");
      return data(err);
    }
    return data(null, result[0]);
  });
};

exports.UserRegister = (user, data) => {
  db.query("INSERT INTO users SET ? ", user, (err, result) => {
    if (err) {
      return data(err, null);
    }
    return data(null, result);
  });
};
