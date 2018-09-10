const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

// const User = require("../models/user-model.js");

const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

router.post("/process-signup", (req, res, next) => {
  const { firstname, lastname, username, email, originalPassword } = req.body;
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ firstname, lastname, username, email, encryptedPassword })
    .then(userDoc => {
      req.flash("success", "Sign up SUCCESS");
      res.redirect("/");
    })
    .catch(err => next(err));
});

module.exports = router;
