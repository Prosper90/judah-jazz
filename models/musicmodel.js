   require("dotenv").config();
   const mongoose = require("mongoose");
   const schema = const Schema = mongoose.Schema;

 mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

   const songSchema  = mongoose.Schema({
     name:{
       type: String,
       require: true
     },
     date: String,
     imageurl: String,
     audiourl: String
   });

   const Song = mongoose.model("Song", songSchema);

   module.exports = musicModel;
