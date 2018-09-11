const express = require("express");

const Note = require("../models/note-model.js");

const router = express.Router();

router.get("/my-notes", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "Tu dois te connecter pour voir tes cours 😓");
    res.redirect("/login");
    return;
  }

  Note.find({ student: { $eq: req.user._id } })
    .sort({ createdAt: 1 })
    .then(noteResults => {
      res.locals.noteArray = noteResults;
      res.render("note-views/note-list.hbs");
    })
    .catch(err => next(err));
});

router.get("/note/add", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "Tu dois te connecter pour ajouter un cours 😓");
    res.redirect("/login");
  } else {
    res.render("note-views/note-form.hbs");
  }
});

router.post("/process-note", (req, res, next) => {
  const { title, topic, noteCours } = req.body;
  const student = req.user._id;

  Note.create({ title, topic, noteCours, student })
    .then(noteDoc => {
      req.flash("success", "Cours ajouté avec succès 😍");
      res.redirect("/my-notes");
    })
    .catch(err => next(err));
});

module.exports = router;
