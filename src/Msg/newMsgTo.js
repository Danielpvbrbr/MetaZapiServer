const mysql = require('../../connection');

const newMsgTo = async (body, id, msg) => {
    const media = await msg.downloadMedia();

    let id_card = id;
    let phone_id = body.from;
    let name = body.notifyName;
    let fromMe = body.id.fromMe;
    let typeMsg = msg.type;
    let _timestamp = body.t;
    let hasMedia = msg.hasMedia;
    let _msg = msg.hasMedia ? media.data : body.body;
    let filename = msg.hasMedia && media.filename !== undefined ? media.filename : ' ';
    let caption = msg.hasMedia && body.caption !== undefined ? body.caption : ' ';


    mysql.con.query(`INSERT INTO msg ( id_card, phone_id, name, fromMe, typeMsg, _timestamp, msg, hasMedia, filename, caption) VALUES (?,?,?,?,?,?,?,?,?,?)`, [
        id_card,
        phone_id,
        name,
        fromMe,
        typeMsg,
        _timestamp,
        _msg,
        hasMedia,
        filename,
        caption
    ], (err, rows, fields) => {
        if (rows.affectedRows > 0) {
            mysql.con.query(`SELECT * FROM msg WHERE id_card=? AND viewer=?;`, [id_card, false],
                (err, rows, fields) => {
                    if (rows.length > 0) {
                        mysql.con.query(`UPDATE card SET last_message=?, typeMsg=?, viewers=? WHERE id=? `, [
                            _msg,
                            typeMsg,
                            rows.length,
                            id_card
                        ], (err, rows, fields) => {
                            if (rows !== null && rows.affectedRows >= 1) {
                                // console.log('Atulizou')
                            } else {
                                console.log(err)
                            }
                        });
                    } else {
                        console.log([]);
                        console.log(err)
                    }

                });
        } else {
            console.log([]);
            console.log(err)
        }
    });
};

module.exports = newMsgTo;