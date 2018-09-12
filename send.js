const mongoose = require('mongoose');
const 


// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC6daac4567180e9bcd07e51ec01c29676';
const authToken = '1250540d1e7e24d864cbef283363b2d8';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hello, from my node server ',
     from: '+33 644644683',
     to: '+33 627269473'
   })
  .then(message => console.log(message.sid))
  .done();