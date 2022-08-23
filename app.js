const express = require('express');
const { Server } = require("socket.io");
const client = require('./src/Client');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 8000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

const AuthBot = require('./src/Routes/AuthBot');
const routers = require('./src/Routes/Router');

const Bot = require('./src/Option/Bot');
const Connections = require('./src/GetValues/connections');
const Index = require('./src/Msg/Index');
const newMsgFrom = require('./src/Msg/newMsgFrom');
const getMsg = require('./src/Msg/getMsg');
const upCard = require('./src/Msg/upCard');

const mysql = require('./connection');

const io = new Server(server, {
  cors: {
    origin: '*'
  },
});

app.use(fileUpload({
  debug: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname
  });
});

io.on('connection', async function (socket) {
  await AuthBot(socket);
  await Connections(socket);
  await getMsg(socket);
  await upCard(socket);

  socket.on('sendCards', async (res) => {
    await newMsgFrom(res, res.id_card, socket);
    await getMsg(socket);
  });

});

//Routes
app.use('/', routers);

client.initialize();

AuthBot(io);
Connections(io);

client.on('message', async msg => {

  setTimeout(function () {
    AuthBot(io);
    Connections(io);
  }, 1000 + Math.floor(Math.random() * 1000));

  if (msg._data.type = 'chat') {
    Bot(msg, client)
  }

  if (msg.type.toLowerCase() == "e2e_notification") return null;

  if (msg.body == "") return null;

});


server.listen(port, function () {
  console.log('App running on *: ' + port);
});
