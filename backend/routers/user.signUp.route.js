require("dotenv").config();
const router = require('express').Router()
const express = require('express')
const crypto = require('crypto')

let user = require('../models/user.auth.model')

const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
  );
  const verificationSID = process.env.TWILIO_VERIFY_SID;
  
  var newUser = {
    email: "",
    password: ""
  }
  
  function createdb(email){
    var key;
    for(var i=0;i<email.length;i++) {
      if(email.charAt(i)=='@'||email.charAt(i)=='.') {key=i;break;}
    }
    var name=email.slice(0, key)

    var url = `mongodb+srv://saral:saral@cluster0.1eecc.mongodb.net/${name}`;
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(url, function(err, client) {
      var db=client.db(`${name}`)
      if (err) throw err;
      db.createCollection("profileDetails", function(err, result) {
        if(err) throw err;
        console.log(`Database created for ${name}`)
        client.close()
      })
    });
}
router.route('/').post((req, res) => {
  const email=req.body.email
  const md5sum = crypto.createHash('md5')
  const password=md5sum.update(req.body.password).digest('hex')
  
  newUser=new user({email: email, password: password})

  // CREATE A NEW VERIFICATION HERE
  twilioClient.verify
  .services(verificationSID)
  .verifications.create({ to: email, channel: "email" })
  .then(verification => {
    console.log("Verification email sent");
  })
  .catch(error => {
    console.log(error);
  });
})

router.route('/verify').post((req, res) => {
  const userCode=req.body.OTP
  const email=req.body.email

  console.log('Email: ', email)
  console.log('Code: ',userCode)
  twilioClient.verify
  .services(verificationSID)
  .verificationChecks.create({ to: email, code: userCode })
  .then(verification_check => {
    console.log(verification_check.status)
    if (verification_check.status === "approved") {
      newUser.save()
        .then(() => {
          createdb(newUser.email)
          user.findOne({email: email}).
            then(result => res.json(result))
        })
        .catch(err => res.status(400).json('Error: '+err))
    } else {
      res.render("verify", {
        email: email,
        message: "Verification Failed. Please enter the code from your email"
      });
    }
  })
  .catch(error => {
    console.log(error);
    res.render("verify", {
      email: email,
      message: "Verification Failed. Please enter the code from your email"
    });
  });
})

module.exports = router
