var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// app.get('/index', function(req,res) {
//     res.render('index.pug', {
//         user: {name : "Bi Dragon", age : "27"}
//     });
// });

app.get('/index', function(req,res) {
    res.render('content.pug');
});

app.listen(8080);