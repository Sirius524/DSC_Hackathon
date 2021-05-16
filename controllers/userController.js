const express = require("express");
const app = express();
const User = require("../model/User.js");
const ObjectId = require("mongoose").Types.ObjectId;

app.use(express.urlencoded({ extended: true }));

var generateToken = () => {
    return Math.random().toString(36).substr(2);
};

var parseCookie = (cookie) => {
    var cookies = Array();
    cookie.split(";").forEach((element) => {
        element = element.trim().split("=");

        cookies[element[0]] = element[1];
    });

    return cookies;
};

exports.checkLogin = (req, res, next) => {
    if (req.headers.cookie == undefined) {
        res.status(403).json({
            status: "fail",
            message: "Permission denied!",
        });
    }
    console.log(req);
    var cookies = parseCookie(req.headers.cookie);

    User.exists({ _token: cookies["_token"] })
        .catch((error) => {
            res.status(200).json({
                status: "error",
                message: "Query error!",
            });
            console.log(error);
        })
        .then((result) => {
            if (!result) {
                res.status(403).json({
                    status: "fail",
                    message: "Permission denied!",
                });
            }

            next();
        });
};

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
            User.findOneAndUpdate({
                query: { _id: user._id },
                update: { $set: { _token: token } },
            })
                .select(["_id", "name", "email", "address"])
                .then((user) => {
                    res.status(200)
                        .cookie("_token", token, {
                            expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                        })
                        .json({
                            status: "success",
                            message: "Login success!",
                            user: user,
                        });
                });
        }
    });
};

exports.logout = (req, res, next) => {
    if (req.headers.cookie == undefined) {
        res.status(200).json({
            status: "error",
            message: "You didn't logged in!",
        });
    }

    var cookies = parseCookie(req.headers.cookie);
    console.log(cookies);
    var token = cookies["_token"];
    console.log(token);

    User.updateOne({ _token: token }, { _token: null }).then(() => {
        res.status(200).clearCookie("_token").json({
            status: "success",
            message: "Logout successfully!",
        });
    });
};

exports.registerUser = (req, res, next) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
        .catch((error) => {
            res.status(200).json({
                status: "error",
                message: "Something went wrong!",
            });
        })
        .then(() => {
            res.status(200).json({
                status: "success",
                message: "Registered successfully!",
            });
        });
};

exports.getUserIndex = (req, res, next) => {
    User.find()
        .select(["_id", "name", "email", "address"])
        .catch((error) => {
            res.status(200).json({
                status: "error",
                message: "Query error!",
            });
            console.log(error);
        })
        .then((users) => {
            res.status(200).json({
                status: "success",
                message: "Query successfully!",
                users: users,
            });
        });
};

exports.getUserProfile = (req, res, next) => {
    User.findOne({ _id: ObjectId(req.params.id) })
        .select(["_id", "name", "email", "address"])
        .catch((error) => {
            res.status(200).json({
                status: "error",
                message: "Query error!",
            });
            console.log(error);
        })
        .then((user) => {
            res.status(200).json({
                status: "success",
                message: "Query successfully!",
                user: user,
            });
        });
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: ObjectId(req.params.id) })
        .catch((error) => {
            res.status(200).json({
                status: "error",
                message: "Query error!",
            });
            console.log(error);
        })
        .then(() => {
            res.status(200).json({
                status: "success",
                message: "Query successfully!",
            });
        });
};
