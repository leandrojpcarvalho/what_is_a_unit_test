"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 3002;
const server = (0, express_1.default)();
server;
server.use('/', (req, res) => res.send('Bem vinde!'));
server.listen(PORT, () => console.log(`Servidor rodando em node na porta:${PORT}`));
