const express = require('express');
const app = express();
const Msg = require('../model/Msg.js');
const User = require("../model/User.js");

app.use(express.json());

var parseCookie = (cookie) => {
    var cookies = Array();
    cookie.split(";").forEach((element) => {
        element = element.trim().split("=");

        cookies[element[0]] = element[1];
    });

    return cookies;
};

exports.checkID = (req, res, next) => {
    var cookies = parseCookie(req.headers.cookie);
    console.log(cookies);
    var token = cookies["_token"];
    console.log(token);

    User.find({ _token: token }).then((user) => {
        if (!user) {
            res.status(404).json({
                status: "error",
                message: "Please register or login!"
            })
            return;
        }
    })
    next();
}

exports.writeContent = (req, res, next) => {
    Msg.create({ giver: req.body.giver, receiver: req.body.receiver, content: req.body.content })
        .catch((error) => {
            res.status(200).json({
                status: "error",
                message: "Something went wrong!",
            });
        })
        .then(() => {
            res.status(200).json({
                status: "success",
                message: "Message Leave Successfully!"
            });
        });
};

exports.readContent = (req, res, next) => {
    Msg.find({})
        .select(["giver", "content"])
        .catch((error) => {
            res.status(200).json({
                status: "error",
                message: "Query error!",
            });
            console.log(error);
        })
        .then((msgs) => {
            res.status(200).json({
                status: "success",
                message: "Query success",
                msgs: msgs,
            })
        })
}

exports.deleteContent = (req, res, next) => {
    Msg.deleteOne({ _id: ObjectId(req.params.id) })
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
                message: "Query success",
            });
        })
}

exports.updateContent = (req, res, next) => {
    Msg.updateOne({ _id: ObjectId(req.params.id) })
        .catch((error) => {
            res.status(200).json({
                status: "error",
                message: "Query error!",
            });
            console.log(error);
        })
        .then((msgs) => {
            res.status(200).json({
                status: "success",
                msgs: {
                    content: 'Update Content here'
                }
            });
        })
}