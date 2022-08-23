const client = require('../Client');
const qrcode = require('qrcode');
const msyql = require('../../connection');

const AuthBot = (socket) => {
    socket.emit('message', 'Conectando...');

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QRCode recebido, aponte a câmera  seu celular!');
        });
    });

    client.on('ready', () => {
        socket.emit('ready', 'Dispositivo pronto!');
        socket.emit('message', 'Dispositivo pronto!');
        console.log('Dispositivo pronto');
    });

    client.on('authenticated', () => {
        socket.emit('authenticated', 'Autenticado!');
        socket.emit('message', 'Autenticado!');
        console.log('Autenticado');
    });

    client.on('auth_failure', function () {
        socket.emit('message', 'Falha na autenticação, reiniciando...');
        console.error('Falha na autenticação');
    });

    client.on('change_state', state => {
        console.log('Status de conexão: ', state);
    });

    client.on('disconnected', (reason) => {
        socket.emit('message', 'Cliente desconectado!');
        console.log('Cliente desconectado', reason);
        client.initialize();
    });

    msyql.con.query(`SELECT * FROM card;`,
    (err, rows, fields) => {
        if (rows.length > 0) {
            socket.emit('cards', rows);
        } else {
            socket.emit('cards', []);
        };
    });
};

module.exports = AuthBot;
