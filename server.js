 const express = require("express");
 const path = require('path');
const serveStatic = require('serve-static');
 const app = express();


let databasemusic = [
  {
name: "He turned it",
firstAuthur: "Tye tribbet",
date: "i4th of april 2021",
audiourl: "C:\Users\pc\Music\burna-boy-ye-official-video.mp3",
description: "Edited and written by praise"
},

{
name: "Blessings",
firstAuthur: "James fortune",
date: "i4th of april 2021",
audiourl: "C:\Users\pc\Music\ckay-love-nwantiti-remix-ft-joeboy-kuami-eugene-offici.mp3",
description: "Edited and written by Solo"
},

{
name: "Let it rain",
firstAuthur: "Kirk franklin",
date: "i4th of april 2021",
audiourl: "C:\Users\pc\Music\hakuna-matata-the-lion-king-1994.mp3",
description: "Edited and written by Prevail"
}
];

 app.use(express.static(path.join(__dirname, "public")));
 app.set("view engine", "ejs");

 app.get("/", function(req, res){
   res.render("home", {
     name:databasemusic.name,
     description: databasemusic.description,
     date: databasemusic.date,
     audiourl: databasemusic.audiourl,
     firstAuthur: databasemusic.firstAuthur,
     databasemusic: databasemusic
}
 );
 });



app.get("/about", function(req, res){
  res.render("about");
});







 app.listen(3000, () => {
   console.log("listening on port 3000");
 });
