const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Database/library.sqlite');

// Create borrowers table
db.run(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);

// Create borrowing_dates table
db.run(`
  CREATE TABLE IF NOT EXISTS borrowing_dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    borrower_id INTEGER,
    borrow_date TEXT,
    return_date TEXT,
    FOREIGN KEY (borrower_id) REFERENCES borrowers(id)
  )
`);

// Create books table
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT
  )
`);

db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database created and tables initialized successfully.');
  }
});