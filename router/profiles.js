const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');
const Contact = require('../Models/contact');
const Profile = require('../Models/profile');

router.get('/profiles', (req, res) => {
  let qProfile = 'SELECT Profile.id, Profile.username, Profile.password, Profile.ContactId, Contacts.name FROM Profile INNER JOIN Contacts ON Profile.ContactId = Contacts.id';
  let qContact = 'SELECT * FROM Contacts';
  db.all(qProfile, (err, rows) => {
    if (!err) {
      // console.log(err);
      db.all(qContact, (err, rowsContact) => {
        res.render('profiles', { data: rows, dataContacts: rowsContact, errorMsg: '' });
      });
    }
  });
});

//ADD DATA profile
router.post('/profiles', (req, res) => {
  db.run(`INSERT into Profile (username, password, ContactId) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.ContactId}')`, function (err) {
    let errorUniq = err;

    let qProfile = 'SELECT Profile.id, Profile.username, Profile.password, Profile.ContactId, Contacts.name FROM Profile INNER JOIN Contacts ON Profile.ContactId = Contacts.id';
    let qContact = 'SELECT * FROM Contacts';
    db.all(qProfile, (err, rows) => {
      if (!err) {
        // console.log(err);
        db.all(qContact, (err, rowsContact) => {
          res.render('profiles', { data: rows, dataContacts: rowsContact, errorMsg: errorUniq });
        });
        // res.redirect('profiles');
        // console.log(req.body);
      };
    });
  });
});

// TAMPIL EDIT profile
router.get('/profiles/edit/:id', (req, res) => {
  db.all(`SELECT * from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
    let idProfileEdit = req.params.id;
    console.log(rows);
    res.render('editprofile.ejs', { dataJsonProfile: rows });

    router.post('/profiles/edit/:id', function (req, res) {
      db.run(`UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${req.params.id}`, function (err, rows) {
        if (err) {
          console.log(err);
        }
      });
      //
      res.redirect('../../profiles');
    });
  });
});


//HAPUS DATA profile
router.get('/profiles/delete/:id', (req, res) => {
  db.all(`DELETE from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../profiles');
  });
});

module.exports = router;
