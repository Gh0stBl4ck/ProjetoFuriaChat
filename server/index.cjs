const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let parsedMessage;

    try {
      parsedMessage = JSON.parse(message); // Tenta interpretar como JSON
    } catch (err) {
      console.error('Mensagem inválida recebida:', message);
      return; // Se não for JSON, ignora
    }

    // Envia a mensagem para todos os clientes conectados
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });
});

console.log('Servidor WebSocket rodando em ws://localhost:8080');
