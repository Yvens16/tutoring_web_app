const express = require("express");
const router = express.Router();

const User = require("../models/user-model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET contact page */ 
router.get('/contact', (req, res, next) => {
  res.render("contact-form");
})

module.exports = router;
