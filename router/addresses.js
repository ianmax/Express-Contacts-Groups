const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');
const Address = require('../Models/address');
const Contact = require('../Models/contact');

router.get('/addresses', (req, res) => {
  let qAddress = 'SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Addresses LEFT JOIN Contacts ON Addresses.ContactId = Contacts.id';
  let qContact = 'SELECT * FROM Contacts';
  db.all(qAddress, (err, rows) => {
    // console.log(err);
    if (!err) {
      console.log(err);
      db.all(qContact, (err, rowsContact) => {
        res.render('addresses', { data: rows, dataContacts: rowsContact, errorMsg: '' });
      });
    }
  });
});

//ADD DATA addresses
router.post('/addresses', (req, res) => {
  db.run(`INSERT into Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.ContactId}')`, function (err) {
    let errorAdd = err;
    let qAddress = 'SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Addresses INNER JOIN Contacts ON Addresses.ContactId = Contacts.id';
    let qContact = 'SELECT * FROM Contacts';
    db.all(qAddress, (err, rows) => {
      if (!err) {
        // console.log(err);
        db.all(qContact, (err, rowsContact) => {
          res.render('addresses', { data: rows, dataContacts: rowsContact, errorMsg: errorAdd });
        });
      }
    });
  });
});

// TAMPIL EDIT addresses
router.get('/addresses/edit/:id', (req, res) => {
  db.all(`SELECT * from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
    res.render('editaddresses.ejs', { dataJsonAddresses: rows });
    let idAddrressEdit = req.params.id;
    router.post('/addresses/edit/:id', function (req, res) {
      db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}' WHERE id = ${idAddrressEdit}`, function (err) {
        if (err) {
          console.log(err);
        }
      });

      res.redirect('/addresses');
    });
  });
});

//HAPUS DATA addresses
router.get('/addresses/delete/:id', (req, res) => {
  db.all(`DELETE from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../addresses');
  });
});

module.exports = router;
