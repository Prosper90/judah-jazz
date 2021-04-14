 const express = require("express");
 const path = require('path');
const serveStatic = require('serve-static');
 const app = express();

 app.use(express.static(path.join(__dirname, "public")));
 app.set("view engine", "ejs");

 app.get("/", function(req, res){
   res.render("home");
 });









 app.listen(3000, () => {
   console.log("listening on port 3000");
 });
