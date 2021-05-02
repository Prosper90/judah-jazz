const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const Song = require("../models/musicmodel.js");
const Admin = require("../models/adminModel");
const multer = require("multer");
const fs = require("fs");
const passport = require("passport");
const localStrategy = require("passport-local");
const auth = require("../passportAuth/auth");
const router = express.Router();








router.get("/login", function(req, res){
 res.render("adminLogin");
});


router.post('/login', passport.authenticate('local', {
       successRedirect : '/admin', // redirect to the secure profile section
       failureRedirect : '/admin/login', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
   }));


//multer package to help with upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/media")
  },
  filename: function (req, file, cb) {
    const { originalname} = file;
    cb(null, originalname);
  }
});

const upload = multer({ storage: storage });


//get request for admin page
 router.get("/", ensureAuthenticated, function(req, res){
  res.render("admin");
});

//Post request for admin
router.post("/", upload.single("media"),  async function(req, res){

//get the latest uploaded file
  function getLatestFile(dirpath) {
    // Check if dirpath exist or not right here
    let latest;

    const files = fs.readdirSync(dirpath);
    files.forEach(filename => {
      // Get the stat
      const stat = fs.lstatSync(path.join(dirpath, filename));
      // Pass if it is a directory
      if (stat.isDirectory())
        return;
      // latest default to first file
      if (!latest) {
        latest = {filename, mtime: stat.mtime};
        return;
      }
      // update latest if mtime is greater than the current latest
      if (stat.mtime > latest.mtime) {
        latest.filename = filename;
        latest.mtime = stat.mtime;
      }
    });

    return latest.filename;
  }


let audio = getLatestFile("public/assets/media");

//get the src of the new uploaded media

let src = "/assets/media/"+ audio + " ";

//console.log(src);

let song = new Song ({
    name: req.body.name,
    firstAuthur: req.body.firstAuthur,
    audiourl: src
  });

try{
  await song.save();
  res.redirect("/")
}catch(err) {
 console.log(err);
}
});

function ensureAuthenticated(req, res, next) {
  console.log("work");
  if (req.isAuthenticated()){
    return next();
  }else{
    // Return error content: res.jsonp(...) or redirect:
     res.redirect('/admin/login')
   }
}


module.exports = router;
