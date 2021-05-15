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
router.post("/", upload.single("media"), async function(req, res){

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
  res.redirect("/admin/adminUploads")
}catch(err) {
 console.log(err);
}
});





//ensure uthentication
function ensureAuthenticated(req, res, next) {
  //console.log("work");
  if (req.isAuthenticated()){
    return next();
  }else{
    // Return error content: res.jsonp(...) or redirect:
     res.redirect('/admin/login')
   }
}




//get total uploads by the admin
router.get("/adminUploads", ensureAuthenticated, async function(req, res){
   const song = await Song.find();
 res.render("adminUploads", {song: song});
});



//get a particular song to edit
router.get("/:id", ensureAuthenticated, async function(req, res){
  let song = await Song.findById(req.params.id);
  res.render("editSong", {song: song});
});




//editing a particular song
router.put("/:id",  upload.single("media"),  async function(req, res){

//getting the particular data to update
let uploadedSong = await Song.findById(req.params.id);
//console.log(uploadedSong);
//getting the url to delete
  let oldMusic = uploadedSong.audiourl;
 //console.log(uploadedSong.audiourl);


   console.log(oldMusic);

   function deleteFile(dirpath) {

     const files = fs.readdirSync(dirpath);
     files.forEach(filename => {
      let check = "/assets/media/" + filename + " ";
       // Get the stat
       //console.log(filename);
       console.log(check);
     if(oldMusic == check){
        if(req.body.Yes){
          try {
    fs.unlinkSync("public/assets/media/" + filename + "");
    console.log("file deleted");
    //file removed
      } catch(err) {
    console.error(err)
     }
        }
      };
   });

 }

 //public/assets/media/omah-lay-lo-lo-official-audio.mp3

   deleteFile("public/assets/media");

//public/assets/media/nf-therapy-session.mp3

//Then using multer again
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


    const ID = req.params.id;
    const updates = {};
      updates.name = req.body.name
      updates.firstAuthur = req.body.firstAuthur;
      updates.audiourl = src;

   await Song.findByIdAndUpdate(ID, { $set: updates,}, { new: true,});


//await Song.findOneAndUpdate({id: req.params.id},  {$set{ name: req.body.name, firstAuthur: req.body.firstAuthur, audiourl: src}});

   res.redirect('/admin/adminUploads');
})


// delete a song
router.delete("/:id", async function(req, res){
  let ID = req.params.id;
  await Song.findByIdAndRemove(ID, function(err, docs){
    if (err){
          console.log(err)
      }
      else{
          console.log("Removed User : ", docs);
      }
  })
  res.redirect('/admin/adminUploads');
});


//get out of delete
router.get("/adminUploads/cancel", function(req, res){
    res.redirect('/admin/adminUploads');
});

module.exports = router;
