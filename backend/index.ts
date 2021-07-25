import express from 'express';
import os from 'os';
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { colors, Ports, Events } from './config';
import { characterPicker, getCharacters } from './components';

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

io.on(Events.Connection, (socket: Socket) => {
  const character = characterPicker();
  console.log(`connected: ${character.name}`, socket.id);

  socket.emit(Events.Connection, `${character.name} has been connected`);

  socket.on(Events.Disconnect, () => {
    console.log(`disconnected: ${character.name}`, socket.id);
  })
});

app.listen(Ports.Base, () => {
  console.log(colors.success(`IPv4 address: ${IPv4}:3000`));
  console.log(colors.success(`Backend listening on port ${Ports.Base}!`));
  console.log(colors.success(`Sockets listening on port ${Ports.Sockets}!`));
  getCharacters().then(() => console.log(colors.success('Characters created')));
});
