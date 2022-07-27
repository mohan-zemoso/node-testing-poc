const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const authController = require("../controller/auth");
const User = require("../models/user");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) => {
        return User.findOne({ where: { email: value } }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must have minium 5 characters"),
    body("name")
      .trim()
      .isAlpha()
      .withMessage("Name must contain only alphabets"),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = {
  router: router,
};
