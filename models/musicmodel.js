
 require("dotenv").config();
 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;


 const MongoClient = require("mongodb").MongoClient;
  const client = await new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/music", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
  client.connect();
 mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
 mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/music", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

 const songSchema  = mongoose.Schema({
   name:{ type: String, require: true },
   firstAuthur:{type: String, require: true},
   createdAt: {type: Date, default: Date.now},
   audiourl: {type: String, require: true }
 });

 module.exports = mongoose.model("Song", songSchema);
