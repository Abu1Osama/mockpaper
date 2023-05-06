const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const authorization = (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jsonwebtoken.verify(token, process.env.secret, (err, decode) => {
      if (decode) {
        next();
      } else {
        res.status(400).send({ ms: "invalid token" });
      }
    });
  } else {
    res.status(400).send({ msg: "invalid token" });
  }
};

module.exports = {
  authorization,
};
