const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/login").post(userController.login);

router.route("/register").post(userController.registerUser);

// router.use(userController.checkLogin);

router.route("/logout").post(userController.logout);

router.route("/users").get(userController.getUserIndex);

router.route("/users/:id").get(userController.getUserProfile).delete(userController.deleteUser);

module.exports = router;
