var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', './views');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose', { useNewUrlParser : true });

console.log('mongoose server running...!');

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.get('/', (req,res) => {
    res.render('indexPerson.pug');
});

app.get('/person', (req,res) => {
    Person.find((err,response) => {
        res.json(response);
    })
});

app.get('/create', (req,res) => {
    res.render('createPerson.pug');
})

app.post('/create', function(req, res) {
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

app.get('/update', (req,res) => {
    res.render('update.pug');
});

app.post('/update', function(req, res) {
    var personInfo = req.body;

    if(!personInfo.id || !personInfo.name || !personInfo.age || !personInfo.nationality){
        res.render('show_message', {
            message: "Sorry, Your info was missing field", type: "error"
        });
    } else {
        Person.findByIdAndUpdate(personInfo.id, personInfo, function(err, response){
            if(err) {
                res.render('show_message', {message : "Update Error ! Check Info and try again", type : "error"})
            } else {
               res.render('show_message', {message : "Updated Person Id " 
               + personInfo.id + " Successful", type: "success", person: personInfo});
            }
        });
    }
});

app.get('/delete', (req,res) => {
    res.render('delete');
})

app.post('/delete', function(req,res) {
    Person.findByIdAndRemove(req.body.id, function(err,response){
        if(err){
            res.render('show_message.pug', {message: "Error to delete this Person! Check your ID and Try again"
            , type: "error"})
        } else{
            res.send("Delete Successful Person ID " + req.body.id);
        }
    });
});

app.listen(8080);