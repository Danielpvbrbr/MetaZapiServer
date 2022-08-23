const express = require('express');
const router = express.Router();
const msyql = require('../../connection');
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const secret = 'abcdefg';


// function cripto() {
//     const hash = crypto.createHmac('sha256', secret)
//         .update('I love cupcakes')
//         .digest('hex');
//     console.log(hash);

// }


router.post('/', (req, res, next) => {
    msyql.con.query(`SELECT id FROM auth WHERE user=? && pass=?;`, [
        req.body.user,
        req.body.pass
    ], (err, rows, fields) => {
        if (rows.length > 0) {
            const id = rows[0].id;
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 4000
            });
            return res.json({ auth: true, token: token, id: id });
        } else {
            res.status(500).json({ message: 'Login inválido!' });
        };
    });
});




module.exports = router;