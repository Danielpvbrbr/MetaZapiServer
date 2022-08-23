const mysql = require('../../connection');
const client = require('../Client');
const { MessageMedia } = require('whatsapp-web.js');

const newMsgFrom = (body, id, socket) => {
    const isFile = body.file !== undefined;
    let id_card = id;
    let phone_id = body.phone_id;
    let name = body.name;
    let fromMe = body.fromMe;
    let typeMsg = body.typeMsg;
    let _timestamp = body._timestamp;
    let hasMedia = isFile ? true : false;
    let msg = isFile ? body.file.base64 : body.msg;
    let filename = isFile ? body.file.filename : ' ';
    let caption = isFile ? body.file.caption : ' ';


    mysql.con.query(`INSERT INTO msg ( id_card, phone_id, name, fromMe, typeMsg, _timestamp, msg, hasMedia, filename,caption) VALUES (?,?,?,?,?,?,?,?,?,?)`, [
        id_card,
        phone_id,
        name,
        fromMe,
        typeMsg,
        _timestamp,
        msg,
        hasMedia,
        filename,
        caption
    ], (err, rows, fields) => {
        if (rows.affectedRows > 0) {
            mysql.con.query(`UPDATE card SET last_message=?, typeMsg=? WHERE id=? `, [
                msg,
                typeMsg,
                id_card
            ], (err, rows, fields) => {
                if (rows !== null && rows.affectedRows >= 1) {
                    mysql.con.query(`SELECT * FROM card;`,
                        (err, rows, fields) => {
                            if (rows.length > 0) {
                                socket.emit('cards', rows);
                            } else {
                                socket.emit('cards', []);
                            };
                        });
                } else {
                    console.log(err)
                }
            });
            if (isFile) {
                const media = new MessageMedia('image/png', body.file.base64);
                client.sendMessage(phone_id, media, { caption: caption }).then(response => {
                    // console.log({
                    //     status: true,
                    //     response: response
                    // });
                }).catch(err => {
                    console.log({
                        status: false,
                        response: err
                    });
                });
            } else {
                client.sendMessage(phone_id, msg).then(response => {
                    // console.log({
                    //     status: true,
                    //     response: response
                    // });
                }).catch(err => {
                    console.log({
                        status: false,
                        response: err
                    });
                });
            }



        } else {
            console.log([]);
            console.log(err)
        }
    });
};

module.exports = newMsgFrom;