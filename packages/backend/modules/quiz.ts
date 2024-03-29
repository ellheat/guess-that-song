import { Server, Socket } from 'socket.io';
import { colors, Events } from '../config';
import { Players } from './players';
import { Round } from './round';
import { Answers } from './answers';
import { Game } from './game';
import { addPlayer, playerAnswer, removePlayer, setPlayerReady } from '../events/players';

export const DEFAULT_ROUND_NUMBER = 1;

export class Quiz {
    private answers;
    public round: Round;
    public roundNumber: number;

    constructor(game: Game, players: Players, answers: Answers) {
        this.answers = answers;
        this.roundNumber = DEFAULT_ROUND_NUMBER;
        this.round = new Round(this.answers, players, game);
    }

    increaseRoundNumber = () => (this.roundNumber = this.roundNumber + 1);

    init = (io: Server) => {
        this.roundNumber = DEFAULT_ROUND_NUMBER;
        console.log(colors.info(`----------- Init quiz -----------`));

        this.answers.prepare();
        console.log(colors.success('Questions have been prepared successfully'));

        this.round.roundTimer;
        console.log(colors.success('Quiz has been started'));
        setTimeout(() => {
            this.round.init(io, this.increaseRoundNumber);
        });
    };
}
