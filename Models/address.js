var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

class Address {
  constructor(data) {
    this.id           = data.id;
    this.street       = data.street;
    this.city         = data.city;
    this.zipcode      = data.telp_number;
  }

  static findAll(callback) {
    db.all('SELECT * FROM addresses', (err, rows) => {
      let arrAddress = [];
      rows.forEach(function (rowObj, index) {
        arrAddress.push(new Address(rowObj));

        if (index >= rows.length - 1) {
          callback(err, aarrAddress);
        }
      });
    });
  }
}

module.exports = Address;
