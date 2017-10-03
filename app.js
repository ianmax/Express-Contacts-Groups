const express = require('express');
const app = express();
const index = require('./router');
const contacts = require('./router/contacts');
const addresscontact = require('./router/addresscontact');
const groups = require('./router/groups');
const addresses = require('./router/addresses');
const profiles = require('./router/profiles');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//READ MENU AWAL
app.use('/', index);

//READ DATA CONTACTS
app.use('/', contacts);

//READ CONTACT Address
app.use('/', addresscontact);

//READ DATA groups
app.use('/', groups);

//READ DATA addresses
app.use('/', addresses);

//READ DATA profile
app.use('/', profiles);

//listen on which server
app.listen(3000, function () {
  console.log('listen on port 3000');
});
