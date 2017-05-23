var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();

//port no
const port = 3000;

const route = require('./routes/route');

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/contactlist');

mongoose.connection.on('connected', function(){
  console.log('Connected to database mongo at port 27017');
});

mongoose.connection.on('error', function(err){
  if(err){
    console.log('Error in database connection: '+err);
  }
});

// middleware
app.use(cors());
app.use(bodyparser.json())

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

// testing Server
app.get('/', function(req, res){
  res.send('foobar');
});

// bind port
app.listen(port, function(){
  console.log('Server started at port: '+port)
});
