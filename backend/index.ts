import express from 'express';
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { colors, Ports, Events } from './config';
import { characterPicker, getCharacters } from './components';

const app = express();
const httpServer = createServer();
const socketIO = new Server(httpServer);
const io = socketIO.listen(app.listen(Ports.Sockets));

io.on(Events.Connection, (socket: Socket) => {
  const character = characterPicker();
  console.log(`connected: ${character}`, socket);
});

app.listen(Ports.Base, () => {
  console.log(colors.success(`Backend listening on port ${Ports.Base}!`));
  console.log(colors.success(`Sockets listening on port ${Ports.Sockets}!`));
  getCharacters().then(() => console.log(colors.success('Characters created')));
});
