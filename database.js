const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('timeclock.db');

db.serialize(() => {
  // Create RFID data table                                                                                                                           
  db.run(`CREATE TABLE IF NOT EXISTS rfid_data (                                                                                                      
          id INTEGER PRIMARY KEY AUTOINCREMENT,                                                                                                             
          rfid_tag TEXT NOT NULL,                                                                                                                           
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP                                                                                                      
        )`);

  // Create Users table                                                                                                                               
  db.run(`CREATE TABLE IF NOT EXISTS users (                                                                                                          
          id INTEGER PRIMARY KEY AUTOINCREMENT,                                                                                                             
          username TEXT NOT NULL,                                                                                                                           
          password TEXT NOT NULL,                                                                                                                           
          role TEXT NOT NULL                                                                                                                                
        )`);
});

db.close(); 