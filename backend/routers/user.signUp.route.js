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

router.route('/').post((req, res) => {
  const email=req.body.email
  const md5sum = crypto.createHash('md5')
  const password=md5sum.update(req.body.password).digest('hex')
  
  newUser=new user({email: email, password: password})

  // //CREATE A NEW VERIFICATION HERE
  twilioClient.verify
  .services(verificationSID)
  .verifications.create({ to: email, channel: "email" })
  .then(verification => {
    console.log("Verification email sent");
    // res.redirect(`/verify?email=${email}`);
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
      // database.verifyUser(email);
      newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error: '+err))
      // res.redirect("users");
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