const express = require("express");
const path = require('path');
const nodemailer = require("nodemailer");
const router = express.Router();







router.get("/", function(req, res){
  res.render("bookus");
});


router.post("/", function(req, res){
 //console.log(req.body)


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    }
  });



  const mailOptions = {
    from: req.body.email,
    to: process.env.USER,
    subject: "From Judah Jazz Website",
    text: req.body.message
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error) console.log(error);
    console.log(info);
  })

  res.redirect("/Bookus");
});


module.exports = router;
