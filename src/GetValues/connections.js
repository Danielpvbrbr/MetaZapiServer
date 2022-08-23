// const client = require('../Client');
const mysql = require('../../connection');

const Connections = (socket) => {
    mysql.con.query(`SELECT * FROM card;`,
        (err, rows, fields) => {
            if (rows.length > 0) {
                socket.emit('cards', rows);
            } else {
                socket.emit('cards', []);
            };
        });

    mysql.con.query(`SELECT * FROM contacts;`,
        (err, rows, fields) => {
            if (rows.length > 0) {
                socket.emit('contacts', rows);
            } else {
                socket.emit('contacts', []);
            };
        });

    mysql.con.query(`SELECT * FROM msg;`,
        (err, rows, fields) => {
            if (rows.length > 0) {
                socket.emit('msg', rows);
            } else {
                socket.emit('msg', []);
            };
        });

        
};


module.exports = Connections;