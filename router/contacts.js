const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');
const Contact = require('../Models/contact');

router.get('/contacts', (req, res) => {
  Contact.findAll(function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.render('contacts', { dataJsonContacts: rows });
    }
  });
});

//ADD DATA CONTACTS
router.post('/contacts', (req, res) => {
  Contact.create(req.body, () => {
    res.redirect('contacts');
  });
});

// TAMPIL EDIT CONTACTS
router.get('/contacts/edit/:id', (req, res) => {
  Contact.editById(req.params, (err, data) => {
    if (!err) {
      res.render('editcontact', { data: data });
    }
  });
});
router.post('/contacts/edit/:id', function (req, res) {
  Contact.update(req.body, req.params, (err) => {
    if (!err) {
      res.redirect('/contacts');
    }
  })
})

  //HAPUS DATA CONTACTS
  router.get('/contacts/delete/:id', (req, res) => {
    Contact.delete(function (contact, err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('../../contacts');
      }
    }, req);
  });

  module.exports = router;
