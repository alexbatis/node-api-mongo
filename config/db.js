'use strict';
var mongoose = require('mongoose');

var config = {
  "db": "restgoose-todo",  
  "host": "localhost",  
  "user": "",
  "pw": "",
  "port": 27017
};

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';
var uristring = "mongodb://" + login + config.host + port + "/" + config.db;

var mongoOptions = { db: { safe: true } };

mongoose.Promise=global.Promise;

// Connect to Database
mongoose.connect(uristring, mongoOptions, function (err, res) {
  if(err){
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  }else{
    console.log('Successfully connected to: ' + uristring);
  }
});


exports.mongoose = mongoose;