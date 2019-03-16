const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      db.User.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'That email is not registered'
            });
          };
          //console.log("This is working");
          // Match the password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                console.log('AUTHENTICATED');
                //console.log(user);
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password Incorrect' });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findOne({ where: { id: id } }).then( function(user) {
      console.log(user)
      done(null, user);
    });
  });
};
