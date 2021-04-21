var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + "." + file.originalname.split(".")[1]);
    }
  })

var upload = multer({storage})

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req,res) => {
    res.render('forms.pug');
})

//body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Multer - parsing multipart/form data


app.use(express.static('public'));

app.post('/', function(req,res) {
    console.log(req.body);
    res.send('Received your request');
})

app.post('/update-avatar', upload.single('avatar'), function(req,res) {
    
    res.send('Received your request');
})



app.listen(8080, () => {
    console.log("Server start at port 8080");
});