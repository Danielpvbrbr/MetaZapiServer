const mysql = require('../../connection');

const newContacts = (body, res) => {

    const rrm = (res) => {
        return res.split('').slice(0, 12).join('');
    };

    mysql.con.query(`INSERT INTO contacts (phone_id, phone, name, _date) VALUES (?,?,?,?)`, [
        body.from,
        rrm(body.from),
        body.notifyName,
        new Date()
    ], (err, rows, fields) => {
        if (rows.length > 0) {
            console.log('Contato criado')
        } else {
            console.log([]);
            console.log(err)
        }
    });

};

module.exports = newContacts;