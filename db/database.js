const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./db/users.db', (err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to SQLite database");
});

const initSQL = fs.readFileSync('./data/init.sql', 'utf8');
db.exec(initSQL, (err) => {
  if (err) console.error("Table creation error:", err);
  else console.log("Table is ready");
});

module.exports = db;
