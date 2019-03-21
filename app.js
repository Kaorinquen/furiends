//  NPM bcryptjs | connect-flash | ejs | express | express-ejs-layouts | express-session | mongoose | passport | passport-local
require("dotenv").config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var cloudinary = require('cloudinary');

const app = express();

// Passport config
require('./config/passport')(passport);

//Connect DB Config
const db = require('./models'); //<-- Database Connection

//Middleware
app.use(express.json());
app.use(express.static("public"));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: true }));

// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//coludinary config
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

//Express Session Middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
app.use(require('./routes/index'));
app.use('/users', require('./routes/users'));
require("./routes/apiRoutes.js")(app);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log('Listening on PORT: http://localhost:' + PORT);
  });
});
