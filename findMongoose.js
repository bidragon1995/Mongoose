var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose');

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});

var Person = mongoose.model("Person", personSchema);

Person.findOneAndUpdate({age: 25}, {nationality: "Philipinese"}, function(err, response){
   console.log(response);
});

app.get('/find', function(req, res){
   Person.find(function(err, response){
      res.json(response);
   });
});

app.listen(8080);