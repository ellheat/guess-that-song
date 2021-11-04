import { Server } from 'socket.io';
import { QuizEvents, gameConfig } from '../config';
import { Players } from './players';


export class Quiz {
  private round: number;
  private roundTimer: number;
  private quizTimer: number;
  private intervalBreak: number;
  private players: Players;

  constructor(players: Players) {
    this.players = players;
    this.round = 1;
    this.roundTimer = gameConfig.maxTimerPerRound;
    this.quizTimer = gameConfig.startQuizTimer;
    this.intervalBreak = 1000;
  }

  emitRound = (io: Server) => io.emit(QuizEvents.Round, this.round);

  emitRoundTimer = (io: Server) => io.emit(QuizEvents.RoundTimer, this.roundTimer);

  emitQuizTimer = (io: Server) => io.emit(QuizEvents.QuizTimer, this.quizTimer);

  init = (io: Server) => {
    const interval = setInterval(() => {
      console.log('quizTimer', this.quizTimer);
      this.emitQuizTimer(io);
      if (this.quizTimer === 0) {
        this.quizTimer = gameConfig.maxTimerPerRound;
        clearInterval(interval);
        this.startRound(io);
      }
      this.quizTimer = this.quizTimer - 1;
    }, this.intervalBreak);
  };

  startRound = (io: Server) => {
    console.log('Round has been started');
    // const interval = setInterval(() => {
    //   this.emitRoundTimer(io);
    //   if (this.roundTimer === 0) {
    //     this.roundTimer = gameConfig.maxTimerPerRound;
    //     clearInterval(interval);
    //   }
    //   this.roundTimer = this.roundTimer - 1;
    // }, this.intervalBreak);
  };
}
