import { Characters, Game, Players, Spotify } from '../modules';
import { Events } from '../config';
import { Server, Socket } from 'socket.io';
import { addPlayer, removePlayer, setPlayerReady } from './players';

const players = new Players();
const game = new Game();

export const createConnection = (io: Server, characters: Characters, spotify: Spotify) => {
  io.on(Events.Connection, (socket: Socket) => {
    game.emitState(io);

    addPlayer(socket, io, players, characters);
    setPlayerReady(socket, io, players, game);
    removePlayer(socket, io, players);
  });
}

