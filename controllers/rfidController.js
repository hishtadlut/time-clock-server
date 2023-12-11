const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('timeclock.db');

exports.readRFID = (req, res) => {
    const { rfid_tag } = req.body;
    if (!rfid_tag) {
        return res.status(400).send('RFID tag is required');
    }
    const stmt = db.prepare("INSERT INTO rfid_data (rfid_tag) VALUES (?)");
    stmt.run(rfid_tag, function (err) {
        if (err) {
            return res.status(500).send("Error inserting RFID data: " + err.message);
        }
        res.status(200).json({ message: 'RFID data inserted', id: this.lastID });
    });
    stmt.finalize();
};
