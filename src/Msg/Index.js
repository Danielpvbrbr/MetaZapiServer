const msyql = require('../../connection');
const newMsgTo = require('./newMsgTo');
const newCard = require('./newCard');
const newContacts = require('./newContacts');


const index = async (msg, client, data) => {
    const body = msg._data;


    msyql.con.query(`SELECT * FROM contacts WHERE phone_id=?;`, [
        body.from
    ],
        (err, rows, fields) => {
            if (rows.length > 0) {
                msyql.con.query(`SELECT * FROM card WHERE phone_id=? AND closed=?;`, [
                    body.from,
                    false
                ], (err, rows, fields) => {
                    if (rows.length > 0) {
                        rows.forEach(person => {
                            newMsgTo(body, person.id, msg);
                        });
                    } else {
                        newCard(body, data, msg);
                    }
                })
            } else {
                if (body.from !== 'status@broadcast') {
                    newContacts(body);
                    newCard(body, data, msg);
                };
            };
        });
};

module.exports = index;