const express = require('express');
const router = express.Router();
const msyql = require('../../connection');
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();
const { Server } = require("socket.io");


router.post('/', verifyJWT, (req, res, next) => {
    msyql.con.query(`SELECT * FROM auth WHERE id=?;`, [
        req.body.id,
    ], (err, rows, fields) => {
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json([]);
        }
    });

})

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};

module.exports = router;