const express = require("express");
const signController = require("./../controllers/signController");

const router = express.Router();

router
    .route("/")
    .get(signController.findReceiver)
    .post(signController.sendImgs)
    .delete(signController.deleteImg)
    .patch(signController.updateImg);

module.exports = router;
