const sqlite3=require("sqlite3").verbose();
const db=new sqlite3.Database("students.db");

db.serialize(()=>{
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      gender TEXT NOT NULL,
      age INTEGER
    )
  `);
});
module.exports = db;
