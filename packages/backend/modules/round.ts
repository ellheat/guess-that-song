import { Server } from 'socket.io';
import { QuizEvents, gameConfig, colors } from '../config';
import { Answers } from './answers';
import { Game } from './game';
import { Players } from './players';
import { DEFAULT_ROUND_NUMBER } from './quiz';

export class Round {
	private answers;
	private game;
	private players;
	private intervalBreak: number;
	private preRoundTimer: number;
	private roundNumber: number;
	private roundTimer: number;

	constructor(answers: Answers, players: Players, game: Game) {
		this.answers = answers;
		this.roundNumber = DEFAULT_ROUND_NUMBER;
		this.roundTimer = gameConfig.roundTimer;
		this.preRoundTimer = gameConfig.preRoundTimer;
		this.intervalBreak = 1000;
		this.game = game;
		this.players = players;
	}

	emitRoundData = (io: Server) => io.emit(QuizEvents.InitRound, { round: this.roundNumber, answers: this.answers.get(this.roundNumber) });

	emitStartRound = (io: Server) => io.emit(QuizEvents.StartRound);

	emitRoundTimer = (io: Server) => io.emit(QuizEvents.RoundTimer, this.roundTimer);

	emitPreRoundTimer = (io: Server) => io.emit(QuizEvents.PreRoundTimer, this.preRoundTimer);

	init = (io: Server, increaseRoundNumber: any) => {
		this.emitPreRoundTimer(io);
		this.players.setAllUnanswered();
		setTimeout(() => this.emitRoundData(io), 1000);

		console.log(colors.info(`----------- Init round: ${this.roundNumber} -----------`));

		const preRoundInterval = setInterval(() => {
			this.emitPreRoundTimer(io);
			if (this.preRoundTimer === 1) {
				this.preRoundTimer = gameConfig.preRoundTimer;
				clearInterval(preRoundInterval);
				this.startRound(io, increaseRoundNumber);
				return;
			}
			console.log('preRoundTimer', this.preRoundTimer);
			this.preRoundTimer = this.preRoundTimer - 1;
		}, this.intervalBreak);
	};

	startRound = (io: Server, increaseRoundNumber: any) => {
		this.emitStartRound(io);

		console.log(colors.success(`----------- Round: ${this.roundNumber} has been started -----------`));

		const roundInterval = setInterval(() => {
			this.emitRoundTimer(io);
			if (this.roundTimer === 0 || this.players.areAllAnswered) {
				this.roundTimer = gameConfig.roundTimer;
				clearInterval(roundInterval);
				this.initNextRound(io, increaseRoundNumber);
				return;
			}
			console.log('roundTimer', this.roundTimer);
			this.roundTimer = this.roundTimer - 1;
		}, this.intervalBreak);
	};

	initNextRound = (io: Server, increaseRoundNumber: any) => {
		if (this.roundNumber === gameConfig.maxRounds) {
			this.game.setLobby();
			this.roundNumber = DEFAULT_ROUND_NUMBER;
			return null;
		}
		increaseRoundNumber()
		this.roundNumber = this.roundNumber + 1;
		this.init(io, increaseRoundNumber);
	};
}
