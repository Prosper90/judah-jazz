 const express = require("express");
 const path = require('path');
const serveStatic = require('serve-static');
 const app = express();


let databasemusic = [
  {
    id: "hey-i",
name: "He turned it",
firstAuthur: "Tye tribbet",
date: new Date(),
audiourl: "./assets/audio/burna-boy-ye-official-video.mp3",
img: "./assets/img/avatar.jpg"
},

{
  id: "hey-ii",
name: "Blessings",
firstAuthur: "James fortune",
date: new Date(),
audiourl: "./assets/audio/ckay-love-nwantiti-remix-ft-joeboy-kuami-eugene-offici.mp3",
img: "./assets/img/ryan.jpg"
},

{
  id: "hey-iii",
name: "Let it rain",
firstAuthur: "Kirk franklin",
date: new Date(),
audiourl: "./assets/audio/hakuna-matata-the-lion-king-1994.mp3",
img: "./assets/img/julie.jpg"
}
];

 app.use(express.static(path.join(__dirname, "public")));
 app.set("view engine", "ejs");

 app.get("/", function(req, res){
   res.render("home", { databasemusic: databasemusic }
 );
 });



app.get("/about", function(req, res){
  res.render("about");
});







 app.listen(3000, () => {
   console.log("listening on port 3000");
 });
