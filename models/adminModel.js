require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


try {
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/music", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
console.log("Admin connected")
} catch (error) {
  handleError(error);
}


const adminSchema  = mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true}
});

module.exports = mongoose.model("Admin", adminSchema);
