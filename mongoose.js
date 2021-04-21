var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(function(req,res,next){
    console.log(req.url);
    next();
});

app.set('view engine', 'pug');
app.set('views', './views');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose');

console.log('mongoose server running...!');

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.get('/person', (req,res) => {
    res.render('person.pug');
})

app.post('/person', function(req, res) {
    console.log("Received a POST request!!");

    var personInfo = req.body;

    if(!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {
            message: "Sorry, you provided Wrong Info", type: "error"
        });
    }
    else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });
        newPerson.save(function(err, Person){
            if(err) {
                res.render('show_message.pug', {message: "Database error", type: "error"})
            }
            else {
                res.render('show_message.pug', {message: "New Person added!", type: "success", person: personInfo})
            }
        });
    }
});

app.listen(8080);