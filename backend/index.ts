import express from 'express';
import os from 'os';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { colors, Ports } from './config';
import { Characters } from './modules';
import { createConnection } from './events';

const app = express();
const httpServer = createServer();
const IPv4 = os.networkInterfaces().en0?.[1].address;
const socketIO = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', `http://${IPv4}:3000`],
    credentials: true
  },
});

const io = socketIO.listen(app.listen(Ports.Sockets));

const characters = new Characters();

createConnection(io, characters);

app.listen(Ports.Base, () => {
  console.log(colors.success(`IPv4 address: ${IPv4}:3000`));
  console.log(colors.success(`Backend listening on port ${Ports.Base}!`));
  console.log(colors.success(`Sockets listening on port ${Ports.Sockets}!`));
  characters.createCharactersList();
  console.log(colors.success('Characters created'));
});
