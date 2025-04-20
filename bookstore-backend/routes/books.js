const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/', authenticateToken, (req, res) => {
    const { title, author, genre, price, stock } = req.body;
    const sql = 'INSERT INTO books (title, author, genre, price, stock) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [title, author, genre, price, stock], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Book added' });
    });
});

module.exports = router;
