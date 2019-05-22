var express = require('express');
var session = require('express-session');
const user = require('./routes/user.route');
const group = require('./routes/group.route');
const category = require('./routes/category.route');
const product = require('./routes/product.route');

//----------------------- START MongoDB Confiuration ------------------------------------------
const mongoose = require('mongoose');

let dev_db_url = 'mongodb+srv://rk1:1@cluster0-cyfug.mongodb.net/sgthread?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB,{ useNewUrlParser: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//----------------------- END MongoDB Confiuration ------------------------------------------

//----------------------- START EXPRESS JS CODE ---------------------------------------------
var app = express();

//-------- SESSION --------------------------------
app.use(session({secret: '/*-+#$ZXCVBBNM1234QWERTYUIOP567ASDFGHJKL890%^&!(){}[]<>'}));

//-------- CSS JAVASCRIPT IMAGES ------------------
app.use('/assets', express.static('assets'))
app.use('/assets2', express.static('assets2'))

//------- EJS ---------------
app.set('view engine', 'ejs');

//------- ROUTING ----------sss
app.use('/',user);
app.use('/group',group);
app.use('/cat',category);
app.use('/product',product);

app.listen(3000, () => {
  console.log("Server Started ...........");
})
//----------------------- END EXPRESS JS CODE ---------------------------------------------