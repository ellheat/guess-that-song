import { Characters, Game, GameState, Players } from '../modules';
import { colors, Events } from '../config';
import { Server, Socket } from 'socket.io';
import { addPlayer, setPlayerReady } from './players';
import { Quiz } from '../modules/quiz';

const players = new Players();
const game = new Game();
const quiz = new Quiz(game, players);

export const createConnection = (io: Server, characters: Characters) => {
  io.on(Events.Connection, (socket: Socket) => {
    game.emitState(io);
    const id = socket.id;

    addPlayer(socket, io, players, characters);
    setPlayerReady(socket, io, players, game);
    console.log('asd');

    // if (game.state === GameState.Quiz) {
    //   console.log('0');
    //   quiz.start(io);
    // }

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

