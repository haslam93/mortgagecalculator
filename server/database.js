const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mortgage.db');

db.serialize(() => {
  // Create Rates table
  db.run(`CREATE TABLE IF NOT EXISTS rates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT,
    interest_rate REAL,
    apr REAL,
    term_years INTEGER
  )`);

  // Seed data if empty
  db.get("SELECT count(*) as count FROM rates", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO rates (product_name, interest_rate, apr, term_years) VALUES (?, ?, ?, ?)");
      stmt.run("30-Year Fixed", 6.5, 6.62, 30);
      stmt.run("15-Year Fixed", 5.8, 5.95, 15);
      stmt.run("5/1 ARM", 6.1, 6.8, 30);
      stmt.run("FHA 30-Year Fixed", 6.0, 6.9, 30);
      stmt.finalize();
      console.log("Seeded rates data");
    }
  });
});

module.exports = db;
