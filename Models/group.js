var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

class Group {
  constructor (data) {
    this.id            = data.id;
    this.name_of_group = data.name_of_group;
  }

  static findAll(callback) {
    db.all('SELECT * FROM Groups', (err, rows) => {
      let arrGroup = [];
      rows.forEach(function (rowObj, index) {
        arrGroup.push(new Group(rowObj));
        if (index >= rows.length - 1) {
          callback(err, arrGroup);
        }
      });
    });
  }

}

module.exports = Group;
