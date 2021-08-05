import { Server, Socket } from 'socket.io';
import { Events, PlayerEvents } from '../config/events';
import { colors } from '../config';
import { Characters, Game, Players } from '../modules';

export const addPlayer = (socket: Socket, io: Server, id: string, players: Players, characters: Characters) => {
  socket.on(PlayerEvents.Add, () => {
    const character = characters.getRandomCharacter();
    const player = players.add(id, character);
    const playersList = players.getList();

    console.log(colors.info(`${player.name} has been joined`));
    console.log(colors.info(`players: ${playersList.length}`))

    socket.emit(PlayerEvents.Added, player);
    io.emit(Events.PlayersList, playersList);
  });
}

export const setReady = (socket: Socket, io: Server, id: string, players: Players, game: Game) => {
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
}
