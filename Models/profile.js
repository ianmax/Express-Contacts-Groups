var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

class Profile {
  constructor(data) {
    this.id           = data.id;
    this.username     = data.username;
    this.password     = data.password;

  }

  static findAll() {
    db.all('SELECT * FROM profile', (err, rows) => {
      let arrProfile = [];
      rows.forEach(function (rowObj, index) {
        arrProfile.push(new Group(rowObj));
        if (index >= rows.length - 1) {
          callback(err, arrProfile);
        }
      });
    });
  }

}

module.exports = Profile;
