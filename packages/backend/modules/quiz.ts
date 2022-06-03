import { Server } from 'socket.io';
import { colors } from '../config';
import { Players } from './players';
import { Round } from './round';
import { Answers } from './answers';
import { Game } from './game';

const DEFAULT_ROUND_NUMBER = 1;


export class Quiz {
  private answers;
  private round: Round;
  public roundNumber: number;

  constructor(game: Game, players: Players, answers: Answers) {
    this.answers = answers;
    this.roundNumber = DEFAULT_ROUND_NUMBER;
    this.round = new Round(this.answers, players, game, this.roundNumber);
  }

  increaseRoundNumber = () => this.roundNumber = this.roundNumber + 1;

  init = (io: Server) => {
    console.log(colors.info(`----------- Init quiz -----------`));

    this.answers.prepare();
    console.log(colors.success('Questions have been prepared successfully'));

    console.log(colors.success('Quiz has been started'));
    this.round.init(io, this.increaseRoundNumber);
  };
}
