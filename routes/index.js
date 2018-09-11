const express = require("express");
const router = express.Router();

const nodemailer = require('nodemailer');

const User = require("../models/user-model.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET contact page */ 
router.get('/contact', (req, res, next) => {
  res.render("contact-form");
});

router.post('/process-contact', (req, res, next) => {
  const output = `<p> You have a new contact request <p>
                  <h3> Contact Details </3>
                  <ul>
                  <li> Name: ${req.body.name}</li>
                  <li> Email: ${req.body.email}</li>
                  </ul>
                  <h3> Message </h3>
                 <p> ${req.body.message} </p>`
                 ;

                 'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service:'Gmail',
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL, // generated ethereal user
            pass: process.env.PASS // generated ethereal password
        },
        tls:{
          rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"fabunotutorat@gmail.com', // sender address
        to: "fabunotutorat@gmail.com", // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact-form', {msg: 'Email has been sent'});
    });
});

});

module.exports = router;
