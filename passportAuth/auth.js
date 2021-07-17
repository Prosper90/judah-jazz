const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;



module.exports = function(passport, Admin) {

  //now we call passport to serialize our user

  //passport-Strategy//use passport local strategy and call authenticate user funtion
  passport.use(new LocalStrategy( async function(username, password, done) {
    console.log("called local strategy");
     await  Admin.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        console.log(user);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Admin.findById(id, function(err, user) {
    done(err, user);
  });
});




  //passport


}
