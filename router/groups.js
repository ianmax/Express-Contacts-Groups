const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');
const Group = require('../Models/group');

router.get('/groups', (req, res) => {
  Group.findAll(function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.render('groups', { data: rows });

      // console.log(rows);
    }
  });
});

//ADD DATA groups
router.post('/groups', (req, res) => {
  db.run(`INSERT into Groups (name_of_group) VALUES ('${req.body.name_of_group}')`, function (err, rows){
    console.log(err);
    res.redirect('groups');
    console.log(req.body);
  });
});

// TAMPIL EDIT groups
router.get('/groups/edit/:id', (req, res) => {
  db.all(`SELECT * from Groups WHERE id = "${req.params.id}"`, (err, rows) => {
    res.render('editgroups.ejs', { dataJsonContacts: rows });
    let idGroupEdit = req.params.id;
    router.post('/groups/edit/:id', function (req, res) {
      db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${idGroupEdit}`, function (err, rows) {
        if (err) {
          console.log(err);
        }
      });

      res.redirect('/groups');
    });
  });
});

//HAPUS DATA groups
router.get('/groups/delete/:id', (req, res) => {
  db.all(`DELETE from Groups WHERE id = "${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../groups');
  });
});

module.exports = router;
