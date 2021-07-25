import express from 'express';
import os from 'os';
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { colors, Ports, Events } from './config';
import { getUserList, addUser, removeUser, characterPicker, getCharacters } from './components';

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
  const id = socket.id;

  const player = addUser(character, id);
  const usersList = getUserList();

  console.log(colors.info(`${player.name} has been joined`));
  console.log(colors.info(`users: ${usersList.length}`))

  socket.emit(Events.Connection, player);
  io.emit(Events.PlayersList, usersList);

  socket.on(Events.Disconnect, () => {
    removeUser(id).then((characterName) => {
      io.emit(Events.PlayersList, usersList);
      console.log(colors.info(`${characterName} has been left`));
      console.log(colors.info(`users: ${usersList.length}`))
    });
  })
});

app.listen(Ports.Base, () => {
  console.log(colors.success(`IPv4 address: ${IPv4}:3000`));
  console.log(colors.success(`Backend listening on port ${Ports.Base}!`));
  console.log(colors.success(`Sockets listening on port ${Ports.Sockets}!`));
  getCharacters().then(() => console.log(colors.success('Characters created')));
});
