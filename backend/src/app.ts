import express from 'express';

const PORT = 3002;

const server = express();
server;

server.use('/', (req, res) => res.send('Bem vindosef!'));

server.listen(PORT, () =>
  console.log(`Servidor rodando em node na porta:${PORT}`)
);
