var express = require('express');
var app = express();


app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id)
    next()
}, function (req, res, next) {
    res.send('User Info');
    console.log("Oke");
})

app.get('*', function(req,res) {
    res.send('Sorry, the url you typed was uncorrected');
})

app.listen(8080);

console.log("Server is running ...!!!");

console.log("Server is running 222 ...!!!");