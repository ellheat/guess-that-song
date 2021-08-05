import { Characters, Game, Players } from '../modules';
import { colors, Events } from '../config';
import { Server, Socket } from 'socket.io';
import { addPlayer, setReady } from './players';

const players = new Players();
const game = new Game();

export const createConnection = (io: Server, characters: Characters) => {
  io.on(Events.Connection, (socket: Socket) => {
    game.emitState(io);
    const id = socket.id;

    addPlayer(socket, io, id, players, characters);
    setReady(socket, io, id, players, game);

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

