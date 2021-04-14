 const express = require("express");
 const path = require('path');
const serveStatic = require('serve-static');
 const app = express();


let databasemusic = {
name: "He turned it",
date: "i4th of april 2021"
audiourl: "C:\Users\pc\Music\burna-boy-ye-official-video.mp3"
};

 app.use(express.static(path.join(__dirname, "public")));
 app.set("view engine", "ejs");

 app.get("/", function(req, res){
   res.render("home");
 });









 app.listen(3000, () => {
   console.log("listening on port 3000");
 });
