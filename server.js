 const express = require("express");
 const path = require('path');
const serveStatic = require('serve-static');
const mongoose = require("mongoose");
const Song = require("./models/musicmodel");
const bodyParser = require('body-parser');
const admin = require("./routes/adminRoute");
const about = require("./routes/aboutRoute")
 const app = express();






app.use(bodyParser.urlencoded({ extended: false }));
//use the adminRoute.js
app.use("/Admin", admin);
//use the aboutRoute.js
app.use("/About", about);


//telling express to use certainpackages
 app.use(express.static(path.join(__dirname, "public")));
 app.set("view engine", "ejs");




//get request for the home view
 app.get("/", async function(req, res, next){

 let page = req.query.page;
 let size = 6;
 if(!page){
   page = 1;
}
  const limit = size;
  const skip = (page - 1) * size;

   const song = await Song.find().sort({ _id: -1}).limit(limit).skip(skip);

   const totalCount = await Song.count();

   //console.log(totalSongs);


   res.render("home",
   {
     song : song,
      currentPage : page,
     pageCount : Math.ceil(totalCount/size)
    });
 });





 app.listen(3000, () => {
   console.log("listening on port 3000");
 });
