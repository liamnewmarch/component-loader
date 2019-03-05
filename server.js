const express = require('express');
const ws = require('ws');

const port = {
  http: 3000,
  ws: 3001,
}

const httpServer = express();
const wsServer = new ws.Server({
  port: port.ws,
});

httpServer.use(express.static('static'));
httpServer.use('/lit-html', express.static('node_modules/lit-html'));
httpServer.listen(port.http);

wsServer.on('connection', () => {
  console.log('ws:connection');
});
