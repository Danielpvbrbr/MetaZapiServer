const msyql = require('../../connection');
const Menu = require('./Menu');
const Option = require('./Option');
const Index = require('../Msg/Index');

const Bot = (msg, client) => {
    const body = msg._data;

    function isNum(val) {
        return !isNaN(val)
    }

    msyql.con.query(`SELECT * FROM card WHERE phone_id=? AND closed=?;`, [
        body.from,
        false
    ],
        (err, rows, fields) => {
            if (rows.length > 0) {
                Index(msg, client);
            } else {
                if (msg.body !== null && isNum(msg.body)) {
                    Option(msg, client);
                }
                else if (msg.body !== null || msg.body === "0") {
                    Menu(msg, client);
                }
            }
        });

};

module.exports = Bot;