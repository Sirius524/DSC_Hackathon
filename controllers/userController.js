// const fs = require("fs");
// const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));
const express = require("express");
const app = express();
const User = require("../model/User.js");
const ObjectId = require("mongoose").Types.ObjectId;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user || req.body.password != user.password) {
            res.status(200).json({
                status: "error",
                message:
                    "Oops! Your email address or password doesn't match our record.",
            });
        } else {
            let token = generateToken();
            User.updateOne({ _id: user._id }, { _token: token }).then(() => {
                res.status(200)
                    .cookie("_token", token, {
                        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                    })
                    .json({
                        status: "success",
                        message: "Login success!",
                    });
            });
        }
    });
};

var generateToken = () => {
    return Math.random().toString(36).substr(2);
};

exports.logout = (req, res, next) => {
    var token = req.header.cookie._token;

    if (token == null) {
        res.status(200).json({
            status: "error",
            message: "You didn't logged in!",
        });
    }

    User.updateOne({ _token: token }, { _token: "" });

    res.status(200)
        .json({
            status: "success",
            message: "Logout successfully!",
        })
        .clearCookie("_token");
};

exports.registerUser = (req, res, next) => {
    User.insertMany({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).catch((error) => {
        res.status(200).json({
            status: "error",
            message: "Something went wrong!",
            log: error,
        });
    });

    res.status(200).json({
        status: "success",
        message: "Registered successfully!",
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
