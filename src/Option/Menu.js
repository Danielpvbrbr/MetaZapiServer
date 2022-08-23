const msyql = require('../../connection');

const Menu = (msg, client) => {
    const nomeContato = msg._data.notifyName;
    const saudacaoes = ['Olá ' + nomeContato + ', tudo bem? ', 'Oi ' + nomeContato + ', como vai você? ', 'Opa ' + nomeContato + ', tudo certo? '];
    const saudacao = saudacaoes[Math.floor(Math.random() * saudacaoes.length)];

    msyql.con.query(`SELECT * FROM menu WHERE id=1;`,
        (err, rows, fields) => {
            if (rows.length > 0) {
                msg.reply('👋' + saudacao.toUpperCase() + '\r\n');
                client.sendMessage(msg._data.from, rows[0].greetings);
            } else {
                console.log([]);
            }
        })
    // const testee = (sdN1 + '\r\n\r\n' + " Escolha uma das opções abaixo para iniciarmos: \r\n\r\n*1*- Quero conhecer  mais sobre a METANEET. \r\n*2*- Planos Disponíveis. \r\n*3*- Quero ser revendedor \r\n*4*- Suporte técnico.");

};

module.exports = Menu;