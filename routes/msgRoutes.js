const express =  require("express");
const msgController = require("./../controllers/msgController");

const router = express.Router();

router.route("/blog")
    .post(msgController.writeContent)
    .get(msgController.readContent)
    .delete(msgController.deleteContent)
    .patch(msgController.updateContent);

module.exports = router;