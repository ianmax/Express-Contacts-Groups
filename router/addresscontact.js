const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');
const Contact = require('../Models/contact');
const Address = require('../Models/address');

router.get('/contacts/address/:id', (req, res) => {
  let qAddress = `SELECT * FROM Addresses where ContactId = "${req.params.id}"`;
  db.all(qAddress, (err, rows) => {
    console.log(req.params.id);
    db.get(`select * from Contacts where id = "${req.params.id}"`, (err, rowsContact) => {
      res.render('addresscontact', { data: rows, dataContacts: rowsContact });
    });
  });
});

//WRITE CONTACT Address
router.post('/contacts/address/:id', (req, res) => {
  let insert = `INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}', '${req.body.city}','${req.body.zipcode}', '${req.params.id}')`

  db.run(insert, (err) => {
    // res.send(insert)
    // console.log(insert)
    res.redirect(`/contacts/address/${req.params.id}`);
    // console.log('data diupdate')
  })
})


module.exports = router;
