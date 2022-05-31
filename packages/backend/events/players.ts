import { Server, Socket } from 'socket.io';
import { Events, PlayerEvents } from '../config/events';
import { colors } from '../config';
import { Characters, Game, Players, Quiz } from '../modules';

export const addPlayer = (socket: Socket, io: Server, players: Players, characters: Characters) => {
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
}

export const setPlayerReady = (socket: Socket, io: Server, players: Players, game: Game, quiz: Quiz) => {
	const id = socket.id;
	socket.on(PlayerEvents.Ready, () => {
		const player = players.setReady(id);
		const playersList = players.getList();
		console.log(colors.info(`${player.name} is ready`));
		socket.emit(PlayerEvents.Data, player);
		io.emit(Events.PlayersList, playersList);

		players.checkAreAllReady();

		if (players.areAllReady) {
			game.setQuiz();
			quiz.init(io);
		}
	});
}

export const removePlayer = (socket: Socket, io: Server, players: Players) => {
	const id = socket.id;
	socket.on(Events.Disconnect, () => {
		const player = players.getPlayer(id);
		players.remove(id);
		const playersList = players.getList();
		io.emit(Events.PlayersList, playersList);
		console.log(colors.info(`${player?.name} has been left`));
		console.log(colors.info(`players: ${playersList.length}`))
	});
}

export const playerAnswer = (socket: Socket, io: Server, players: Players) => {
	const id = socket.id;
	socket.on(PlayerEvents.Answer, (data) => {
		console.log('data', data);
		// const player = players.setPoints(id, points);
		// const playersList = players.getList();
		// console.log(colors.info(`${player.name} is ready`));
		// socket.emit(PlayerEvents.Data, player);
		// io.emit(Events.PlayersList, playersList);
		//
		// players.checkAreAllReady();
		//
		// if (players.areAllReady) {
		//   game.setQuiz(io);
		//   console.log(colors.info('Quiz has been started'));
		// }
	});
}
