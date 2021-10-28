import { Characters, Game, Players } from '../modules';
import { colors, Events } from '../config';
import { Server, Socket } from 'socket.io';
import { addPlayer, setPlayerReady } from './players';

const players = new Players();
const game = new Game();

export const createConnection = (io: Server, characters: Characters) => {
  io.on(Events.Connection, (socket: Socket) => {
    game.emitState(io);
    const id = socket.id;

    addPlayer(socket, io, players, characters);
    setPlayerReady(socket, io, players, game);

    socket.on(Events.Disconnect, () => {
      const player = players.getPlayer(id);
      players.remove(id);
      const playersList = players.getList();
      io.emit(Events.PlayersList, playersList);
      console.log(colors.info(`${player?.name} has been left`));
      console.log(colors.info(`players: ${playersList.length}`))
    });
  });
}

