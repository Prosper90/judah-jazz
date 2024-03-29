
 require("dotenv").config();
 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/music", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).
  catch(error => handleError(error));

 const songSchema  = mongoose.Schema({
   name:{ type: String, require: true },
   firstAuthur:{type: String, require: true},
   createdAt: {type: Date, default: Date.now},
   audiourl: {type: String, require: true }
 });

 module.exports = mongoose.model("Song", songSchema);
