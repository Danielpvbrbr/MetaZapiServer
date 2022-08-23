const msyql = require('../../connection');
const Index = require('../Msg/Index');

const Option = (msg, client) => {

    msyql.con.query(`SELECT * FROM interactions WHERE id=?;`, [msg.body],
        (err, rows, fields) => {
            if (rows.length > 0) {
                console.log(rows)

                if (rows[0].type_ === 'TFR') {
                    msg.reply(rows[0].option_);
                    Index(msg, client, rows[0].number);
                }
                else if (rows[0].type_ === 'OPT') {
                    msg.reply(rows[0].option_);
                }
                else if (rows[0].type_ === 'RSP') {
                    msg.reply(rows[0].option_);
                }

            } else {
                console.log([]);
            }
        })

};

module.exports = Option;