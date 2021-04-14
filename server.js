 const express = require("express");

 const app = express();

 app.app.use('/static', express.static(__dirname + 'public'));
 app.set("view engine", "ejs");

 app.get("/", function(req, res){
   res.render("views/home");
 });









 app.listen(3000, () => {
   console.log("listening on port 3000");
 });
