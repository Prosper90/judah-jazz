require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


const adminSchema  = mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true}
});

module.exports = mongoose.model("Admin", adminSchema);
