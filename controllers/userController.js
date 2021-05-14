// const fs = require("fs");
// const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));
const express = require("express");
const app = express();
var User = require("../model/User.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.login = (req, res, next) => {
  var user = User.findOne({ email: req.body.email, password: req.body.password });

  if (user == null) {
    res.status(200).json({
      status: "error",
      message: "Oops! Your email address or password doesn't match our record.",
    });
  }

  var token = generateToken();
  User.updateOne({ _id: user._id }, { _token: token });

  res
    .status(200)
    .json({
      status: "success",
      message: "Login success!",
    })
    .cookie("_token", token, { expires: new Date(Date.now() + 2 * 60 * 60 * 1000) });
};

var generateToken = () => {
  return Math.random().toString(36).substr(2);
};

exports.logout = (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.registerUser = (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.getUserIndex = (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.getUserProfile = (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.deleteUser = (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
