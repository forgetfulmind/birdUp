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

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


//S3 Stuff 
const aws = require('aws-sdk');
aws.config.region = 'us-east-2';
// aws.config.credentials({
//   accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`, secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`, sessionToken: 'session'
// });

// aws.Config({
//   accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`, secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`, region: "us-east-2"
// });
aws.config.loadFromPath('./config/config.json');

const S3_BUCKET = 'birdup';

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err, "getsignedURLerror");
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    console.log(returnData)
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


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
