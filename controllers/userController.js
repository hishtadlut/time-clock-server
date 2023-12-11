const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('timeclock.db');

exports.createUser = (req, res) => {
    const { username, password, role } = req.body;
    const stmt = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
    stmt.run(username, password, role, function (err) {
        if (err) {
            res.status(500).send("Error creating user");
        } else {
            res.status(201).send(`User created with ID ${this.lastID}`);
        }
    });
    stmt.finalize();
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
