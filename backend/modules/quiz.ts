import { Server } from 'socket.io';
import { QuizEvents, gameConfig } from '../config';
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

  constructor(players: Players, spotify: Spotify) {
    this.players = players;
    this.spotify = spotify;
    this.round = 1;
    this.roundTimer = gameConfig.maxTimerPerRound;
    this.quizTimer = gameConfig.startQuizTimer;
    this.intervalBreak = 1000;
  }

  emitRound = (io: Server) => io.emit(QuizEvents.Round, this.round);

  emitRoundTimer = (io: Server) => io.emit(QuizEvents.RoundTimer, this.roundTimer);

  emitQuizTimer = (io: Server) => io.emit(QuizEvents.QuizTimer, this.quizTimer);

  getTrack = (roundArray: TrackType[], playlist: TrackType[], index: number) => {
    const trackIndex: number = getRandomNumber(0, playlist.length - 1);
    const pickedTrack = playlist[trackIndex];
    const isSameSong: TrackType[] = roundArray.filter(item => item.id === pickedTrack.id);

    if (index === 0) {
      playlist.splice(trackIndex, 1);
    }

    if (isSameSong.length) {
      this.getTrack(roundArray, playlist, index);
    } else {
      const track: TrackType = Object.assign(pickedTrack, { isCorrect: index === 0 })
      roundArray.push(track);
    }
  };

  getQuestions = (): TrackType[][] => {
    const playlist = this.spotify.getPlaylist();
    const quizPlaylist = [];

    for (let index = 0; index < gameConfig.maxRounds; index++) {
      const tracksArray: TrackType[] = [];
      for (let deepIndex = 0; deepIndex < 4; deepIndex++) {
        this.getTrack(tracksArray, playlist, deepIndex);
      }
      const round: TrackType[] = shuffle(tracksArray);
      quizPlaylist.push(round);
    }
    return quizPlaylist;
  };

  init = (io: Server) => {
    const questions = this.getQuestions();
    console.log('questions', questions);
    console.log('Questions has been prepared');
    const interval = setInterval(() => {
      console.log('quizTimer', this.quizTimer);
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
    console.log('Round has been started');
  };
}
