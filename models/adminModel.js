require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/music", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


const adminSchema  = mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true}
});

module.exports = mongoose.model("Admin", adminSchema);
