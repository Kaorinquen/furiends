//  NPM bcryptjs | connect-flash | ejs | express | express-ejs-layouts | express-session | mongoose | passport | passport-local

const express = require ('express');
const expressLayouts = require('express-ejs-layouts');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express ();

// Passport config
//require('./config/passport')(passport);

//Connect DB Config
// const db = require() <-- Database Connection

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false}));

//Express Session Middleware
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//Routes
app.use("/", require('./routes/index'));
app.use("/users", require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Listening on PORT: http://localhost:" + PORT));

