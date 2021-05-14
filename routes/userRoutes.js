const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/api/login").post(userController.login);

router.route("/api/logout").post(userController.logout);

router.route("/api/register").post(userController.registerUser);

router.route("/api/users").get(userController.getUserIndex);

router.route("/api/users/:id").get(userController.getUserProfile).delete(userController.deleteUser);

module.exports = router;
