const mysql = require('../../connection');

const upCard = (socket) => {

  socket.on('closed', (res) => {
    const closed = res.closed
    const id = res.id
    const reason_closing = res.reason_closing

    mysql.con.query(`UPDATE card SET closed=?, reason_closing=? WHERE id=?;`, [
      closed,
      reason_closing,
      id
    ],
      (err, rows, fields) => {
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
          socket.emit('cards', []);
        };
      });
  });
};

module.exports = upCard;