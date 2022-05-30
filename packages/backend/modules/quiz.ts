import { Server } from 'socket.io';
import { QuizEvents, gameConfig, colors } from '../config';
import { Players } from './players';
import { Spotify } from './spotify';
import { Round } from './round';
import { Answers } from './answers';


export class Quiz {
  private answers: Answers;
  private players: Players;
  private round: Round;

  constructor(players: Players, spotify: Spotify) {
    this.answers = new Answers(spotify);
    this.players = players;
    this.round = new Round(this.answers);
  }

  init = (io: Server) => {
    console.log(colors.info(`----------- Init quiz -----------`));

    this.answers.prepare();
    console.log(colors.success('Questions have been prepared successfully'));

    console.log(colors.success('Quiz has been started'));
    this.round.init(io);
  };
}
