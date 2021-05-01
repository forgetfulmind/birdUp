const express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
require('dotenv').config()
//Multer
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
//info for each request
const morgan = require('morgan');
//allows diffrent domains
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Session information
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public')) //serving public src for images

// Serve up static assets (usually on heroku)
        if (process.env.NODE_ENV === "production") {
          app.use(express.static("client/build"));
        }
// Add routes, both API and view
const routes = require("./routes");
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/birdup");

//Multer
//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors())



app.use((req,res) => {
    res.status(404).json({
        errors:'page not found'
    })
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
