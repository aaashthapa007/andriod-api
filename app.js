const express = require('express');
const jwt = require('jsonwebtoken');

require('./db/database');
// const hbs = require('hbs');
// var favicon = require('serve-favicon');
const bodyParser = require("body-parser");
const hbs = require('hbs')
const app = express();
const cors = require('cors')
// const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use(express.static("./images"));
// app.use(express.static(path.join(__dirname,'.','public')));

app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/product')); 
app.use('/api', require('./routes/vendor'));
app.use('/api', require('./routes/order'));
// app.use('/api', require('./routes/inventory'));
// app.use('/api', require('./routes/image'));


app.use(express.static(__dirname + '/render'));
app.set('view engine', 'hbs')

 






// to insert value into products
// app.get('/add', function(req,res){
//     res.sendFile(__dirname + '/render/AddProduct.html');
// });





// creates a server for the program to run
var server = app.listen(4000, function () {
    console.log('Node server is running..');
});