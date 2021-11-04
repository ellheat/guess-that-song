import { Characters, Game, Players, Spotify, Quiz, GameState } from '../modules';
import { Events } from '../config';
import { Server, Socket } from 'socket.io';
import { addPlayer, removePlayer, setPlayerReady } from './players';


export const createConnection = (io: Server, characters: Characters, spotify: Spotify) => {
  const players = new Players();
  const quiz = new Quiz(players);
  const game = new Game(quiz, io);

  io.on(Events.Connection, (socket: Socket) => {
    game.emitState();

    addPlayer(socket, io, players, characters);
    setPlayerReady(socket, io, players, game);
    removePlayer(socket, io, players);
  });
}

