const express = require("express");
const app = express();
const Sign = require("../model/Sign.js");
const User = require("../model/User.js");

app.use(express.json());

exports.findReceiver = (req, res, next) => {
    User.find({ name: req.body.name })
        .select(["_id", "name"])
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

exports.sendImgs = (req, res, next) => {
    Sign.create({
        owner: req.body.owner,
        img: req.body.img,
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
                message: "Img save Successfully!",
            });
        });
};

exports.deleteImg = (req, res, next) => {
    Sign.deleteOne({ _id: ObjectId(req.params.id) })
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
        });
};

exports.updateImg = (req, res, next) => {
    Img.updateOne({ _id: ObjectId(req.params.id) })
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
                    content: "Update Content here",
                },
            });
        });
};
