import { Server } from 'socket.io';
import { QuizEvents, gameConfig, colors } from '../config';
import { Answers } from './answers';


export class Round {
	private answers: Answers;
	private roundNumber: number;
	private roundTimer: number;
	private preRoundTimer: number;
	private intervalBreak: number;

	constructor(answers: Answers) {
		this.answers = answers;
		this.roundNumber = 1;
		this.roundTimer = gameConfig.roundTimer;
		this.preRoundTimer = gameConfig.preRoundTimer;
		this.intervalBreak = 1000;
	}

	emitRoundData = (io: Server) => io.emit(QuizEvents.InitRound, { round: this.roundNumber, answers: this.answers.get(this.roundNumber) });

	emitStartRound = (io: Server) => io.emit(QuizEvents.StartRound);

	emitRoundTimer = (io: Server) => io.emit(QuizEvents.RoundTimer, this.roundTimer);

	emitPreRoundTimer = (io: Server) => io.emit(QuizEvents.PreRoundTimer, this.preRoundTimer);

	init = (io: Server) => {
		this.emitPreRoundTimer(io);
		this.emitRoundData(io);

		console.log(colors.info(`----------- Init round: ${this.roundNumber} -----------`));

		const preRoundInterval = setInterval(() => {
			this.emitPreRoundTimer(io);
			if (this.preRoundTimer === 0) {
				this.preRoundTimer = gameConfig.preRoundTimer;
				clearInterval(preRoundInterval);
				this.startRound(io);
				return;
			}
			console.log('preRoundTimer', this.preRoundTimer);
			this.preRoundTimer = this.preRoundTimer - 1;
		}, this.intervalBreak);
	};

	startRound = (io: Server) => {
		this.emitStartRound(io);

		console.log(colors.success(`----------- Round: ${this.roundNumber} has been started -----------`));

		const roundInterval = setInterval(() => {
			this.emitRoundTimer(io);
			if (this.roundTimer === 0) {
				this.roundTimer = gameConfig.roundTimer;
				clearInterval(roundInterval);
				this.nextRound(io);
				return;
			}
			console.log('roundTimer', this.roundTimer);
			this.roundTimer = this.roundTimer - 1;
		}, this.intervalBreak);
	};

	nextRound = (io: Server) => {
		this.roundNumber = this.roundNumber + 1;
		this.init(io);
	};
}
