const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
var upperCaseFirst = require("upper-case-first");

const User = require("../models/user-model.js");
const Note = require("../models/note-model.js");

const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

router.post("/process-signup", (req, res, next) => {
  let {
    lastname,
    firstname,
    // phoneparent,
    // phonestudent,
    email,
    originalPassword
  } = req.body;
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);
  lastname = upperCaseFirst(lastname, { pascalCase: true });
  firstname = upperCaseFirst(firstname, { pascalCase: true });

  User.create({
    lastname,
    firstname,
    // phoneparent,
    // phonestudent,
    email,
    encryptedPassword
  })
    .then(userDoc => {
      req.flash("success", "Inscription réussie");
      res.redirect("/");
    })
    .catch(err => next(err));
});

router.get("/login", (req, res, next) => {
  res.render("auth-views/login-form.hbs");
});

router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        req.flash("error", "Oups! L'email est incorrect...");
        res.redirect("/login");
        return;
      }
      const { encryptedPassword } = userDoc;

      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        req.flash("error", "Oups! Le mot de passe est incorrect...");
        res.redirect("/login");
        return;
      }
      req.logIn(userDoc, () => {
        req.flash("success", "Connexion réussie ✌️");
        res.redirect("/");
      });
    })
    .catch(err => next(err));
});

router.get("/logout", (req, res, next) => {
  // "req.logOut()" is a Passport method that removes the user ID from session
  req.logOut();
  // save a flash message to display in the login page
  req.flash("success", "Décconnexion réussie");
  res.redirect("/");
});

router.get("/search", (req, res, next) => {
  res.render("auth-views/user-search.hbs");
});

router.post("/process-search", (req, res, next) => {
  const { searchItem } = req.body;
  const searchItemCamelCase = upperCaseFirst(searchItem, { pascalCase: true });

  User.find({
    $or: [
      { lastname: searchItemCamelCase },
      { firstname: searchItemCamelCase },
      { email: searchItem }
    ]
  })
    .then(userDoc => {
      console.log(userDoc);
      if (!userDoc) {
        req.flash("error", "Aucun élève trouvé");
        res.redirect("/search");
        return;
      } else {
        console.log(userDoc);
        res.locals.userResult = userDoc;
        res.render("auth-views/user-search.hbs");
      }
    })
    .catch(err => next(err));
});

router.get("/user/:userId/details", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then(userDoc => {
      res.locals.userResult = userDoc;
      // res.render("auth-views/search-result.hbs");

      // const { userId } = req.params;
      Note.find({ student: { $eq: userId } })
        .then(noteDoc => {
          res.locals.noteResult = noteDoc;
          res.render("auth-views/search-result.hbs");
          console.log(noteDoc);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = router;
