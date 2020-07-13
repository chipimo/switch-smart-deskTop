// var nrc = require('node-run-cmd');
var cmd = require("node-cmd");
var moment = require("moment");

export async function socketStream(sendCallback) {
  require("dotenv").config();
  const date = new Date();
  var check = moment(new Date());
  var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
  var month = check.format("MMMM"); // => ('January','February.....)
  var year = check.format("YYYY");
  var time = check.format("LT");

  const current_date = `${date.getFullYear()}-${month}-${day}-${date.getHours()}-${date.getMinutes()}`;
  const backup_file = `export_${current_date}`;
  const backup_file_ext = `export_${current_date}.tar`;
  const fs = require("fs-extra");
  const file = `C:/Switch-Smart/backups/doc.md`;
  fs.ensureFileSync(file);

  let backup_script = `SET PGPASSWORD=root&&"C:/Program Files/PostgreSQL/12/bin/pg_dump" -U postgres -F t switch_smart > C:/Switch-Smart/backups/${backup_file_ext}`;
  // cmd.run(backup_script);
  cmd.get(backup_script, function (err, data, stderr) {
    if (!err) {
      sendCallback(true)
    } else {
      sendCallback(false)
    }
  });
}

export async function restoreDB(prop,sendCallback) {
  let backup_script = `SET PGPASSWORD=root&&"C:/Program Files/PostgreSQL/12/bin/pg_restore" --verbose --clean --no-acl --no-owner --host=localhost --dbname=switch_smart --username=postgres > C:/Switch-Smart/backups/${prop.backup_file}`;

  cmd.get(backup_script, function (err, data, stderr) {
    if (!err) {
      sendCallback(true)
      console.log(data);
      
    } else {
      sendCallback(false)
      console.log(err);
    }
  });
}


// pg_restore -h localhost -p 5432 -U postgres -d old_db -v "/usr/local/backup/10.70.0.61.backup"

// pg_dump -h localhost -p 5432 -U postgres -F c -b -v -f "/usr/local/backup/10.70.0.61.backup" old_db