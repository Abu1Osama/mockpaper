const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const relationship = (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jsonwebtoken.verify(token, process.env.secret, (err, decode) => {
      if (decode) {
        req.body.userID=decode.userID
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
    relationship,
};
