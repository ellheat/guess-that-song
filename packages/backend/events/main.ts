import { Characters, Game, Players, Spotify, Quiz, GameState } from '../modules';
import { Events, QuizEvents } from '../config';
import { Server, Socket } from 'socket.io';
import { addPlayer, removePlayer, setPlayerReady } from './players';


export const createConnection = (io: Server, characters: Characters, spotify: Spotify) => {
	const players = new Players();
	const game = new Game(io);
	const quiz = new Quiz(game, players, spotify);

	io.on(Events.Connection, (socket: Socket) => {
		game.emitState();

		addPlayer(socket, io, players, characters);
		setPlayerReady(socket, io, players, game, quiz);
		removePlayer(socket, io, players);
	});
}

