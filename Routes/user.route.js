const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { userModel } = require("../Models/user.model");
require("dotenv").config();

userRouter.post("/api/register", async (req, res) => {
  try {
    let { name, email, password, isAdmin } = req.body;
    let checkemail = await userModel.find({ email });
    if (name == "" || password == "" || email == "" || isAdmin == "") {
      res.status(401).send({ msg: "please provide all credential" });
    }
    if (password.length < 5) {
      res.status(411).send({ msg: "please provide strong password" });
    }
    if (checkemail.length > 0) {
      res.status(402).send({ msg: "user already exist" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(404).send({ msg: err });
        } else {
          const userData = userModel({ name, email, password: hash, isAdmin });
          await userData.save();
          res
            .status(201)
            .send({ msg: "user has been registered successfully" });
        }
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: error });
  }
});

userRouter.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (error, output) => {
        if (output) {
          res
            .status(201)
            .send({
              msg: "Login successfull",
              token: jsonwebtoken.sign(
                { userID: user._id },
                process.env.secret
              ),
            })
        }else{
          res.status(400).send({"msg":"incorrect pass"})
        }
      });
    }else{
      res.status(400).send({"msg":"user not fopund"})
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: error });
  }
});

module.exports = {
  userRouter,
};
