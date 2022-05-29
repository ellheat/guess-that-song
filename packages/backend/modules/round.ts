import { Server } from 'socket.io';
import { QuizEvents, gameConfig, colors } from '../config';
import { Players } from './players';
import { Spotify } from './spotify';
import { getRandomNumber } from '../utils/randomRangeNumber';
import { TrackType } from '../types/track';
import { shuffle } from '../utils/array';
import { Answers } from './answers';


export class Round {
  private answers: Answers;
  private roundNumber: number;
  private roundTimer: number;
  private intervalBreak: number;

  constructor(answers: Answers) {
    this.answers = answers;
    this.roundNumber = 1;
    this.roundTimer = gameConfig.maxTimerPerRound;
    this.intervalBreak = 1000;
  }

  emitRound = (io: Server) => io.emit(QuizEvents.Round, { round: this.roundNumber, answers: this.answers.get(this.roundNumber) });

  emitRoundTimer = (io: Server) => io.emit(QuizEvents.RoundTimer, this.roundTimer);

  init = (io: Server) => {
    console.log(colors.info(`----------- Init round: ${this.roundNumber} -----------`));
    this.emitRound(io);

    const interval = setInterval(() => {
      this.emitRoundTimer(io);
      if (this.roundTimer === 0) {
        this.roundTimer = gameConfig.maxTimerPerRound;
        clearInterval(interval);
        this.nextRound(io);
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
