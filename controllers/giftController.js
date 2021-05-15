const express = require("express");
const app = express();
const ObjectId = require("mongoose").Types.ObjectId;
const Gift = require("../model/Gift.js");
const User = require("../model/User.js");

app.use(express.json());

exports.findReceiver = (req, res, next) => {
    User.find({ name: req.body.name })
        .select(["_id", "name", "address"])
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
        })
}
exports.sendGifts = (req, res, next) => {
    Gift.find({ userId: req.body.userId}).then((userId)=>{
        return userId;
    })
    if( userId == null) {
        Gift.create({ userId: req.body.userId, bear: req.body.bear, flower: req.body.flower})
            .catch((error) => {
                res.status(200).json({
                    status: "error",
                    message: "Something went wrong!",
                });
            })
            .then(() => {
                res.status(200).json({
                    status: "success",
                    message: "Gift send successfully!",
                });
            });
    } else {
        Gift.updateOne({ userId: req.body.userId}, {bear: +req.body.bear,flower: +req.body.flower})
            .catch((error) => {
                res.status(200).json({
                    status: "error",
                    message: "Something went wrong!",
                });
            })
            .then(() => {
                res.status(200).json({
                    status: "success",
                    message: "Gift send successfully!",
                });
            });
    }
    
}