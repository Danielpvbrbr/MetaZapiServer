const mysql = require('../../connection');
const newMsgTo = require('./newMsgTo');

const newCard = (body, sector, msg) => {
    const rrm = (res) => {
        return res.split('').slice(0, 12).join('');
    };

    try {
        mysql.con.query(`INSERT INTO card (name, newMsg, _timestamp, sector, closed, phone_id, phone, typeMsg, last_message) VALUES (?,?,?,?,?,?,?,?,?)`, [
            body.notifyName,
            body.isNewMsg,
            body.t,
            sector,
            false,
            body.from,
            rrm(body.from),
            msg.type,
            body.body,
        ], (err, rows, fields) => {
            if (rows !== null && rows.affectedRows >= 1) {
                newMsgTo(body, rows.insertId, msg);
            } else {
                console.log(err)
            }
        });
    }
    catch (error) {
        console.log(error)
        console.log('Deu erro')
    }

};

module.exports = newCard;