import express from 'express';
import os from 'os';
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { colors, Ports, Events } from './config';
import { Players, Characters, Game } from './modules';
import { PlayerEvents } from './config/events';

const app = express();
const httpServer = createServer();
const IPv4 = os.networkInterfaces().en0?.[1].address;
const socketIO = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', `http://${IPv4}:3000`],
    credentials: true
  },
});

const players = new Players();
const characters = new Characters();
const game = new Game();

const io = socketIO.listen(app.listen(Ports.Sockets));

io.on(Events.Connection, (socket: Socket) => {
  game.emitState(io);
  const id = socket.id;

  socket.on(PlayerEvents.Add, () => {
    const character = characters.getRandomCharacter();
    const player = players.add(id, character);
    const playersList = players.getList();

    console.log(colors.info(`${player.name} has been joined`));
    console.log(colors.info(`players: ${playersList.length}`))

    socket.emit(PlayerEvents.Added, player);
    io.emit(Events.PlayersList, playersList);
  });

  socket.on(Events.Disconnect, () => {
    const player = players.getPlayer(id);
    players.remove(id);
    const playersList = players.getList();
    io.emit(Events.PlayersList, playersList);
    console.log(colors.info(`${player?.name} has been left`));
    console.log(colors.info(`players: ${playersList.length}`))
  });

  socket.on(PlayerEvents.Ready, () => {
    const player = players.setReady(id);
    const playersList = players.getList();
    console.log(colors.info(`${player.name} is ready`));
    socket.emit(PlayerEvents.Data, player);
    io.emit(Events.PlayersList, playersList);

    players.checkAreAllReady();

    if (players.areAllReady) {
      game.setQuiz(io);
      console.log(colors.info('Quiz has been started'));
    }
  });
});

app.listen(Ports.Base, () => {
  console.log(colors.success(`IPv4 address: ${IPv4}:3000`));
  console.log(colors.success(`Backend listening on port ${Ports.Base}!`));
  console.log(colors.success(`Sockets listening on port ${Ports.Sockets}!`));
  characters.createCharactersList();
  console.log(colors.success('Characters created'));
});
