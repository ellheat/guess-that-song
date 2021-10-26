import { Server } from 'socket.io';
import { Events, gameConfig } from '../config';
import { Game } from './game';
import { Players } from './players';

const INTERVAL_BREAK = 1000;

export class Quiz {
  private round: number;
  private roundTimer: number;
  private quizTimer: number;
  private game: Game;
  private players: Players;

  constructor(game: Game, players: Players) {
    this.game = game;
    this.players = players;
    this.round = 1;
    this.roundTimer = gameConfig.maxTimerPerRound;
    this.quizTimer = gameConfig.startQuizTimer;
  }

  emitRound = (io: Server) => io.emit(Events.GameRound, this.round);

  emitRoundTimer = (io: Server) => io.emit(Events.RoundTimer, this.roundTimer);

  emitQuizTimer = (io: Server) => io.emit(Events.QuizTimer, this.quizTimer);

  start = (io: Server) => {
    console.log('1');
    const interval = setInterval(() => {
      console.log('2');
      this.emitQuizTimer(io);
      console.log('quiz timer: ', this.quizTimer);
      if (this.quizTimer === 0) {
        this.quiz(io);
        clearInterval(interval);
      }
    }, INTERVAL_BREAK);
  };

  quiz = (io: Server) => {
    const interval = setInterval(() => {
      this.emitRoundTimer(io);
      if (this.roundTimer === 0) {
        this.roundTimer = gameConfig.maxTimerPerRound;
        clearInterval(interval);
      }
      this.roundTimer = this.roundTimer - 1;
    }, INTERVAL_BREAK);
  };
}
