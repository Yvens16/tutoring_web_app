const express = require("express");

const Note = require("../models/note-model.js");
const User = require("../models/user-model.js");
const fileUploader = require("../config/file-uploader.js");

const router = express.Router();

router.get("/note", (req, res, next) => {
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

router.post(
  "/process-note",
  fileUploader.single("noteFileUpload"),
  (req, res, next) => {
    const { title, topic, noteCours } = req.body;
    const student = req.user._id;
    let noteFile;

    if (req.file) {
      noteFile = req.file.secure_url;
    }
    // res.send(req.file);
    Note.create({ title, topic, noteCours, noteFile, student })
      .then(noteDoc => {
        req.flash("success", "Cours ajouté avec succès 😍");
        res.redirect("/note");
      })
      .catch(err => next(err));
  }
);

router.get("/note/:noteId", (req, res, next) => {
  // get the ID from the URL
  const { noteId } = req.params;

  Note.findById(noteId)
    .populate("user")
    .then(noteDoc => {
      // send the database results (1) to the template as "noteItem"
      res.locals.noteItem = noteDoc;
      res.render("note-views/note-details.hbs");
    })
    .catch(err => next(err));
});

router.get("/note/:noteId/edit", (req, res, next) => {
  // get the ID from the URL
  const { noteId } = req.params;

  Note.findById(noteId)
    .then(noteDoc => {
      // send the database results (1) to the template as "noteItem"
      res.locals.noteItem = noteDoc;
      res.render("note-views/note-edit.hbs");
    })
    .catch(err => next(err));
});

router.post("/note/:noteId/process-edit", (req, res, next) => {
  const { noteId } = req.params;
  const { topic, title, noteCours } = req.body;

  Note.findByIdAndUpdate(
    noteId, // which document(s)?
    { $set: { topic, title, noteCours } }, // what changes?
    { runVzlidators: true } // additionnal settings
  )
    .then(noteBook => {
      // redirect if it's successful to avoid duplicating the submission
      // redirect ONLY to URLs - "/books/$bookId" instead of "book-list.hbs"
      req.flash("success", "Ton cours a bien été modifié");
      res.redirect(`/note/${noteId}`);
    })
    .catch(err => next(err));
});

router.get("/note/:noteId/delete", (req, res, next) => {
  const { noteId } = req.params;

  Note.findByIdAndRemove(noteId)
    .then(noteBook => {
      // redirect if it's successful to avoid duplicating the submission
      // redirect ONLY to URLs - "/note" instead of "note-list.hbs"
      req.flash("success", "Ton cours a bien été supprimé");
      res.redirect("/note");
    })
    .catch(err => next(err));
});

module.exports = router;
