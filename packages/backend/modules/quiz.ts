import { Server } from 'socket.io';
import { QuizEvents, gameConfig, colors } from '../config';
import { Players } from './players';
import { Spotify } from './spotify';
import { Round } from './round';
import { Answers } from './answers';


export class Quiz {
  private answers: Answers;
  private players: Players;
  private quizTimer: number;
  private round: Round;
  private roundTimer: number;

  constructor(players: Players, spotify: Spotify) {
    this.answers = new Answers(spotify);
    this.players = players;
    this.quizTimer = gameConfig.startQuizTimer;
    this.round = new Round(this.answers);
    this.roundTimer = gameConfig.maxTimerPerRound;
  }

  emitRound = (io: Server) => io.emit(QuizEvents.Round, this.round);

  emitRoundTimer = (io: Server) => io.emit(QuizEvents.RoundTimer, this.roundTimer);

  emitQuizTimer = (io: Server) => io.emit(QuizEvents.QuizTimer, this.quizTimer);

  init = (io: Server) => {
    console.log(colors.info(`----------- Init quiz -----------`));

    this.answers.prepare();
    console.log(colors.success('Questions have been prepared successfully'));

    console.log(colors.success('Quiz has been started'));
    this.round.init(io);
  };
}
