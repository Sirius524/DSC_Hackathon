const express = require("express");
const giftController = require("./../controllers/giftController");

const router = express.Router();

router.route("/")
    .get(giftController.findReceiver)
    .post(giftController.sendGifts);

    
module.exports = router;