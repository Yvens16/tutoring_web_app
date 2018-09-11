const express = require("express");
const router = express.Router();

const User = require("../models/user-model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/settings", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "Tu dois être connecté pour accéder à tes paramètres");
    res.redirect("/login");
  } else {
    res.render("settings-page");
  }
});

router.post("/process-settings", (req, res, next) => {
  const { lastname, firstname, phoneparent, phonestudent, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { lastname, firstname, phoneparent, phonestudent, email } },
    { runValidators: true }
  )
    .then(userDoc => {
      req.flash("success", "Modifications enregistrées");
      res.redirect("/");
    })
    .catch(err => next(err));
});

module.exports = router;
