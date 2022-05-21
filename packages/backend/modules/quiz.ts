import { Server } from 'socket.io';
import { QuizEvents, gameConfig, colors } from '../config';
import { Players } from './players';
import { Spotify } from './spotify';
import { getRandomNumber } from '../utils/randomRangeNumber';
import { TrackType } from '../types/track';
import { shuffle } from '../utils/array';


export class Quiz {
  private round: number;
  private roundTimer: number;
  private quizTimer: number;
  private intervalBreak: number;
  private players: Players;
  private spotify: Spotify;
  private answers: TrackType[][];

  constructor(players: Players, spotify: Spotify) {
    this.players = players;
    this.spotify = spotify;
    this.round = 1;
    this.answers = [];
    this.roundTimer = gameConfig.maxTimerPerRound;
    this.quizTimer = gameConfig.startQuizTimer;
    this.intervalBreak = 1000;
  }

  emitRound = (io: Server) => io.emit(QuizEvents.Round, this.round);

  emitRoundTimer = (io: Server) => io.emit(QuizEvents.RoundTimer, this.roundTimer);

  emitQuizTimer = (io: Server) => io.emit(QuizEvents.QuizTimer, this.quizTimer);

  getTrack = (roundArray: TrackType[], playlist: TrackType[], index: number) => {
    const trackIndex: number = getRandomNumber(0, playlist.length - 1);
    const track: TrackType = Object.assign({ isCorrect: index === 0 }, <TrackType>playlist[trackIndex]);
    const isSameSong: TrackType[] = roundArray.filter(item => item.id === track.id);

    if (index === 0) {
      playlist.splice(trackIndex, 1);
    }

    if (isSameSong.length) {
      this.getTrack(roundArray, playlist, index);
    } else {
      roundArray.push(track);
    }
  };

  getAnswers = () => {
    const playlist = this.spotify.getPlaylist();

    for (let index = 0; index < gameConfig.maxRounds; index++) {
      const tracksArray: TrackType[] = [];
      for (let deepIndex = 0; deepIndex < 4; deepIndex++) {
        this.getTrack(tracksArray, playlist, deepIndex);
      }
      const round: TrackType[] = shuffle(tracksArray);
      this.answers.push(round);
    }
  };

  init = (io: Server) => {
    console.log(colors.info(`----------- Init quiz -----------`));

    this.getAnswers();
    console.log(colors.success('Questions has been prepared successfully'));

    const interval = setInterval(() => {
      this.emitQuizTimer(io);
      if (this.quizTimer === 0) {
        this.quizTimer = gameConfig.maxTimerPerRound;
        clearInterval(interval);
        this.startQuiz(io);
      }
      this.quizTimer = this.quizTimer - 1;
    }, this.intervalBreak);
  };

  startQuiz = (io: Server) => {
    console.log(colors.success('Quiz has been started'));
  };
}
