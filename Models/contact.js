var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

class Contact {
  constructor(data) {
    this.id           = data.id;
    this.name         = data.name;
    this.company      = data.company;
    this.telp_number  = data.telp_number;
    this.email        = data.email;
  }

  static findAll(callback) {
    db.all('SELECT * FROM contacts', (err, rows) => {
      let arrContact = [];
      rows.forEach(function (rowObj, index) {
        arrContact.push(new Contact(rowObj));

        if (index >= rows.length - 1) {
          callback(err, arrContact);
        }
      });
    });
  }

  static delete(callback, data) {
    db.run(`DELETE from contacts WHERE id = "${data.param('id')}"`, (err, rows) => {

      callback(rows, err);
    });
  }

  static findById(callback, id) {
    db.each(`SELECT * FROM contacts WHERE id = ${id}`, (err, data) => {
      callback();
    });
  }

  static create(body, callback) {
    db.run(`INSERT into contacts (name, company, telp_number, email) VALUES ("${body.name}", "${body.company}",
    "${body.telp_number}", "${body.email}")`, (err) => {
      callback();
    });
  }

  static editById(params, cb) {
    db.each(`SELECT * FROM contacts WHERE id = ${params.id}`, (err, rows) => {
      cb(err, rows);
    });
  }

  static update(body, params, callback) {
    db.run(`UPDATE contacts SET name = '${body.name}', company = '${body.company}', telp_number = '${body.telp_number}', email = '${body.email}' WHERE id = '${params.id}'`, (err) => {
        callback(err);
      });
  }
  }

  module.exports = Contact;
