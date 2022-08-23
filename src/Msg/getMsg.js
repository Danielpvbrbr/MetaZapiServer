const mysql = require('../../connection');

const getMsg = (socket) => {
  socket.on('getMsg', (res) => {
    mysql.con.query(`SELECT * FROM msg WHERE id_card=?;`, [res],
      (err, rows, fields) => {
        if (rows.length > 0) {
          socket.emit('msg', rows);
        } else {
          socket.emit('msg', []);
        };
      });

    mysql.con.query(`UPDATE msg SET viewer=? WHERE id_card=?;`, [true, res],
      (err, rows, fields) => {
        if (rows !== null && rows.affectedRows >= 1) {
          mysql.con.query(`UPDATE card SET viewers=? WHERE id=? `, [0, res],
            (err, rows, fields) => {
              if (rows !== null && rows.affectedRows >= 1) {
                mysql.con.query(`SELECT * FROM card WHERE id=?;`, [res],
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
        } else {
          console.log(err)
        }
      });
  });

  socket.on('fastMsg', (res) => {
    mysql.con.query(`SELECT * FROM msgfast WHERE msg LIKE '%%${res.text}%%';`,
      (err, rows, fields) => {
        if (rows.length > 0) {
          socket.emit('fastMsg', rows);
        } else {
          socket.emit('fastMsg', []);
        };
      });
  });
};

module.exports = getMsg;