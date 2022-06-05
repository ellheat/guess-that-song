import { Server } from 'socket.io';
import { Events } from '../config';
import { Players } from './players';

export enum GameState {
	Lobby = 'lobby',
	Quiz = 'quiz',
	Leaderboard = 'leaderboard',
}
export class Game {
	public state: GameState.Lobby | GameState.Quiz | GameState.Leaderboard;
	private io;
	private players;

	constructor(io: Server, players: Players) {
		this.state = GameState.Lobby;
		this.players = players;
		this.io = io;
	}

	emitState = () => this.io.emit(Events.GameState, this.state);

	emitPlayerList = () => this.io.emit(Events.PlayersList, this.players.getList());

	setLobby = () => {
		this.state = GameState.Lobby;
		this.players.setAllUnready();
		this.emitPlayerList();
		this.emitState();
		console.log(`${this.state} has been initialized`);
	};

	setQuiz = () => {
		this.state = GameState.Quiz;
		this.players.clearQuizData();
		this.emitState();
		console.log(`${this.state} has been initialized`);
	};
}
