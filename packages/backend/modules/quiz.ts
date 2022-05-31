import { Server } from 'socket.io';
import { colors } from '../config';
import { Players } from './players';
import { Spotify } from './spotify';
import { Round } from './round';
import { Answers } from './answers';
import { Game } from './game';


export class Quiz {
  private answers: Answers;
  private round: Round;

  constructor(game: Game, players: Players, spotify: Spotify) {
    this.answers = new Answers(spotify);
    this.round = new Round(this.answers, players, game);
  }

  init = (io: Server) => {
    console.log(colors.info(`----------- Init quiz -----------`));

    this.answers.prepare();
    console.log(colors.success('Questions have been prepared successfully'));

    console.log(colors.success('Quiz has been started'));
    this.round.init(io);
  };
}
