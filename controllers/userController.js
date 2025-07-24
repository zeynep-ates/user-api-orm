const db = require("../db/database");

const getUsers = (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "User not found" });
    res.json(row);
  });
};

const addUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, email });
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "User not found" });
    res.json({ id, name, email });
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};