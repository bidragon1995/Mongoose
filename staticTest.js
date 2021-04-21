var express = require('express');
var app = express();

app.use('/static', express.static('public'));

app.get('/', function(req,res) {
    res.render('resources.pug');
})

app.listen(8080);